import { clearInputs, getInputValues } from './taskLogic';

const listsContainer = document.querySelector('[data-lists]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('task-template');

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

function listEventListener() {
  listsContainer.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'h3') {
      selectedListId = e.target.parentNode.parentNode.dataset.listId;
      saveAndRender();
    }
  });
  listsContainer.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-delete-list-btn')) {
      const deleteButton = e.target.querySelector('i');
      const idParent = e.target.parentNode.parentNode.dataset.listId;
      lists = lists.filter((list) => list.id !== idParent);
      if (idParent === selectedListId) {
        selectedListId = null;
      }
      saveAndRender();
    }
  });
}

function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [],
  };
}

function createTask(name, description, date, priority) {
  return {
    id: Date.now().toString(),
    name: name,
    description: description,
    date: date,
    priority: priority,
    complete: false,
  };
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function saveAndRender() {
  save();
  render();
}

function render() {
  clearElement(listsContainer);
  renderLists();

  const selectedList = lists.find((list) => list.id === selectedListId);
  if (selectedListId == null) {
    tasksContainer.style.display = 'none';
  } else {
    tasksContainer.style.display = '';
  }
  clearElement(tasksContainer);
  renderTasks(selectedList);
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('input');
    const name = taskElement.querySelector('p.name');
    const description = taskElement.querySelector('p.description');
    const date = taskElement.querySelector('p.date');
    const priority = taskElement.querySelector('p.priority');
    const taskItem = taskElement.querySelector('.task-item');
    const deleteButton = taskElement.querySelector('.delete-task-btn');

    deleteButton.id = 'btn' + task.id;
    taskItem.id = task.id;
    checkbox.id = 'chk' + task.id;
    checkbox.checked = task.complete;
    name.innerHTML = task.name;
    description.innerHTML = task.description;
    date.innerHTML = task.date;
    priority.innerHTML = task.priority;
    tasksContainer.appendChild(taskElement);

    checkbox.addEventListener('change', () => {
      task.complete = checkbox.checked;
      if (task.complete) {
        taskItem.classList.add('completed');
      } else {
        taskItem.classList.remove('completed');
      }
      save();
    });

    if (task.complete) {
      taskItem.classList.add('completed');
    }
    // Add event listener to the delete button
    deleteButton.addEventListener('click', () => {
      const selectedListIndex = lists.findIndex(
        (list) => list.id === selectedListId
      );
      selectedList.tasks = selectedList.tasks.filter((t) => t.id !== task.id);
      lists[selectedListIndex] = selectedList;
      saveAndRender();
    });
  });
}

function renderLists() {
  console.log(lists);
  lists.forEach((list) => {
    const listElement = document.createElement('div');
    listElement.classList.add('lists');
    listElement.dataset.listId = list.id;
    let listElementHTML = `
        <div class="list-item">
          <h3 class="list-text hover">${list.name}</h3>
          <i class="fa-solid fa-minus hover fa-lg" style="color: #f8f7f9" data-delete-list-btn></i>
        </div>
        `;

    listElement.innerHTML = listElementHTML;
    const listName = listElement.querySelector('.list-text');
    if (list.id === selectedListId) {
      listName.classList.add('current');
    }

    listsContainer.appendChild(listElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function taskEventListener() {
  const button = document.getElementById('add-task');
  button.addEventListener('click', () => {
    const inputValues = getInputValues();
    const task = createTask(
      inputValues.name,
      inputValues.description,
      inputValues.date,
      inputValues.priority
    );
    const selectedList = lists.find((list) => list.id === selectedListId);
    selectedList.tasks.push(task);
    clearInputs();
    saveAndRender();
  });
}

function addCheckboxEventListener() {
  tasksContainer.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'input') {
      const selectedList = lists.find((list) => list.id === selectedListId);
      const selectedTask = selectedList.tasks.find(
        (task) => 'chk' + task.id === e.target.id
      );
      selectedTask.complete = e.target.checked;
      save();
    }
  });
}

export {
  renderLists,
  createList,
  createTask,
  lists,
  taskEventListener,
  saveAndRender,
  listEventListener,
  render,
  addCheckboxEventListener,
};
