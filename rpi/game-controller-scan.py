#!/usr/bin/env python2

from evdev import InputDevice, categorize, ecodes
import boto3
import json

awsLambda = boto3.client('lambda')


PAD_X = 304
PAD_A = 305
PAD_B = 306
PAD_Y = 307
PAD_R = 309
PAD_L = 308
PAD_SEL = 312
PAD_START = 313

PAD_HZ = 0
PAD_VT = 1

PAD_KEY_DOWN = 1

PAD_HZ_LEFT = 0
PAD_HZ_RIGHT = 255
PAD_VT_UP = 0
PAD_VT_DOWN = 255


print(ecodes.ABS)

gamepad = InputDevice('/dev/input/event0')

print(gamepad)



ACT_FORWARD = 0
ACT_BACK = 1
ACT_PRESENT = 2
ACT_UNPRESENT = 3
ACT_RESET = 4
ACT_FIRST = 5
ACT_LAST = 6
ACT_DETAILS = 7
ACT_UNKNOWN = -1


def interpret(event):
    if event.type == ecodes.EV_KEY and event.value == PAD_KEY_DOWN:
        if event.code == PAD_START:
            return ACT_RESET
        elif event.code == PAD_L:
            return ACT_FIRST
        elif event.code == PAD_R:
            return ACT_LAST
        elif event.code == PAD_A:
            return ACT_DETAILS
    elif event.type == ecodes.EV_ABS:
        if event.code == PAD_HZ:
            if event.value == PAD_HZ_LEFT:
                return ACT_BACK
            elif event.value == PAD_HZ_RIGHT:
                return ACT_FORWARD
        elif event.code == PAD_VT:
            if event.value == PAD_VT_UP:
                return ACT_UNPRESENT
            elif event.value == PAD_VT_DOWN:
                return ACT_PRESENT
    return ACT_UNKNOWN


def invoke_lambda(action):
    payload = {}
    payload['action'] = action
    result = awsLambda.invoke(
             FunctionName='iot-demo-backend-PresentationMasterFunction-7I3MS5XU5C4V',
             InvocationType='Event',
             LogType='None',
             Payload=json.dumps(payload)
            )
    print(result)


def slide_advance():
    invoke_lambda("next")

def slide_retreat():
    invoke_lambda("previous")

def slide_first():
    invoke_lambda("first")

def slide_last():
    invoke_lambda("last")

def presentation_show():
    invoke_lambda("show")

def presentation_hide():
    invoke_lambda("hide")

def presentation_reset():
    invoke_lambda("reset")

def presentation_toggle_details():
    invoke_lambda("toggle-details")


def dispatch(action):
    if action == ACT_FORWARD:
        slide_advance()
    elif action == ACT_BACK:
        slide_retreat()
    elif action == ACT_FIRST:
        slide_first()
    elif action == ACT_LAST:
        slide_last()
    elif action == ACT_PRESENT:
        presentation_show()
    elif action == ACT_UNPRESENT:
        presentation_hide()
    elif action == ACT_RESET:
        presentation_reset()
    elif action == ACT_DETAILS:
        presentation_toggle_details()



for event in gamepad.read_loop():
    dispatch(interpret(event))



