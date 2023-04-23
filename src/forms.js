import { createList, renderLists, lists } from './listLogic';

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

  const list = createList(name);
  input.value = '';
  lists.push(list);
  form.style.display = 'none';
  renderLists();
}

export { openListForm, closeListForm };
