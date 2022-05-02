let currentLevelX = 0;
let currentLevelY = 0;

export function getCurrentLevel() {
  return {
    x: currentLevelX,
    y: currentLevelY
  }
}

export function setCurrentLevel(x, y) {
  currentLevelX = x;
  currentLevelY = y;
}

export function getCurrentLevelKey() {
  return `${currentLevelX}${currentLevelY}`;
}