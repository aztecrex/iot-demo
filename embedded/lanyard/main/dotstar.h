#ifndef __DOTSTAR
#define __DOTSTAR

#include <stdint.h>

typedef struct _pixel {

    uint8_t brightness;
    uint8_t red;
    uint8_t green;
    uint8_t blue;

} pixel;

void dotstar_show(const pixel const *pixels);
void dotstar_configure();

#endif
