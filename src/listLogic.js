const listsContainer = document.querySelector('[data-lists]');
const tasksContainer = document.querySelector('[data-tasks]');

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
const selectedList = lists.find((list) => list.id === selectedListId);

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
  if (selectedListId == null) {
    tasksContainer.style.display = 'none';
  } else {
    tasksContainer.style.display = '';
  }
  clearElement(tasksContainer);
  renderTasks(selectedList);
}

function renderLists() {
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

export {
  renderLists,
  createList,
  lists,
  saveAndRender,
  listEventListener,
  render,
};
