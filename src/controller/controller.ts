import { getCars } from '../model/garage';
import { GetCars } from '../types/types';
import { START_PAGE, CARS_PER_PAGE, WINNERS_PER_PAGE } from '../constants/constants';
import { renderGaragePage } from '../view/garage';
import {
  creationHandler, removeHandler, startStopHandler, updateHandler, editHandler,
} from './handlers';
import pagingHandler from './pagination';
import generateCarsHandler from './generate';
import renderWinnersPage from '../view/winners';
import { getWinners } from '../model/winners';
import sortHandler from './sort';
import winnersPagingHandler from './paginationWinners';
import renderPageStructure from '../view/pageStructure';
import { showGarage, showWinners } from './tabsNavigation';

const controller = async () => {
  const pageStructure = renderPageStructure();
  const handlers = {
    editHandler,
    creationHandler,
    removeHandler,
    updateHandler,
    startStopHandler,
    pagingHandler,
    generateCarsHandler,
    sortHandler,
    winnersPagingHandler,
    showGarage,
    showWinners,
  };

  const cars: GetCars | null = await getCars(CARS_PER_PAGE, START_PAGE);

  if (cars) {
    renderGaragePage(cars, START_PAGE, pageStructure, handlers);
  }

  const winners = await getWinners(START_PAGE, WINNERS_PER_PAGE, 'id', 'ASC');

  if (winners) {
    renderWinnersPage(START_PAGE, WINNERS_PER_PAGE, 'id', 'ASC', winners, pageStructure, handlers);
  }
};

export default controller;
