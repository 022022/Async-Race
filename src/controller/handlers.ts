import {
  createCar, deleteCar, getCars, updateCar, getCar,
} from '../model/garage';
import { startStopEngine, switchToDrive } from '../model/engine';
import { EngineStatus, Handlers, PageStructure } from '../types/types';
import Animate from './animate';
import {
  STATUS, ENGINE, CARS_PER_PAGE, START_PAGE, WINNERS_PER_PAGE, CAR,
} from '../constants/constants';
import showPopup from '../view/popup';
import updateCarsBlock from './updateCarsBlock';

import { deleteWinner, getWinners } from '../model/winners';
import renderWinnersPage from '../view/winners';

const parseId = (target: EventTarget | null) => {
  const elemId = (target as HTMLElement).id;
  const [action, id] = elemId.split('-');
  return Number(id);
};

export const startStopHandler = async (
  startButton: HTMLElement | null,
  status: EngineStatus,
  stopButton: HTMLElement,
) => {
  startButton?.classList.add('button-disabled');

  const id = parseId(startButton);
  const message = document.getElementById(`message-${id}`);

  const data = await startStopEngine(id, status);

  stopButton?.classList.remove('button-disabled');
  const { velocity, distance } = data;
  const time = Number(distance) / Number(velocity);
  const animate = Animate(Number(id), time);

  if (Number(velocity) > 0) {
    animate.start();

    if (!stopButton.classList.contains('button-disabled')) {
      stopButton?.addEventListener('click', async () => {
        stopButton?.classList.add('button-disabled');
        const dataToStop = await startStopEngine(id, ENGINE.stopped);

        if (Number(dataToStop.velocity) === 0) {
          animate.stop();
          const car = document.getElementById(String(id));
          if (car && message) {
            car.style.transform = 'translateX(0px)';
            message.innerText = '';
            startButton?.classList.remove('button-disabled', 'started');
          }
        }
      });
    }

    const result = await switchToDrive(id);

    if (result && message && startButton?.classList.contains('started')) {
      switch (result.status) {
        case STATUS.error:
          message.innerText = 'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"';
          animate.stop();
          break;
        case STATUS.notFound:
          message.innerText = 'Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?';
          animate.stop();
          break;
        case STATUS.tooManyRequests:
          message.innerText = 'Drive already in progress. You can\'t run drive for the same car twice while it\'s not stopped.';
          animate.stop();
          break;
        case STATUS.internalServerError:
          message.innerText = 'Car has been stopped suddenly. It\'s engine was broken down.';
          animate.stop();
          break;
        default:
          break;
      }
    }
  }
};

export const removeHandler = async (
  target: EventTarget | null,
  page: number,
  pageStructure: PageStructure,
  handlers: Handlers,
) => {
  const id = parseId(target);

  await deleteWinner(id);
  const winners = await getWinners(START_PAGE, WINNERS_PER_PAGE, 'id', 'ASC');
  if (winners) {
    renderWinnersPage(START_PAGE, WINNERS_PER_PAGE, 'id', 'ASC', winners, pageStructure, handlers);
  }

  await deleteCar(id);
  const cars = await getCars(CARS_PER_PAGE, page);
  if (cars) {
    updateCarsBlock(cars, page, pageStructure, handlers);
  }
};

export const creationHandler = async (
  name: string,
  color: string,
  page: number,
  pageStructure: PageStructure,
  handlers: Handlers,
) => {
  const newCar = { name, color };
  await createCar(newCar);

  const cars = await getCars(CARS_PER_PAGE, page);
  if (cars) {
    updateCarsBlock(cars, page, pageStructure, handlers);
  }
};

export const updateHandler = async (id: string, name: string, color: string) => {
  const carData = { name, color };
  await updateCar(Number(id), carData);
  const car = await getCar(Number(id));
  if (car) {
    const carElem = document.getElementById(id);
    const nameElem = document.getElementById(`name-${id}`);

    if (carElem && nameElem) {
      carElem.innerHTML = `<svg fill="${car.color}" class="car-image" viewBox="0 0 322 99" xmlns="http://www.w3.org/2000/svg">${CAR}</svg>`;
      nameElem.innerHTML = car.name;
    }
  }
};

export const editHandler = async (target: EventTarget | null) => {
  const elemId = (target as HTMLElement).id;
  const [action, id] = elemId.split('-');
  const car = await getCar(Number(id));
  if (car) showPopup(car, updateHandler);
};
