import { closeListForm, openListForm } from './forms';
import { getInputValues, createTask, checkCheckbox } from './taskLogic';

function addEventListeners() {
  const button = document.getElementById('add-task');
  button.addEventListener('click', () => {
    const { name, description, date, priority } = getInputValues();
    createTask(name, description, date, priority);
  });

  const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
  checkboxInputs.forEach((checkbox) => {
    checkbox.addEventListener('change', checkCheckbox);
  });

  const list = document.getElementById('new-list');
  list.addEventListener('click', openListForm);

  const closeForm = document.getElementById('close-form');
  closeForm.addEventListener('click', closeListForm);
}

export { addEventListeners };
