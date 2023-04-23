import { getInputValues, createTask } from './taskLogic';

function addEventListeners() {
  const button = document.getElementById('add-task');
  button.addEventListener('click', () => {
    const { name, description, date, priority } = getInputValues();
    createTask(name, description, date, priority);
  });
}

export default addEventListeners;
