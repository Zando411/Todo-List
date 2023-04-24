import updateEventListeners from './displayHandler';
import { selectedList } from './listLogic';

const taskTemplate = document.getElementById('task-template');

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

const newTask = (name, description, date, priority) => {
  return {
    name,
    description,
    date,
    priority,
    complete: false,
  };
};

function checkCheckbox(event) {
  const taskItem = this.closest('.task-item');
  if (this.checked) {
    taskItem.classList.add('completed');
  } else {
    taskItem.classList.remove('completed');
  }
}

function renderTasks(selectedList, name, description, date, priority) {
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('input');
    const nameTag = taskElement.querySelector('p.name');
    const descriptionTag = taskElement.querySelector('p.description');
    const dateTag = taskElement.querySelector('p.date');
    const priorityTag = taskElement.querySelector('p.priority');
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    nameTag.innerHTML = name;
    descriptionTag.innerHTML = description;
    dateTag.innerHTML = date;
    priorityTag.innerHTML = priority;
    taskContainer.appendChild(taskElement);
  });
}

export { getInputValues, checkCheckbox, newTask, renderTasks };
