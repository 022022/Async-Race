import { Car, UpdateHandler } from '../types/types';
import { CAR } from '../constants/constants';

const showPopup = (car: Car, updateHandler: UpdateHandler) => {
  const overlayElem = document.querySelector('#overlay');

  if (overlayElem) {
    const popup = document.createElement('div');
    popup.setAttribute('id', 'pop-up');
    popup.setAttribute('class', 'pop-up');
    popup.innerHTML = `
      <h4>Editing Car</h4>
      ${car.name}
      <div id="8">
        <svg fill="${car.color}" class="car-image" viewBox="0 0 322 99" xmlns="http://www.w3.org/2000/svg"> ${CAR}
        </svg>
      </div>
    `;

    const controls = document.createElement('div');
    controls.classList.add('controls-popup');

    const createField = document.createElement('input');
    createField.setAttribute('class', 'create');
    createField.value = car.name;

    const colorField = document.createElement('input');
    colorField.setAttribute('type', 'color');
    colorField.setAttribute('value', car.color);

    const saveButton = document.createElement('button');
    saveButton.classList.add('button', 'primary-button');
    saveButton.innerText = 'Save';
    saveButton.addEventListener('click', () => {
      updateHandler(car.id, createField.value, colorField.value);
      overlayElem.setAttribute('style', 'display: none');
      overlayElem.innerHTML = '';
    });

    const closeButton = document.createElement('button');
    closeButton.setAttribute('class', 'button');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', () => {
      overlayElem.setAttribute('style', 'display: none');
      overlayElem.innerHTML = '';
    });

    const buttons = document.createElement('div');
    buttons.classList.add('controls');
    buttons.append(closeButton, saveButton);

    controls.append(createField, colorField);
    popup.append(controls, buttons);

    overlayElem.append(popup);
    overlayElem.setAttribute('style', 'display: flex');
  }
};

export default showPopup;
