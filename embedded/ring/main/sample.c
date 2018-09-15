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

#define WS2812_PIN	14
#define NUMLAMPS 16


#define delay_ms(ms) (vTaskDelay((ms) / portTICK_RATE_MS))

static QueueHandle_t commandQ;

rgbVal *persistent;
rgbVal *dynamic;

static bool visible;
static rgbVal BLACK;

void refresh() {
    if (visible) {
        ws2812_setColors(NUMLAMPS, persistent);
    } else {
        for(unsigned i = 0; i < NUMLAMPS; i += 1)
            dynamic[i] = BLACK;
        ws2812_setColors(NUMLAMPS, dynamic);
    }
}

void animate_off() {
    rgbVal red = makeRGBVal(250, 0, 0);
    rgbVal green = makeRGBVal(0, 250, 0);

    unsigned half = NUMLAMPS / 2;
    for(unsigned i = 0; i < NUMLAMPS; i += 1) {
        for(unsigned j = 0; j < NUMLAMPS; j += 1) {
            if (i == j)
                dynamic[j] = red;
            else if (i == (j + half) % NUMLAMPS)
                dynamic[j] = green;
            else dynamic[j] = BLACK;
        }
        ws2812_setColors(NUMLAMPS, dynamic);
        delay_ms(50);
    }

}

void animate_on() {
    rgbVal red = makeRGBVal(250, 0, 0);
    rgbVal green = makeRGBVal(0, 250, 0);

    unsigned half = NUMLAMPS / 2;
    for(unsigned i = NUMLAMPS - 1; i != 0; i -= 1) {
        for(unsigned j = 0; j < NUMLAMPS; j += 1) {
            if (i == j)
                dynamic[j] = red;
            else if (i == (j + half) % NUMLAMPS)
                dynamic[j] = green;
            else dynamic[j] = BLACK;
        }
        ws2812_setColors(NUMLAMPS, dynamic);
        delay_ms(50);
    }
}

typedef QueueHandle_t Controller;

#define UPDATED 0
#define TURN_ON 1
#define TURN_OFF 2

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

void initDisplay() {
    ws2812_init(WS2812_PIN);
    commandQ = xQueueCreate(32, sizeof(uint8_t));
    BLACK = makeRGBVal(0, 0, 0);
    persistent = malloc(sizeof(rgbVal) * NUMLAMPS);
    for(uint8_t i=0; i < NUMLAMPS; i += 1) {
        persistent[i] = BLACK;
    }
    dynamic = malloc(sizeof(rgbVal) * NUMLAMPS);
    visible = false;
    refresh();
}

void display_set_lamp(uint8_t index, uint8_t red, uint8_t green, uint8_t blue) {
    printf("setting lamp %d to %d, %d, %d", index, red, green, blue);
    persistent[index % NUMLAMPS] = makeRGBVal(red, green, blue);
    uint8_t cmd = UPDATED;
    xQueueSend(commandQ, &cmd, 0);
}

void display_turn_on() {
    uint8_t cmd = TURN_ON;
    xQueueSend(commandQ, &cmd, 0);
}

void display_turn_off() {
    uint8_t cmd = TURN_OFF;
    xQueueSend(commandQ, &cmd, 0);
}

void display_task() {
    uint8_t cmd;
    while(1) {
       if (xQueueReceive(commandQ, &cmd, 1000 / portTICK_RATE_MS)) {
           printf("Got %d", cmd);
           handleDisplayCommand(cmd);
       } else {
           printf("queue timeout");
           refresh();
       }
    }
}

void app_main()
{
    nvs_flash_init();
    initDisplay();

    xTaskCreate(display_task, "display", 4096, NULL, 10, NULL);

    display_set_lamp(5, 120, 240, 7);
    display_turn_on();
    delay_ms(2000);
    display_set_lamp(6, 60, 240, 27);
    display_set_lamp(7, 30, 240, 57);
    display_set_lamp(8, 0, 240, 109);
    display_set_lamp(9, 203, 100, 29);
    delay_ms(5000);
    display_turn_off();

    return;
}
