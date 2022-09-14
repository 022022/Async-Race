const resetRace = () => {
  const allCarIds = Array.from(document.querySelectorAll('.flag'))
    .map((item) => {
      const [action, id] = item.id.split('-');
      return id;
    });
  const allCars = allCarIds.map((carId) => document.getElementById(String(carId)));
  allCars.forEach((car) => car?.setAttribute('style', 'transform: translateX(0px)'));

  const allMessages = Array.from(document.querySelectorAll('.message'));
  allMessages.forEach((message) => {
    while (message.firstChild) {
      message.removeChild(message.firstChild);
    }
  });

  const allButtons = Array.from(document.querySelectorAll('.button'));
  allButtons.forEach((button) => {
    button.classList.remove('button-disabled');
    button.removeAttribute('disabled');
  });
};

export default resetRace;
