import { engine } from './kaboomGlobal.js';
import Player from './entities/player.js';
import { TILE_WIDTH, TILE_HEIGHT } from './constants.js';
import { getCurrentLevel, setCurrentLevel, getCurrentLevelKey } from './state/currentLevel.js';

const player = new Player({x: 50, y: 50}, 'down');
player.load();

engine.loadSpriteAtlas('/sprites/basictiles.png', {
  'greywall1': {
    x: TILE_WIDTH * 0,
    y: TILE_HEIGHT * 0,
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    sliceX: 1
  },
  'greywall2': {
    x: TILE_WIDTH * 1,
    y: TILE_HEIGHT * 0,
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    sliceX: 1
  },
  'greywall3': {
    x: TILE_WIDTH * 2,
    y: TILE_HEIGHT * 0,
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    sliceX: 1
  },
  'greywall4': {
    x: TILE_WIDTH * 3,
    y: TILE_HEIGHT * 0,
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    sliceX: 1
  },
  'redwall1': {
    x: TILE_WIDTH * 4,
    y: TILE_HEIGHT * 0,
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    sliceX: 1
  },
  'redwall2': {
    x: TILE_WIDTH * 5,
    y: TILE_HEIGHT * 0,
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    sliceX: 1
  },
  'redwall3': {
    x: TILE_WIDTH * 6,
    y: TILE_HEIGHT * 0,
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    sliceX: 1
  },
  'redwall4': {
    x: TILE_WIDTH * 7,
    y: TILE_HEIGHT * 0,
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    sliceX: 1
  },
  'stonefloor': {
    x: TILE_WIDTH * 6,
    y: TILE_HEIGHT * 1,
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    sliceX: 1
  }
});

const levelConfig = {
  width: 16,
  height: 16,
  pos: engine.vec2(0, 0),
  '1': () => [
    engine.sprite('greywall1'),
    engine.area(),
    engine.solid()
  ],
  '2': () => [
    engine.sprite('greywall2'),
    engine.area(),
    engine.solid()
  ],
  '3': () => [
    engine.sprite('greywall3'),
    engine.area(),
    engine.solid()
  ],
  '4': () => [
    engine.sprite('greywall4'),
    engine.area(),
    engine.solid()
  ],
  '+': () => [
    engine.sprite('stonefloor')
  ],
  '=': () => [
    engine.sprite('stonefloor'),
    engine.area({ width: 8, height: 16, offset: engine.vec2(8, 0) }),
    'exit',
    'right'
  ],
  '-': () => [
    engine.sprite('stonefloor'),
    engine.area({ width: 8, height: 16 }),
    'exit',
    'left'
  ],
  '|': () => [
    engine.sprite('stonefloor'),
    engine.area({ width: 16, height: 8 }),
    'exit',
    'up'
  ],
  '/': () => [
    engine.sprite('stonefloor'),
    engine.area({ width: 16, height: 8, offset: engine.vec2(0, 8) }),
    'exit',
    'down'
  ]
}

const levels = {
  '00': [
    '4111111114',
    '2++++++++2',
    '2++++++++2',
    '2+++++++++=',
    '2++++++++2',
    '2++++++++2',
    '31111+1113',
    '     /    '
  ],
  '10': [
    ' 4111111114',
    ' 2++++++++2',
    ' 2++++++++2',
    '-++++++++++=',
    ' 2++++++++2',
    ' 2++++++++2',
    ' 3111+11113',
    '     /     '
  ],
  '20': [
    ' 4111111114',
    ' 2++++++++2',
    ' 2++++++++2',
    '-+++++++++2',
    ' 2++++++++2',
    ' 2++++++++2',
    ' 3111+11113',
    '     /     '
  ],
  '01': [
    '     |     ',
    '41111+1114',
    '2++++++++2',
    '2++++++++2',
    '2+++++++++=',
    '2++++++++2',
    '2++++++++2',
    '3111111113'
  ],
  '11': [
    '     |     ',
    ' 4111+11114',
    ' 2++++++++2',
    ' 2++++++++2',
    '-++++++++++=',
    ' 2++++++++2',
    ' 2++++++++2',
    ' 3111111113'
  ],
  '21': [
    '     |     ',
    ' 4111+11114',
    ' 2++++++++2',
    ' 2++++++++2',
    '-+++++++++2',
    ' 2++++++++2',
    ' 2++++++++2',
    ' 3111111113'
  ]
}

engine.scene('main', () => {
  engine.camScale(engine.vec2(5, 5));

  engine.gravity(0);

  engine.addLevel(levels[getCurrentLevelKey()], levelConfig);

  player.init();

  player.update();
});

engine.go('main');