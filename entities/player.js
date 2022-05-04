import { engine } from '../kaboomGlobal.js';
import {
  PLAYER_ANIM_SPEED,
  PLAYER_SPEED,
  TILE_WIDTH,
  TILE_HEIGHT
} from '../constants.js';
import { setCurrentLevel, getCurrentLevel } from '../state/currentLevel.js';

// Singleton pattern - constructor run once
class Player {
  constructor(pos, direction) {
    this.animSpeed = PLAYER_ANIM_SPEED;
    this.speed = PLAYER_SPEED;
    this.pos = pos;
    this.direction = direction;
    this.player = null;
  }

  load() {
    engine.loadSpriteAtlas('/sprites/characters.png', {
      'player': {
        x: TILE_WIDTH * 3,
        y: TILE_HEIGHT * 0,
        width: TILE_WIDTH * 3,
        height: TILE_HEIGHT * 4,
        sliceX: 3,
        sliceY: 4,
        anims: {
          'movedown': {
            from: 0,
            to: 2,
            speed: PLAYER_ANIM_SPEED,
            loop: true,
            pingpong: true
          },
          'idledown': {
            from: 1,
            to: 1,
            speed: PLAYER_ANIM_SPEED,
            loop: true,
            pingpong: true
          },
          'moveleft': {
            from: 3,
            to: 5,
            speed: PLAYER_ANIM_SPEED,
            loop: true,
            pingpong: true
          },
          'idleleft': {
            from: 4,
            to: 4,
            speed: PLAYER_ANIM_SPEED,
            loop: true,
            pingpong: true
          },
          'moveright': {
            from: 6,
            to: 8,
            speed: PLAYER_ANIM_SPEED,
            loop: true,
            pingpong: true
          },
          'idleright': {
            from: 7,
            to: 7,
            speed: PLAYER_ANIM_SPEED,
            loop: true,
            pingpong: true
          },
          'moveup': {
            from: 9,
            to: 11,
            speed: PLAYER_ANIM_SPEED,
            loop: true,
            pingpong: true
          },
          'idleup': {
            from: 10,
            to: 10,
            speed: PLAYER_ANIM_SPEED,
            loop: true,
            pingpong: true
          }
        }
      }
    });
  }

  init() {
    this.player = engine.add([
      engine.pos(this.pos.x, this.pos.y),
      engine.sprite('player', { anim: this.player ? this.player.curAnim() : 'idle' + this.direction }),
      engine.origin('bot'),
      engine.area({ width: 10, height: 8 }),
      engine.solid()
    ]);
  }

  update() {
    engine.onKeyDown('right', () => {
      this.player.move(PLAYER_SPEED, 0);
    });
  
    engine.onKeyPress('right', () => {
      this.player.play('moveright');
      this.direction = 'right';
    });
  
    engine.onKeyDown('left', () => {
      this.player.move(-PLAYER_SPEED, 0);
    });
  
    engine.onKeyPress('left', () => {
      this.player.play('moveleft');
      this.direction = 'left';
    });
  
    engine.onKeyDown('up', () => {
      this.player.move(0, -PLAYER_SPEED);
    });
  
    engine.onKeyPress('up', () => {
      this.player.play('moveup');
      this.direction = 'up';
    });
  
    engine.onKeyDown('down', () => {
      this.player.move(0, PLAYER_SPEED);
    });
  
    engine.onKeyPress('down', () => {
      this.player.play('movedown');
      this.direction = 'down';
    });
  
    engine.onKeyRelease(["left", "right", "up", "down"], () => {
      if (
          !engine.isKeyDown("left")
          && !engine.isKeyDown("right")
          && !engine.isKeyDown("up")
          && !engine.isKeyDown("down")
      ) {
          this.player.play('idle' + this.direction);
      }
    });
  
    this.player.onUpdate(() => {
      engine.camPos(this.player.pos);
      this.pos = this.player.pos;
    });
  
    this.player.onCollide('exit', exitTile => {
      if(exitTile.is('right')) {
        this.pos.x = 16;
        setCurrentLevel(getCurrentLevel().x + 1, getCurrentLevel().y);
        engine.go('main');
      } else if(exitTile.is('left')) {
        this.pos.x = 144;
        setCurrentLevel(getCurrentLevel().x - 1, getCurrentLevel().y);
        engine.go('main');
      } else if(exitTile.is('up')) {
        this.pos.y = 110;
        setCurrentLevel(getCurrentLevel().x, getCurrentLevel().y - 1);
        engine.go('main');
      } else if(exitTile.is('down')) {
        this.pos.y = 16;
        setCurrentLevel(getCurrentLevel().x, getCurrentLevel().y + 1);
        engine.go('main');
      }
    });
  }
}

export default Player;