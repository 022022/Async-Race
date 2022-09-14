import { switchToDrive } from '../model/engine';
import { getCar } from '../model/garage';
import { STATUS, baseUrl, ENGINE } from '../constants/constants';
import Animate from './animate';
import addToWinnersTable from './winners';
import { Handlers, PageStructure } from '../types/types';

const basePath = `${baseUrl}/engine/`;

const startRace = (pageStructure: PageStructure, handlers: Handlers) => {
  const allButtons = Array.from(document.querySelectorAll('.button'));
  allButtons.forEach((button) => {
    button.classList.add('button-disabled');
    button.setAttribute('disabled', 'true');
  });

  const allCarIds = Array.from(document.querySelectorAll('.flag'))
    .map((item) => {
      const [action, id] = item.id.split('-');
      return id;
    });

  const promises = allCarIds
    .map((id) => fetch(`${basePath}?id=${id}&status=${ENGINE.started}`, { method: 'PATCH' }));

  let counter = 0;
  let haveWinner = false;

  Promise.all(promises)
    .then((results) => results.forEach(

      async (response, index) => {
        const data = await response.json();

        const { velocity, distance } = data;
        const time = Number(distance) / Number(velocity);

        const carId = Number(allCarIds[index]);
        const animate = Animate(carId, time);
        animate.start();

        const message = document.getElementById(`message-${carId}`);

        const result = await switchToDrive(carId);

        if (result && message) {
          counter += 1;

          switch (result.status) {
            case STATUS.error:
              message.innerText = 'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"';
              animate.stop();
              break;
            case STATUS.notFound:
              message.innerText = 'Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?';
              animate.stop();
              break;
            case STATUS.tooManyRequests:
              message.innerText = 'Drive already in progress. You can\'t run drive for the same car twice while it\'s not stopped.';
              animate.stop();
              break;
            case STATUS.internalServerError:
              message.innerText = 'Car has been stopped suddenly. It\'s engine was broken down.';
              animate.stop();
              break;
            default:
              if (!haveWinner) {
                haveWinner = true;
                const winner = await getCar(carId);
                if (winner) {
                  message.innerHTML = `<span style="color: green; font-weight: bold;">***** ${winner.name} is the Winner of this race! Congratulations! *****</span>`;
                  addToWinnersTable(carId, Math.round(time), pageStructure, handlers);
                }
              }
              break;
          }
        }

        if (counter === allCarIds.length) {
          const resetButton = document.getElementById('reset-race');
          resetButton?.classList.remove('button-disabled');
          resetButton?.removeAttribute('disabled');
        }
      },
    ));
};

export default startRace;
