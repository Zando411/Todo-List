import { createList, renderLists, lists, saveAndRender } from './listLogic';

function openListForm() {
  let form = document.getElementById('list-form');
  form.style.display = 'flex';
}

function closeListForm() {
  let form = document.getElementById('list-form');
  let input = document.getElementById('list-name');

  if (input.value === '') {
    return;
  }

  let newListName = input.value;

  const list = createList(newListName);
  input.value = '';
  lists.push(list);
  form.style.display = 'none';
  saveAndRender();
}

export { openListForm, closeListForm };
