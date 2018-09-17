#include <stdio.h>
#include <stdbool.h>
#include <time.h>
#include <stdlib.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

#include "animation.h"
#include "dotstar.h"


#define NUM_LAMPS 6

static uint8_t curanimation = 0;
static bool running = false;
static bool started = false;
static bool powered = false;

static void delay_ms(unsigned ms) {
    vTaskDelay(ms / portTICK_PERIOD_MS);
}

uint8_t animation_select(uint8_t index) {
    curanimation = index % NUM_ANIMATIONS;
    return curanimation;
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
    delay_ms(80);
}


pixel* init_black() {
    static pixel dot_black = {31,0,0,0};
    pixel* rval = malloc(sizeof(pixel) * NUM_LAMPS);
    for(unsigned i=0; i< NUM_LAMPS; i += 1) {
        *(rval + i) = dot_black;
    }
    return rval;
}

pixel randpix() {
    uint8_t red = rand() % 256;
    uint8_t green = rand() % 256;
    uint8_t blue = rand() % 256;
    pixel rval = {31, red, green, blue};
    return rval;
}

pixel* init_random() {
    pixel* rval = malloc(sizeof(pixel) * NUM_LAMPS);
    for(unsigned i=0; i< NUM_LAMPS; i += 1) {
        (*(rval + i)) = randpix();
    }
    return rval;
}

void sparkle(unsigned frame) {
    static pixel *dots = 0;
    static pixel *targs = 0;
    if (!dots) dots = init_black();
    if (!targs) targs = init_random();
    if (frame % 7 == 0) {
        unsigned pix1 = frame % NUM_LAMPS;
        *(targs + pix1) = randpix();
        unsigned pix2 = (frame + NUM_LAMPS / 3) % NUM_LAMPS;
        *(targs + pix2) = randpix();
        unsigned pix3 = (frame + (NUM_LAMPS * 2) / 3) % NUM_LAMPS;
        *(targs + pix3) = randpix();
    }
    for (unsigned i=0; i< NUM_LAMPS; i += 1) {
        (*(dots + i)).red = (*(dots + i)).red / 2 + (*(targs + i)).red / 2;
        (*(dots + i)).green = (*(dots + i)).green / 2 + (*(targs + i)).green / 2;
        (*(dots + i)).blue = (*(dots + i)).blue / 2 + (*(targs + i)).blue / 2;
    }
    dotstar_show(dots);
    delay_ms(20);
}

unsigned normal (unsigned pos, bool direction) {
    unsigned offs = pos % NUM_LAMPS;
    return direction ? offs : (NUM_LAMPS - offs);
}

unsigned adjacent(unsigned pos, bool direction) {
    return (pos + NUM_LAMPS + (direction ? 1 : -1)) % NUM_LAMPS;
}

void googley(unsigned frame, bool direction) {
    static pixel dot_full = {31, 0, 255, 0};
    static pixel dot_t1 = {8, 0, 64, 0};
    static pixel dot_t2 = {4, 0, 20, 0};
    static pixel dot_black = {0, 0, 0, 0};
    uint8_t lead = normal(frame, direction);
    uint8_t tail1 = adjacent(lead, direction);
    uint8_t tail2 = adjacent(tail1, direction);
    pixel dots[NUM_LAMPS];
    for (uint8_t i = 0; i < NUM_LAMPS; ++i) {
        if (i == lead) {
            dots[i] = dot_full;
        } else if (i == tail1) {
            dots[i] = dot_t1;
        } else if (i == tail2) {
            dots[i] = dot_t2;
        } else {
            dots[i] = dot_black;
        }
    }
    dotstar_show(dots);
    delay_ms(40);

}


void show_frame(unsigned frame) {
    if (!running) return;
    switch (curanimation) {
        case FADE: fade(frame); break;
        case GOOGLEY: googley(frame, true); break;
        case GOOGLEY_REV: googley(frame, false); break;
        case SPARKLE: sparkle(frame); break;
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
    time_t t;
    srand((unsigned) time(&t));
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

