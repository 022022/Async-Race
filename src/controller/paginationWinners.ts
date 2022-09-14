import { WINNERS_PER_PAGE } from '../constants/constants';
import renderWinnersPage from '../view/winners';
import { getWinners } from '../model/winners';
import { Handlers, PageStructure } from '../types/types';

const winnersPagingHandler = async (
  pageToGo: number,
  pageStructure: PageStructure,
  handlers: Handlers,
) => {
  const winners = await getWinners(pageToGo, WINNERS_PER_PAGE, 'id', 'ASC');
  if (winners) {
    renderWinnersPage(pageToGo, WINNERS_PER_PAGE, 'id', 'ASC', winners, pageStructure, handlers);
  }
};

export default winnersPagingHandler;
