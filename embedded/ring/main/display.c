/* Created 19 Nov 2016 by Chris Osborn <fozztexx@fozztexx.com>
 * http://insentricity.com
 *
 * Demo of driving WS2812 RGB LEDs using the RMT peripheral.
 *
 * This code is placed in the public domain (or CC0 licensed, at your option).
 */

#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <freertos/queue.h>
#include <soc/rmt_struct.h>
#include <esp_system.h>
#include <nvs_flash.h>
#include <driver/gpio.h>
#include <stdio.h>
#include "ws2812.h"

#include "display.h"

#define delay_ms(ms) (vTaskDelay((ms) / portTICK_RATE_MS))

static QueueHandle_t commandQ;

static uint8_t numlamps;
static bool visible;
static rgbVal BLACK;
static rgbVal *persistent;
static rgbVal *dynamic;

void refresh() {
    printf("refresh\n");
    if (visible) {
        ws2812_setColors(numlamps, persistent);
    } else {
        for(unsigned i = 0; i < numlamps; i += 1)
            dynamic[i] = BLACK;
        ws2812_setColors(numlamps, dynamic);
    }
}

void animate_off() {
    rgbVal red = makeRGBVal(250, 0, 0);
    rgbVal green = makeRGBVal(0, 250, 0);

    unsigned half = numlamps / 2;
    for(unsigned i = 0; i < numlamps; i += 1) {
        for(unsigned j = 0; j < numlamps; j += 1) {
            if (i == j)
                dynamic[j] = red;
            else if (i == (j + half) % numlamps)
                dynamic[j] = green;
            else dynamic[j] = BLACK;
        }
        ws2812_setColors(numlamps, dynamic);
        delay_ms(50);
    }

}

void animate_on() {
    rgbVal red = makeRGBVal(250, 0, 0);
    rgbVal green = makeRGBVal(0, 250, 0);

    unsigned half = numlamps / 2;
    for(unsigned i = numlamps - 1; i != 0; i -= 1) {
        for(unsigned j = 0; j < numlamps; j += 1) {
            if (i == j)
                dynamic[j] = red;
            else if (i == (j + half) % numlamps)
                dynamic[j] = green;
            else dynamic[j] = BLACK;
        }
        ws2812_setColors(numlamps, dynamic);
        delay_ms(50);
    }
}

typedef QueueHandle_t Controller;

#define UPDATED 0
#define TURN_ON 1
#define TURN_OFF 2

static const uint8_t cmd_updated = UPDATED;
static const uint8_t cmd_turn_on = TURN_ON;
static const uint8_t cmd_turn_off = TURN_OFF;


void handleDisplayCommand(uint8_t c) {
    switch(c) {
        case UPDATED:
            refresh();
            break;
        case TURN_ON:
            animate_on();
            visible = true;
            refresh();
            break;
        case TURN_OFF:
            animate_off();
            visible = false;
            refresh();
            break;
    }
}

void display_task() {
    uint8_t cmd;
    while(1) {
       if (xQueueReceive(commandQ, &cmd, 10000 / portTICK_RATE_MS)) {
           printf("Got %d\n", cmd);
           handleDisplayCommand(cmd);
       } else {
           printf("queue timeout\n");
       }
    }
}

void display_init(uint8_t pin, uint8_t size) {
    numlamps = size;
    ws2812_init(pin);
    commandQ = xQueueCreate(32, sizeof(uint8_t));
    BLACK = makeRGBVal(0, 0, 0);
    persistent = malloc(sizeof(rgbVal) * numlamps);
    for(uint8_t i=0; i < numlamps; i += 1) {
        persistent[i] = BLACK;
    }
    dynamic = malloc(sizeof(rgbVal) * numlamps);
    visible = false;
    refresh();
    xTaskCreate(display_task, "display", 4096, NULL, 10, NULL);
}

void display_set_color_c(uint8_t index, uint8_t red, uint8_t green, uint8_t blue) {
    persistent[index % numlamps] = makeRGBVal(red, green, blue);
    xQueueSend(commandQ, &cmd_updated, 0);
}

void display_set_color(uint8_t index, uint32_t color) {
    display_set_color_c(index, color >> 16, color >> 8, color);
}

void display_on() {
    xQueueSend(commandQ, &cmd_turn_on, 0);
}

void display_off() {
    xQueueSend(commandQ, &cmd_turn_off, 0);
}

