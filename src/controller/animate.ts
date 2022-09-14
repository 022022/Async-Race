import { AnimateHandler } from '../types/types';
import { CAR_WIDTH } from '../constants/constants';

const Animate = (id: number, time: number) => {
  let animationID = 0;
  let step: AnimateHandler;

  const car = document.getElementById(String(id));

  const flag = document.getElementById(`flag-${id}`);

  if (car && flag) {
    const carHeadX = car.getBoundingClientRect().x + car.clientWidth;
    const distanceToGo = flag.getBoundingClientRect().x - carHeadX + CAR_WIDTH;
    const realVelocity = distanceToGo / time;

    let start: DOMHighResTimeStamp;
    let previousTimeStamp: DOMHighResTimeStamp;
    let done = false;

    step = (timestamp: DOMHighResTimeStamp) => {
      if (!start) start = timestamp;

      const elapsed = timestamp - start;

      if (previousTimeStamp !== timestamp) {
        const distanceDriven = realVelocity * elapsed;

        car.style.transform = `translateX(${distanceDriven}px)`;
        if (distanceDriven === distanceToGo) done = true;
      }

      if (elapsed < time) {
        previousTimeStamp = timestamp;
        if (!done) {
          animationID = requestAnimationFrame(step);
        }
      }
    };
  }

  return {
    start: () => { animationID = requestAnimationFrame(step); },
    stop: () => { cancelAnimationFrame(animationID); },
  };
};

export default Animate;
