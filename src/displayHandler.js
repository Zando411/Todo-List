import { closeListForm, openListForm } from './forms';
import { listEventListener } from './listLogic';

function addEventListeners() {
  const button = document.getElementById('add-task');

  const list = document.getElementById('new-list');
  list.addEventListener('click', openListForm);

  const closeForm = document.getElementById('close-form');
  closeForm.addEventListener('click', closeListForm);

  listEventListener();
}

export { addEventListeners };
