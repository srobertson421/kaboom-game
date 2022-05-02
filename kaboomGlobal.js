import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';

export const engine = kaboom({
  width: 1024,
  height: 768,
  global: false,
  background: [0,0,0],
  // scale: 6
});