import { IControls, IPlayer, ISpritesKeys } from '../@types';

export const startGame = (canvasId: string, callback: () => void) => {
  let previousTime = 0;

  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const player = spawnPlayer();

  setPlayerControls(player.controls);

  const update = (time: number) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (~~(time / 1000) > previousTime) {
      previousTime++;

      player.sprites.idle.frames.current =
        (player.sprites.idle.frames.current + 1) %
        player.sprites.idle.frames.total;
    }

    if (player.controls.right) {
      player.position.x += player.speed.value;
    }

    if (player.controls.left) {
      player.position.x -= player.speed.value;
    }

    if (player.controls.down) {
      player.position.y += player.speed.value;
    }

    if (player.controls.up) {
      player.position.y -= player.speed.value;
    }
    ctx.save();
    ctx.drawImage(
      player.sprites.idle.image,
      player.sprites.idle.frames.width * player.sprites.idle.frames.current,
      0,
      player.sprites.idle.frames.width,
      player.sprites.idle.frames.height,
      player.position.x,
      player.position.y,
      player.sprites.idle.frames.width,
      player.sprites.idle.frames.height
    );
    ctx.restore();

    ctx.beginPath();
    ctx.rect(
      player.position.x + player.size.width / 2,
      player.position.y,
      player.size.width,
      player.size.height
    );
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();
    requestAnimationFrame(update);
  };

  update(0);

  callback();
};

export const spawnPlayer = (x = 0, y = 0) => {
  const spritesPath: Record<ISpritesKeys, string> = {
    run: '/public/assets/entities/player/RunAttack.png',
    idle: '/public/assets/entities/player/Idle.png',
    jump: '/public/assets/entities/player/Jump.png',
    attack: '/public/assets/entities/player/Attack.png',
  };

  const player: IPlayer = {
    controls: {
      left: false,
      right: false,
      up: false,
      down: false,
    },
    size: {
      height: 29,
      width: 16,
    },
    health: {
      current: 100,
      max: 100,
    },
    position: {
      x,
      y,
    },
    direction: {
      dx: 0,
      dy: 0,
    },
    speed: {
      value: 1,
      acceleration: 0,
    },
    sprites: {
      idle: {
        image: new Image(),
        frames: {
          height: 29,
          width: 42,
          total: 4,
          current: 0,
        },
      },
      run: {
        image: new Image(),
        frames: {
          height: 32,
          width: 64,
          total: 6,
          current: 0,
        },
      },
      jump: {
        image: new Image(),
        frames: {
          height: 32,
          width: 64,
          total: 2,
          current: 0,
        },
      },
      attack: {
        image: new Image(),
        frames: {
          height: 32,
          width: 64,
          total: 4,
          current: 1,
        },
      },
    },
  };

  for (const key of Object.keys(spritesPath)) {
    player.sprites[key as ISpritesKeys].image.src =
      spritesPath[key as ISpritesKeys];
  }

  return player;
};

export const setPlayerControls = (controls: IControls) => {
  window.onkeyup = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'a':
        controls.left = false;
        break;
      case 'd':
        controls.right = false;
        break;
      case 'w':
        controls.up = false;
        break;
      case 's':
        controls.down = false;
        break;
      case '':
        break;
    }
  };

  window.onkeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'a':
        controls.left = true;
        break;
      case 'd':
        controls.right = true;
        break;
      case 'w':
        controls.up = true;
        break;
      case 's':
        controls.down = true;
        break;
      case '':
        break;
    }
  };
};
