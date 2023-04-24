import { closeListForm, openListForm } from './forms';
import {
  addCheckboxEventListener,
  listEventListener,
  taskEventListener,
} from './listLogic';

function addEventListeners() {
  const list = document.getElementById('new-list');
  list.addEventListener('click', openListForm);

  const closeForm = document.getElementById('close-form');
  closeForm.addEventListener('click', closeListForm);

  listEventListener();
  taskEventListener();
  addCheckboxEventListener();
}

export { addEventListeners };
