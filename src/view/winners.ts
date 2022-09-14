import { RenderWinnersPage } from '../types/types';
import {
  baseUrl, CAR, SORTING_OPTIONS,
  START_PAGE,
} from '../constants/constants';

const renderWinnersPage: RenderWinnersPage = async (
  page,
  limit,
  sort,
  order,
  data,
  pageStructure,
  handlers,
) => {
  const winnersPage = document.getElementById('winners-table');
  if (winnersPage) {
    winnersPage.innerHTML = '';
  }

  const sortField = document.createElement('select');
  sortField.setAttribute('class', 'sort');
  sortField.setAttribute('id', 'sort');
  const placeholder = document.createElement('option');
  placeholder.setAttribute('disabled', 'true');
  placeholder.setAttribute('selected', 'true');
  placeholder.innerText = 'Select sorting';
  sortField.append(placeholder);

  SORTING_OPTIONS.map((item) => {
    const option = document.createElement('option');
    option.setAttribute('value', item);
    option.innerText = item;
    sortField.append(option);
    return undefined;
  });
  sortField.addEventListener('change', () => {
    sortField.setAttribute('disabled', 'true');
    handlers.sortHandler(sortField.value, page, renderWinnersPage, pageStructure, handlers);
  });

  winnersPage?.append(sortField);

  const table = document.createElement('table');
  table.classList.add('table');
  const thead = document.createElement('thead');
  thead.innerHTML = `
  <tr>
    <th>№</th>
    <th>Image of the car</th>
    <th>Name of the car</th>
    <th>Wins number</th>
    <th>Best time in seconds</th>
  </tr>
`;
  let indexInTable = (page * limit) - limit + 1;

  if (data && data.count) {
    const pageInfo = document.createElement('div');
    pageInfo.innerHTML = `Winners (page: ${page} of ${Math.ceil(Number(data.count) / limit)})`;
    winnersPage?.append(pageInfo);

    const tbody = document.createElement('tbody');

    const promises = data.data
      .map((winner) => fetch(`${baseUrl}/garage/${winner.id}`));

    const results = await Promise.all(promises);

    results.forEach(async (result) => {
      const car = await result.json();

      data.data.forEach((winner) => {
        if (winner.id === car.id) {
          const tr = document.createElement('tr');
          tr.innerHTML = `
          <td>${indexInTable}</td>
          <td>
            <svg fill="${car.color}" class="car-image-table" viewBox="0 0 322 99" xmlns="http://www.w3.org/2000/svg">${CAR}</svg>
          </td>
          <td>${car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
        `;
          tbody.append(tr);

          indexInTable += 1;
        }
      });
    });

    table.append(thead, tbody);
    winnersPage?.append(table);

    const paging = document.createElement('div');
    paging.classList.add('paging');
    const pagingNext = document.createElement('button');
    pagingNext.innerText = '⟶';
    const pagingPrev = document.createElement('button');
    pagingPrev.innerText = '⟵';

    const totalPages = Math.ceil(Number(data.count) / limit);
    if (page === totalPages) {
      pagingNext.setAttribute('disabled', 'true');
      pagingNext.classList.add('button-disabled');
    }

    if (page <= START_PAGE) {
      pagingPrev.setAttribute('disabled', 'true');
      pagingPrev.classList.add('button-disabled');
    }

    const pagingText = ` Page: ${page} / ${totalPages} `;
    paging.append(pagingPrev, pagingText, pagingNext);

    pagingNext.addEventListener('click', () => {
      const pageToGo = page + 1;
      handlers.winnersPagingHandler(pageToGo, pageStructure, handlers);
    });
    pagingPrev.addEventListener('click', () => {
      const pageToGo = page - 1;
      handlers.winnersPagingHandler(pageToGo, pageStructure, handlers);
    });

    winnersPage?.append(paging);
  }
};

export default renderWinnersPage;
