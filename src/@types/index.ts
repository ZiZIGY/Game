export interface IPlayer extends IEntity {
  controls: IControls;
}
export interface IProjectile extends IEntity {}

export interface IEntity {
  size: ISize;
  position: IPosition;
  direction: IDirection;
  health: IHealth;
  speed: ISpeed;
  sprites: Record<
    ISpritesKeys,
    {
      image: HTMLImageElement;
      frames: {
        height: number;
        width: number;
        total: number;
        current: number;
      };
    }
  >;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface ISize {
  width: number;
  height: number;
}

export type ISpritesKeys = 'idle' | 'run' | 'attack' | 'jump';

export interface ISpeed {
  value: number;
  acceleration: number;
}

export interface IDirection {
  dx: number;
  dy: number;
}

export interface IHealth {
  current: number;
  max: number;
}

export interface IControls {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
}
