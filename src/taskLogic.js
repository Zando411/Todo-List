function getInputValues() {
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const defaultDate = document.getElementById('date').value;
  const priority = document.getElementById('priority').value;

  let day = defaultDate.slice(8, 10);
  let month = defaultDate.slice(5, 7);
  let year = defaultDate.slice(0, 4);

  if (month.startsWith('0')) {
    month = month.substring(1);
  }
  if (day.startsWith('0')) {
    day = day.substring(1);
  }

  let date = `${month}/${day}/${year}`;

  if (name === '' || description === '' || date === '' || priority === '') {
    document.getElementById('error-text').style.display = 'block';
    return;
  }

  return { name, description, date, priority };
}

// TODO add indexing
function createTask(name, description, date, priority) {
  const currentTasks = document.getElementById('current-tasks');
  const newTask = document.createElement('div');
  newTask.setAttribute('class', 'task-item');

  let newTaskHTML = `
  <div class="checkbox">
  <input type="checkbox" name="task" id="Task-1" />
  <div>${name}</div>
  </div>
  <div>${description}</div>
  <div>${date}</div>
  <div>${priority}</div>`;

  newTask.innerHTML = newTaskHTML;
  currentTasks.appendChild(newTask);
}

export { getInputValues, createTask };
