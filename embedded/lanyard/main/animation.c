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

void animation_task(void *param) {
    unsigned frame = 0;
    while(1) {
        printf("switch to running\n");
        while (running) {
            show_frame(frame);
            frame += 1;
        }
        clear();
        printf("switch to idle\n");
        while (!running) {
            vTaskDelay(1000 / portTICK_PERIOD_MS);
        }
    }
}

void animation_start() {
    if (!started)
        xTaskCreatePinnedToCore(&animation_task, "animation_task", 8192, NULL, 5, NULL, 1);
    started = true;
}



// void rgb(int offs) {

//     const int bright = 15;

//     start_out();
//     for( int i = 0; i < NUM_LAMPS; i += 1) {
//         int idx = (i + offs) % 3;
//         switch (idx) {
//             case 0: frame_out(bright, 255, 0, 0); break;
//             case 1: frame_out(bright, 0, 255, 0); break;
//             case 2: frame_out(bright, 0, 0, 255); break;
//         }
//     }
//     end_out();

// }

// void chase(int offs, uint8_t red, uint8_t green, uint8_t blue) {
//     start_out();
//     const uint8_t max_bright = 25;
//     int head = offs % NUM_LAMPS;
//     int trail1 = (offs + NUM_LAMPS - 1) % NUM_LAMPS;
//     int trail2 = (offs + NUM_LAMPS - 2) % NUM_LAMPS;
//     for (int i=0; i < NUM_LAMPS; i += 1) {
//         if (i == head)
//             frame_out(max_bright, red, green, blue);
//         else if (i == trail1)
//             frame_out(1, red, green, blue);
//         else if (i == trail2)
//             frame_out(1, red, green, blue);
//         else
//             frame_out(0, 0, 0, 0);
//     }

// }

// void all(uint8_t bright, uint8_t red, uint8_t green, uint8_t blue) {
//     start_out();
//     for(int i=0; i < NUM_LAMPS; i += 1) {
//         frame_out(bright, red, green, blue);
//     }
//     end_out();
// }



// void was_app_main()
// {

//     printf("dotstar\n");
//     printf("portTick %d\n", portTICK_PERIOD_MS);

//     /* Print chip information */
//     esp_chip_info_t chip_info;
//     esp_chip_info(&chip_info);
//     printf("This is ESP32 chip with %d CPU cores, WiFi%s%s, ",
//             chip_info.cores,
//             (chip_info.features & CHIP_FEATURE_BT) ? "/BT" : "",
//             (chip_info.features & CHIP_FEATURE_BLE) ? "/BLE" : "");

//     printf("silicon revision %d, ", chip_info.revision);

//     printf("%dMB %s flash\n", spi_flash_get_chip_size() / (1024 * 1024),
//             (chip_info.features & CHIP_FEATURE_EMB_FLASH) ? "embedded" : "external");

//     // for (int i = 10; i >= 0; i--) {
//     //     printf("Restarting in %d seconds...\n", i);
//     //     vTaskDelay(1000 / portTICK_PERIOD_MS);
//     // }

//     gpio_config_t io_conf;
//     io_conf.intr_type = GPIO_PIN_INTR_DISABLE;
//     io_conf.mode = GPIO_MODE_OUTPUT;
//     //bit mask of the pins that you want to set,e.g.GPIO18/19
//     io_conf.pin_bit_mask = ((1ULL<<DATA_OUT) | (1ULL<<CLOCK_OUT));
//     io_conf.pull_down_en = 0;
//     io_conf.pull_up_en = 0;
//     gpio_config(&io_conf);

//     // int frame = 0;

//     while(1) {
//         for (uint8_t i=0; i < 32; i += 1) {
//             all(i,200, 90, 170);
//             vTaskDelay (90 / portTICK_PERIOD_MS);
//         }
//         for (uint8_t i=31; i != 0; i -= 1) {
//             all(i,200, 90, 170);
//             vTaskDelay (90 / portTICK_PERIOD_MS);
//         }
//     }

//     printf("done\n");
//     // printf("Restarting now.\n");
//     fflush(stdout);
//     // esp_restart();


// }
