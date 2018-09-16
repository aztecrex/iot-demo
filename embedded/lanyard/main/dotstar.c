#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "esp_spi_flash.h"
#include "driver/gpio.h"
#include "dotstar.h"

#define NUM_LAMPS 6
#define CLOCK_OUT 14
#define DATA_OUT 16

static bool configured = false;


void dotstar_configure() {

    gpio_config_t io_conf;
    io_conf.intr_type = GPIO_PIN_INTR_DISABLE;
    io_conf.mode = GPIO_MODE_OUTPUT;
    //bit mask of the pins that you want to set,e.g.GPIO18/19
    io_conf.pin_bit_mask = ((1ULL<<DATA_OUT) | (1ULL<<CLOCK_OUT));
    io_conf.pull_down_en = 0;
    io_conf.pull_up_en = 0;
    gpio_config(&io_conf);

    configured = true;

}

void data(uint8_t bit) {
    gpio_set_level(DATA_OUT, bit & 1);
}

void clock() {
    gpio_set_level(CLOCK_OUT, 1);
    gpio_set_level(CLOCK_OUT, 0);
}


void byte_out(uint8_t v) {
    for(int i=0; i< 8; i+=1) {
        data(v >> (7 - i));
        clock();
    }
}

void start_out() {
    byte_out(0);
    byte_out(0);
    byte_out(0);
    byte_out(0);
}

void frame_out(uint8_t bright, uint8_t red, uint8_t green, uint8_t blue) {
    byte_out(0b11100000 | bright);
    byte_out(red);
    byte_out(green);
    byte_out(blue);
}

void end_out() {
    byte_out(255);
    byte_out(255);
    byte_out(255);
    byte_out(255);
}

void pixel_out(pixel p) {
    frame_out(p.brightness, p.red, p.green, p.blue);
}

void dotstar_show(const pixel const *pixels) {
    if (!configured) {
        printf("Dotstar not configured, cannot show\n");
        return;
    }
    start_out();
    for(int i=0; i<NUM_LAMPS; i += 1) {
        pixel_out(*(pixels + i));
    }
    end_out();
}


