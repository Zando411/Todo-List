import { closeListForm, openListForm } from './forms';
import { listEventListener } from './listLogic';
import { getInputValues, renderTasks, checkCheckbox } from './taskLogic';

function addEventListeners() {
  const button = document.getElementById('add-task');
  button.addEventListener('click', () => {
    const { name, description, date, priority } = getInputValues();
    renderTasks(selectedList, name, description, date, priority);
  });

  const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
  checkboxInputs.forEach((checkbox) => {
    checkbox.addEventListener('change', checkCheckbox);
  });

  const list = document.getElementById('new-list');
  list.addEventListener('click', openListForm);

  const closeForm = document.getElementById('close-form');
  closeForm.addEventListener('click', closeListForm);

  listEventListener();
}

export { addEventListeners };
