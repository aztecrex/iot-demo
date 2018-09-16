#include <stdio.h>
#include <stdbool.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

#include "animation.h"
#include "dotstar.h"


#define NUM_ANIMATIONS 1

static uint8_t curanimation = 0;
static bool running = false;
static bool started = false;
static bool powered = false;

static void delay_ms(unsigned ms) {
    vTaskDelay(ms / portTICK_PERIOD_MS);
}

void animation_select(uint8_t index) {
    curanimation = index % NUM_ANIMATIONS;
}

void animation_disable() {
    running = false;
}

void animation_enable() {
    running = true;
}

void fade(unsigned frame) {
    frame %= 30;
    uint8_t bright = frame;
    if (frame >= 15) {
        bright = 30 - frame;
    }
    pixel dots[] = {
        {bright, 255, 255, 255},
        {bright, 255, 255, 255},
        {bright, 255, 255, 255},
        {bright, 255, 255, 255},
        {bright, 255, 255, 255},
        {bright, 255, 255, 255}
    };
    dotstar_show(dots);
    vTaskDelay(80 / portTICK_PERIOD_MS);
}

void show_frame(unsigned frame) {
    if (!running) return;
    switch (curanimation) {
        case FADE: fade(frame); break;
        default: fade(frame); break;
    }
}

const static pixel black[] = {
    {0,0,0,0},
    {0,0,0,0},
    {0,0,0,0},
    {0,0,0,0},
    {0,0,0,0},
    {0,0,0,0}
};

void clear() {
    dotstar_show(black);

}

#define POWERSTABLE 0
#define POWERX_UP 2
#define POWERX_DOWN 3
static uint8_t powermode = POWERSTABLE;

void runPowerAnimation() {
    static pixel dot_red = {31, 250, 0, 0};
    static pixel dot_green = {31, 0, 250, 0};
    static pixel dot_black = {0, 0, 0, 0};
    pixel dots[6];
    for(uint8_t i = 0; i < 6; i += 1) {
        for(uint8_t j = 0; j < 6; j += 1) {
            uint8_t pos = powermode == POWERX_UP ? i : (5 - i);
            if (pos == j)
                dots[j] = dot_red;
            else if ((pos + 3) % 6 == j)
                dots[j] = dot_green;
            else
                dots[j] = dot_black;
        }
        dotstar_show(dots);
        delay_ms(80);
    }
}


void animation_task(void *param) {
    unsigned frame = 0;
    while(1) {
        printf("switch to running\n");
        while (running && powered && !powermode) {
            show_frame(frame);
            frame += 1;
        }
        clear();
        printf("switch to idle\n");
        while (!(running && powered) && !powermode) {
            delay_ms(1000);
        }
        if (powermode) {
            if (running) {
                runPowerAnimation();
            }
            powered = powermode == POWERX_UP;
            powermode = POWERSTABLE;
        }
    }
}

void animation_powerup() {
    powermode = POWERX_UP;
}

void animation_powerdown() {
    powermode = POWERX_DOWN;

}


void animation_start() {
    if (!started)
        xTaskCreatePinnedToCore(&animation_task, "animation_task", 8192, NULL, 5, NULL, 1);
    started = true;
}

