import {
  START_PAGE, WINNERS_PER_PAGE, MILLISECONDS,
} from '../constants/constants';

import {
  createWinner, getWinners, getWinner, updateWinner,
} from '../model/winners';
import renderWinnersPage from '../view/winners';
import { Handlers, PageStructure } from '../types/types';

const addToWinnersTable = async (
  id: number,
  finishTime: number,
  pageStructure: PageStructure,
  handlers: Handlers,
) => {
  const isThereSuchWinner = await getWinner(id);

  const time = Math.round(finishTime / MILLISECONDS);

  if (!isThereSuchWinner) {
    const winnerData = { id, wins: 1, time };
    await createWinner(winnerData);
  } else {
    let bestTime = time;

    if (isThereSuchWinner.time < time) {
      bestTime = isThereSuchWinner.time;
    }

    const winnerData = { id, wins: isThereSuchWinner.wins + 1, time: bestTime };
    await updateWinner(id, winnerData);
  }

  const winners = await getWinners(START_PAGE, WINNERS_PER_PAGE, 'id', 'ASC');
  if (winners) {
    renderWinnersPage(START_PAGE, WINNERS_PER_PAGE, 'id', 'ASC', winners, pageStructure, handlers);
  }
};

export default addToWinnersTable;
