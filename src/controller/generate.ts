import {
  NAMES, SERIES, CARS_PER_PAGE, HOW_MANY_TO_GENERATE,
} from '../constants/constants';
import {
  GetCars, NewCar, Handlers, PageStructure,
} from '../types/types';
import { getCars, createCar } from '../model/garage';
import updateCarsBlock from './updateCarsBlock';

const randomColor = () => {
  const symbols = '0123456789ABCDEF';
  const color = [...Array(6).keys()];
  return `#${color.map(() => symbols[Math.floor(Math.random() * 16)]).join('')}`;
};

const generateCarsHandler = async (
  page: number,
  pageStructure: PageStructure,
  handlers: Handlers,
) => {
  const newCarsNames = NAMES.map((name) => SERIES.map((item) => `${name} ${item}`)).flat();

  const newCarsNamesShuffled = Array.from({ length: HOW_MANY_TO_GENERATE });

  newCarsNamesShuffled.forEach(async () => {
    const randomCarName = newCarsNames
      .splice(Math.floor(Math.random() * HOW_MANY_TO_GENERATE), 1)[0];

    const obj: NewCar = { name: randomCarName, color: randomColor() };
    await createCar(obj);
  });

  const cars: GetCars | null = await getCars(CARS_PER_PAGE, page);

  if (cars) {
    updateCarsBlock(
      cars,
      page,
      pageStructure,
      handlers,
    );
  }
};

export default generateCarsHandler;
