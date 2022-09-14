import { Handlers, PageStructure, GetCars } from '../types/types';
import { renderCarsInGarage } from '../view/garage';

const updateCarsBlock = (
  cars: GetCars,
  page: number,
  pageStructure: PageStructure,
  handlers: Handlers,
) => {
  const carsListHtml = renderCarsInGarage(
    cars,
    page,
    pageStructure,
    handlers,
  );
  const carsInGarage = document.getElementById('cars-in-garage');
  if (carsInGarage) {
    carsInGarage.innerHTML = '';
    carsInGarage.append(carsListHtml);
  }
};

export default updateCarsBlock;
