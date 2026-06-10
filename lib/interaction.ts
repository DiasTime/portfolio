// Shared mutable interaction state. Written by DOM listeners in Hero,
// read every frame inside the R3F scene — avoids re-renders entirely.
export const interaction = {
  pointerX: 0, // -1..1
  pointerY: 0, // -1..1
  scroll: 0, // 0..1 across the first viewport height
  heroVisible: true,
  reduced: false,
};
