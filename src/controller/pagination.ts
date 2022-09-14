import { getCars } from '../model/garage';
import { CARS_PER_PAGE } from '../constants/constants';
import { GetCars, Handlers, PageStructure } from '../types/types';
import updateCarsBlock from './updateCarsBlock';

const pagingHandler = async (
  pageToGo: number,
  pageStructure: PageStructure,
  handlers: Handlers,
) => {
  const cars: GetCars | null = await getCars(CARS_PER_PAGE, pageToGo);

  if (cars) {
    updateCarsBlock(
      cars,
      pageToGo,
      pageStructure,
      handlers,
    );

    const generalButtons = document.querySelectorAll('#general-buttons-wrapper button');
    generalButtons.forEach((button) => {
      button.classList.remove('button-disabled');
      button.removeAttribute('disabled');
    });
  }
};

export default pagingHandler;
