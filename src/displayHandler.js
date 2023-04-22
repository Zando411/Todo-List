import getInputValues from './taskLogic';

function addEventListeners() {
  const button = document.getElementById('add-task');
  button.addEventListener('click', () => {
    const { name, description, date, priority } = getInputValues();
    console.log(name, description, date, priority);
  });
}

export default addEventListeners;
