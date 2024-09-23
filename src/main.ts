import { startGame } from './hooks/';

startGame('app', () => {
  const forestAmbient = new Audio();
  forestAmbient.src = '/public/assets/sound/forest.wav';
  forestAmbient.play();
  forestAmbient.loop = true;
  forestAmbient.volume = 0.05;
});
