import {
  Car, GetCars, EngineStatus, PageStructure, Handlers,
} from '../types/types';

import {
  NAMES, CAR, ENGINE,
  CARS_PER_PAGE,
  START_PAGE,
} from '../constants/constants';

import startRace from '../controller/startRace';
import resetRace from '../controller/resetRace';

export const renderGeneralControls = (
  options: string[],
  page: number,
  pageStructure: PageStructure,
  handlers: Handlers,
) => {
  const createButtons = document.createElement('div');
  createButtons.classList.add('buttons-group-wrapper');
  const raceButtons = document.createElement('div');
  raceButtons.classList.add('buttons-group-wrapper');

  const createField = document.createElement('input');
  createField.setAttribute('class', 'create');
  createField.setAttribute('placeholder', 'Enter Name');

  const colorField = document.createElement('input');
  colorField.setAttribute('type', 'color');

  const createButton = document.createElement('button');
  createButton.setAttribute('class', 'button');
  createButton.innerText = 'Create Car';
  createButton.addEventListener('click', () => handlers.creationHandler(
    createField.value,
    colorField.value,
    page,
    pageStructure,
    handlers,
  ));

  const generateBlock = document.createElement('div');
  generateBlock.classList.add('generate');
  const generateButton = document.createElement('button');
  generateButton.setAttribute('class', 'button');
  generateButton.innerText = 'Generate 100 Cars';
  generateButton.addEventListener('click', () => handlers.generateCarsHandler(page, pageStructure, handlers));

  generateBlock.append(generateButton);

  createButtons.append(createField, colorField, createButton, generateBlock);

  const startRaceButton = document.createElement('button');
  startRaceButton.classList.add('button');
  startRaceButton.setAttribute('id', 'start-race');
  startRaceButton.innerText = 'Start Race';
  startRaceButton.addEventListener('click', () => startRace(pageStructure, handlers));

  const resetRaceButton = document.createElement('button');
  resetRaceButton.classList.add('button');
  resetRaceButton.setAttribute('id', 'reset-race');
  resetRaceButton.innerText = 'Reset Race';
  resetRaceButton?.addEventListener('click', () => resetRace());

  raceButtons.append(startRaceButton, resetRaceButton);

  pageStructure.generalControls.append(createButtons, raceButtons);

  return pageStructure.generalControls;
};

export const renderControls = (
  car: Car,
  page: number,
  pageStructure: PageStructure,
  handlers: Handlers,
) => {
  const controls = document.createElement('div');
  controls.setAttribute('class', 'controls');

  const stopButton = document.createElement('button');
  stopButton.classList.add('button', 'primary-button', 'controls-button', 'button-disabled');
  stopButton.setAttribute('id', `stop-${car.id}`);
  stopButton.innerText = '⮜ Cancel';

  const startButton = document.createElement('button');
  startButton.classList.add('button', 'primary-button', 'controls-button');
  startButton.setAttribute('id', `start-${car.id}`);
  startButton.innerText = 'Start ⮞';

  startButton.addEventListener('click', () => {
    if (!startButton.classList.contains('button-disabled')) {
      startButton.classList.toggle('started');
      let status: EngineStatus;
      if (startButton.classList.contains('started')) {
        status = ENGINE.started;
      } else {
        status = ENGINE.stopped;
      }
      handlers.startStopHandler(startButton, status, stopButton, pageStructure, handlers);
    }
  });

  const editButton = document.createElement('button');
  editButton.classList.add('button', 'controls-button');
  editButton.setAttribute('id', `edit-${car.id}`);
  editButton.innerText = 'Edit';
  editButton.addEventListener('click', (e) => handlers.editHandler(e?.target, pageStructure, handlers));

  const removeButton = document.createElement('button');
  removeButton.classList.add('button', 'controls-button');
  removeButton.setAttribute('id', `remove-${car.id}`);
  removeButton.innerText = 'Delete';
  removeButton.addEventListener('click', (e) => handlers.removeHandler(e?.target, page, pageStructure, handlers));

  controls.append(stopButton, startButton, removeButton, editButton);

  return controls;
};

export const renderCarLine = (
  car: Car,
  page: number,
  pageStructure: PageStructure,
  handlers: Handlers,
) => {
  const carLine = document.createElement('div');
  carLine.setAttribute('class', 'car-line');

  const controls = renderControls(car, page, pageStructure, handlers);

  const carInfo = document.createElement('div');
  carInfo.setAttribute('class', 'car-info');

  const carImg = document.createElement('div');
  carImg.setAttribute('id', car.id);
  carImg.innerHTML = `<svg fill="${car.color}" class="car-image" viewBox="0 0 322 99" xmlns="http://www.w3.org/2000/svg">${CAR}</svg>`;

  const nameInfo = document.createElement('div');
  nameInfo.innerHTML = `<span id='name-${car.id}'>${car.name}</span>`;

  const message = document.createElement('div');
  message.setAttribute('id', `message-${car.id}`);
  message.classList.add('message');

  carInfo.append(nameInfo, carImg);

  const leftSide = document.createElement('div');
  leftSide.classList.add('left-side');
  leftSide.append(message, controls, carInfo);
  const rightSide = document.createElement('div');
  rightSide.setAttribute('id', `flag-${car.id}`);
  rightSide.classList.add('flag');
  rightSide.innerHTML = '|';

  carLine.append(leftSide, rightSide);

  return carLine;
};

export const renderPaging = (
  cars: GetCars,
  page: number,
  pageStructure: PageStructure,
  handlers: Handlers,
) => {
  const paging = document.createElement('div');
  paging.classList.add('paging');
  const pagingNext = document.createElement('button');
  pagingNext.innerText = '⟶';
  const pagingPrev = document.createElement('button');
  pagingPrev.innerText = '⟵';

  const totalPages = Math.ceil(Number(cars.count) / CARS_PER_PAGE);
  if (page === totalPages) {
    pagingNext.setAttribute('disabled', 'true');
    pagingNext.classList.add('button-disabled');
  }

  if (page <= START_PAGE) {
    pagingPrev.setAttribute('disabled', 'true');
    pagingPrev.classList.add('button-disabled');
  }

  const pagingText = ` Page: ${page} / ${Math.ceil(Number(cars.count) / CARS_PER_PAGE)} `;
  paging.append(pagingPrev, pagingText, pagingNext);

  pagingNext.addEventListener('click', () => {
    const pageToGo = page + 1;
    handlers.pagingHandler(pageToGo, pageStructure, handlers);
  });
  pagingPrev.addEventListener('click', () => {
    const pageToGo = page - 1;
    handlers.pagingHandler(pageToGo, pageStructure, handlers);
  });

  return paging;
};

export const renderCarsInGarage = (
  cars: GetCars,
  page: number,
  pageStructure: PageStructure,
  handlers: Handlers,
) => {
  const carsInGarage = new DocumentFragment();

  const garageHeading = document.createElement('div');
  garageHeading.innerText = `Cars in garage: ${cars.count} (${CARS_PER_PAGE} cars per page)`;

  carsInGarage.append(garageHeading);

  cars.data.forEach((car) => {
    const carLine = renderCarLine(car, page, pageStructure, handlers);
    carsInGarage.append(carLine);
  });

  const paging = renderPaging(
    cars,
    page,
    pageStructure,
    handlers,
  );

  carsInGarage.append(paging);

  return carsInGarage;
};

export const renderNavigation = (handlers: Handlers, pageStructure: PageStructure) => {
  const garageTab = document.createElement('div');
  garageTab.classList.add('tab', 'tab__active');
  garageTab.setAttribute('id', 'garage-tab');
  garageTab.innerText = 'Garage';

  const winnersTab = document.createElement('div');
  winnersTab.classList.add('tab');
  winnersTab.setAttribute('id', 'winners-tab');
  winnersTab.innerText = 'Winners';

  garageTab.addEventListener('click', () => handlers.showGarage(garageTab, winnersTab, pageStructure));
  winnersTab.addEventListener('click', () => handlers.showWinners(garageTab, winnersTab, pageStructure));

  pageStructure.navigation.append(garageTab, winnersTab);
  return pageStructure.navigation;
};

export const renderGaragePage = (
  cars: GetCars,
  page: number,
  pageStructure: PageStructure,
  handlers: Handlers,
) => {
  const header = renderNavigation(handlers, pageStructure);

  const create = renderGeneralControls(
    NAMES,
    page,
    pageStructure,
    handlers,
  );

  const carsInGarageFragment = renderCarsInGarage(
    cars,
    page,
    pageStructure,
    handlers,
  );
  pageStructure.carsInGarage.append(carsInGarageFragment);

  pageStructure.wrapper.append(
    header,
    create,
    pageStructure.carsInGarage,
    pageStructure.winners,
    pageStructure.popup,
  );

  document.body.append(pageStructure.wrapper);
};
