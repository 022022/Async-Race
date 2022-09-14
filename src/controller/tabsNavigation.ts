import { PageStructure } from '../types/types';

export const showWinners = (
  garageTab: HTMLElement,
  winnersTab: HTMLElement,
  pageStructure: PageStructure,
) => {
  pageStructure.carsInGarage.setAttribute('style', 'display: none');
  pageStructure.generalControls.setAttribute('style', 'display: none');
  pageStructure.winners.setAttribute('style', 'display: flex');

  winnersTab.classList.add('tab__active');
  garageTab.classList.remove('tab__active');
};

export const showGarage = (
  garageTab: HTMLElement,
  winnersTab: HTMLElement,
  pageStructure: PageStructure,
) => {
  pageStructure.carsInGarage.setAttribute('style', 'display: flex');
  pageStructure.generalControls.setAttribute('style', 'display: flex');
  pageStructure.winners.setAttribute('style', 'display: none');

  garageTab.classList.add('tab__active');
  winnersTab.classList.remove('tab__active');
};
