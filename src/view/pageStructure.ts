const renderPageStructure = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const generalControls = document.createElement('div');
  generalControls.classList.add('general-buttons-wrapper');
  generalControls.setAttribute('id', 'general-buttons-wrapper');

  const carsInGarage = document.createElement('div');
  carsInGarage.classList.add('cars-list');
  carsInGarage.setAttribute('id', 'cars-in-garage');

  const winners = document.createElement('div');
  winners.setAttribute('id', 'winners-table');
  winners.classList.add('winners-table');

  const popup = document.createElement('div');
  popup.setAttribute('id', 'overlay');
  popup.setAttribute('class', 'overlay');

  const navigation = document.createElement('div');
  navigation.classList.add('tabs');

  const pageStructure = {
    wrapper,
    generalControls,
    carsInGarage,
    winners,
    popup,
    navigation,
  };

  return pageStructure;
};

export default renderPageStructure;
