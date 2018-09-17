#ifndef ___ANIMATION
#define ___ANIMATION

#define FADE 0
#define RGB 1

uint8_t animation_select(uint8_t index);
void animation_start();
void animation_enable();
void animation_disable();
void animation_powerup();
void animation_powerdown();

#endif
