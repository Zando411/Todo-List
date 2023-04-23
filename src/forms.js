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
  input.value = '';
  form.style.display = 'none';
  console.log(newListName);
  return newListName;
}

export { openListForm, closeListForm };
