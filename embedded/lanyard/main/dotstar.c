#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "esp_spi_flash.h"
#include "driver/gpio.h"

#define CLOCK_OUT 14
#define DATA_OUT 16
#define NUM_LAMPS 6


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


void rgb(int offs) {

    const int bright = 15;

    start_out();
    for( int i = 0; i < NUM_LAMPS; i += 1) {
        int idx = (i + offs) % 3;
        switch (idx) {
            case 0: frame_out(bright, 255, 0, 0); break;
            case 1: frame_out(bright, 0, 255, 0); break;
            case 2: frame_out(bright, 0, 0, 255); break;
        }
    }
    end_out();

}

void chase(int offs, uint8_t red, uint8_t green, uint8_t blue) {
    start_out();
    const uint8_t max_bright = 25;
    int head = offs % NUM_LAMPS;
    int trail1 = (offs + NUM_LAMPS - 1) % NUM_LAMPS;
    int trail2 = (offs + NUM_LAMPS - 2) % NUM_LAMPS;
    for (int i=0; i < NUM_LAMPS; i += 1) {
        if (i == head)
            frame_out(max_bright, red, green, blue);
        else if (i == trail1)
            frame_out(1, red, green, blue);
        else if (i == trail2)
            frame_out(1, red, green, blue);
        else
            frame_out(0, 0, 0, 0);
    }

}

void all(uint8_t bright, uint8_t red, uint8_t green, uint8_t blue) {
    start_out();
    for(int i=0; i < NUM_LAMPS; i += 1) {
        frame_out(bright, red, green, blue);
    }
    end_out();
}



void app_main()
{

    printf("dotstar\n");
    printf("portTick %d\n", portTICK_PERIOD_MS);

    /* Print chip information */
    esp_chip_info_t chip_info;
    esp_chip_info(&chip_info);
    printf("This is ESP32 chip with %d CPU cores, WiFi%s%s, ",
            chip_info.cores,
            (chip_info.features & CHIP_FEATURE_BT) ? "/BT" : "",
            (chip_info.features & CHIP_FEATURE_BLE) ? "/BLE" : "");

    printf("silicon revision %d, ", chip_info.revision);

    printf("%dMB %s flash\n", spi_flash_get_chip_size() / (1024 * 1024),
            (chip_info.features & CHIP_FEATURE_EMB_FLASH) ? "embedded" : "external");

    // for (int i = 10; i >= 0; i--) {
    //     printf("Restarting in %d seconds...\n", i);
    //     vTaskDelay(1000 / portTICK_PERIOD_MS);
    // }

    gpio_config_t io_conf;
    io_conf.intr_type = GPIO_PIN_INTR_DISABLE;
    io_conf.mode = GPIO_MODE_OUTPUT;
    //bit mask of the pins that you want to set,e.g.GPIO18/19
    io_conf.pin_bit_mask = ((1ULL<<DATA_OUT) | (1ULL<<CLOCK_OUT));
    io_conf.pull_down_en = 0;
    io_conf.pull_up_en = 0;
    gpio_config(&io_conf);

    // int frame = 0;

    while(1) {
        for (uint8_t i=0; i < 32; i += 1) {
            all(i,200, 90, 170);
            vTaskDelay (90 / portTICK_PERIOD_MS);
        }
        for (uint8_t i=31; i != 0; i -= 1) {
            all(i,200, 90, 170);
            vTaskDelay (90 / portTICK_PERIOD_MS);
        }
    }

    printf("done\n");
    // printf("Restarting now.\n");
    fflush(stdout);
    // esp_restart();


}

// #include <stdio.h>
// #include <string.h>
// #include <stdlib.h>
// #include "freertos/FreeRTOS.h"
// #include "freertos/task.h"
// #include "freertos/queue.h"
// #include "driver/gpio.h"


// #define GPIO_OUTPUT_IO_0    18
// #define GPIO_OUTPUT_IO_1    19
// #define GPIO_OUTPUT_PIN_SEL  ((1ULL<<GPIO_OUTPUT_IO_0) | (1ULL<<GPIO_OUTPUT_IO_1))
// #define GPIO_INPUT_IO_0     4
// #define GPIO_INPUT_IO_1     5
// #define GPIO_INPUT_PIN_SEL  ((1ULL<<GPIO_INPUT_IO_0) | (1ULL<<GPIO_INPUT_IO_1))
// #define ESP_INTR_FLAG_DEFAULT 0

// static xQueueHandle gpio_evt_queue = NULL;

// static void IRAM_ATTR gpio_isr_handler(void* arg)
// {
//     uint32_t gpio_num = (uint32_t) arg;
//     xQueueSendFromISR(gpio_evt_queue, &gpio_num, NULL);
// }

// static void gpio_task_example(void* arg)
// {
//     uint32_t io_num;
//     for(;;) {
//         if(xQueueReceive(gpio_evt_queue, &io_num, portMAX_DELAY)) {
//             printf("GPIO[%d] intr, val: %d\n", io_num, gpio_get_level(io_num));
//         }
//     }
// }

// void app_main()
// {
//     gpio_config_t io_conf;
//     //disable interrupt
//     io_conf.intr_type = GPIO_PIN_INTR_DISABLE;
//     //set as output mode
//     io_conf.mode = GPIO_MODE_OUTPUT;
//     //bit mask of the pins that you want to set,e.g.GPIO18/19
//     io_conf.pin_bit_mask = GPIO_OUTPUT_PIN_SEL;
//     //disable pull-down mode
//     io_conf.pull_down_en = 0;
//     //disable pull-up mode
//     io_conf.pull_up_en = 0;
//     //configure GPIO with the given settings
//     gpio_config(&io_conf);

//     //interrupt of rising edge
//     io_conf.intr_type = GPIO_PIN_INTR_POSEDGE;
//     //bit mask of the pins, use GPIO4/5 here
//     io_conf.pin_bit_mask = GPIO_INPUT_PIN_SEL;
//     //set as input mode
//     io_conf.mode = GPIO_MODE_INPUT;
//     //enable pull-up mode
//     io_conf.pull_up_en = 1;
//     gpio_config(&io_conf);

//     //change gpio intrrupt type for one pin
//     gpio_set_intr_type(GPIO_INPUT_IO_0, GPIO_INTR_ANYEDGE);

//     //create a queue to handle gpio event from isr
//     gpio_evt_queue = xQueueCreate(10, sizeof(uint32_t));
//     //start gpio task
//     xTaskCreate(gpio_task_example, "gpio_task_example", 2048, NULL, 10, NULL);

//     //install gpio isr service
//     gpio_install_isr_service(ESP_INTR_FLAG_DEFAULT);
//     //hook isr handler for specific gpio pin
//     gpio_isr_handler_add(GPIO_INPUT_IO_0, gpio_isr_handler, (void*) GPIO_INPUT_IO_0);
//     //hook isr handler for specific gpio pin
//     gpio_isr_handler_add(GPIO_INPUT_IO_1, gpio_isr_handler, (void*) GPIO_INPUT_IO_1);

//     //remove isr handler for gpio number.
//     gpio_isr_handler_remove(GPIO_INPUT_IO_0);
//     //hook isr handler for specific gpio pin again
//     gpio_isr_handler_add(GPIO_INPUT_IO_0, gpio_isr_handler, (void*) GPIO_INPUT_IO_0);

//     int cnt = 0;
//     while(1) {
//         printf("cnt: %d\n", cnt++);
//         vTaskDelay(1000 / portTICK_RATE_MS);
//         gpio_set_level(GPIO_OUTPUT_IO_0, cnt % 2);
//         gpio_set_level(GPIO_OUTPUT_IO_1, cnt % 2);
//     }
// }

