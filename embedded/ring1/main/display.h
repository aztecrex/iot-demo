#include <stdint.h>

void display_init(uint8_t pin, uint8_t size);
void display_set_color(uint8_t index, uint32_t color);
void display_set_color_c(uint8_t index, uint8_t red, uint8_t green, uint8_t blue);
void display_on();
void display_off();


