#ifndef ___ANIMATION
#define ___ANIMATION

#define FADE 0
#define RGB 1

void animation_select(uint8_t index);
void animation_start();
void animation_enable();
void animation_disable();
void animation_powerup();
void animation_powerdown();

#endif
