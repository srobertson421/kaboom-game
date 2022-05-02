import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';

kaboom();

loadSprite('bean', 'sprites/bean.png');

scene('game', () => {
  gravity(2400);

  let score = 0;

  const scoreLabel = add([
    text(score),
    pos(24, 24)
  ]);

  const bean = add([
    sprite('bean'),
    pos(80, 40),
    area(),
    body()
  ]);
  
  // Ground
  add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(127, 200, 255)
  ]);
  
  bean.onCollide('tree', () => {
    addKaboom(bean.pos);
    shake();
    go('lose');
  });
  
  function spawnTree() {
    add([
      rect(48, rand(24, 64)),
      area(),
      outline(4),
      pos(width(), height() - 48),
      origin('botleft'),
      color(255, 180, 255),
      move(LEFT, 240),
      'tree'
    ]);
  
    wait(rand(0.5, 1.5), () => {
      spawnTree();
    });
  }
  
  spawnTree();

  onKeyPress('space', () => {
    if(bean.isGrounded()) {
      bean.jump();
    }
  });
});

scene("lose", () => {
  add([
    text("Game Over"),
    pos(center()),
    origin("center"),
  ])
})

go('game');