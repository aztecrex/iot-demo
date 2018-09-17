#ifndef ___ANIMATION
#define ___ANIMATION

#define FADE 0
#define GOOGLEY 1
#define GOOGLEY_REV 2
#define SPARKLE 3

#define NUM_ANIMATIONS 4

uint8_t animation_select(uint8_t index);
void animation_start();
void animation_enable();
void animation_disable();
void animation_powerup();
void animation_powerdown();

#endif
