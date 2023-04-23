const listsContainer = document.querySelector('[data-lists]');

let lists = [
  {
    id: 1,
    name: 'list',
  },
  {
    id: 2,
    name: 'todo',
  },
];

function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [],
  };
}

function renderLists() {
  clearElement(listsContainer);
  lists.forEach((list) => {
    const listElement = document.createElement('div');
    listElement.classList.add('lists');
    listElement.dataset.listID = list.id;
    let listElementHTML = `
        <div class="list-item">
          <h3 class="list-text hover">${list.name}</h3>
          <i class="fa-solid fa-minus hover fa-lg" style="color: #f8f7f9"></i>
        </div>
        `;

    listElement.innerHTML = listElementHTML;
    listsContainer.appendChild(listElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export { renderLists, createList, lists };
