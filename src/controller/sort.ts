import {
  Handlers, PageStructure, RenderWinnersPage, WinnersOrder, WinnersSorting,
} from '../types/types';
import { getWinners } from '../model/winners';
import {
  WINNERS_PER_PAGE, SORT, ORDER, SORTING_OPTIONS,
} from '../constants/constants';

const sortHandler = async (
  value: string,
  page: number,
  renderWinnersPage: RenderWinnersPage,
  pageStructure: PageStructure,
  handlers: Handlers,
) => {
  let sort: WinnersSorting;
  let order: WinnersOrder;

  switch (value) {
    case SORTING_OPTIONS[0]:
      sort = SORT.wins;
      order = ORDER.asc;
      break;
    case SORTING_OPTIONS[1]:
      sort = SORT.time;
      order = ORDER.asc;
      break;
    case SORTING_OPTIONS[2]:
      sort = SORT.wins;
      order = ORDER.desc;
      break;
    default:
      sort = SORT.time;
      order = ORDER.desc;
      break;
  }

  const winners = await getWinners(page, WINNERS_PER_PAGE, sort, order);
  if (winners) {
    renderWinnersPage(
      page,
      WINNERS_PER_PAGE,
      sort,
      order,
      winners,
      pageStructure,
      handlers,
    );
  }
};

export default sortHandler;
