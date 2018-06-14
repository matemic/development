const ToDoList = (function () {
  const inputField = document.getElementById('description');
  const btnSubmit = document.getElementById('submit');
  const ulList = document.querySelector('.todos-list');
  const counter = document.querySelector('.counter');
  const form = document.querySelector('.todo-form');
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  inputField.focus();
  counter.textContent = `${todos.length} items left`;

  const updateTodosCount = () => {
    counter.textContent = `${todos.length} items left`;
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const removeTodo = (element) => {
    const id = element.getAttribute('data-id');
    todos.splice(id, 1);
    updateTodosCount();
    updateList(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const markAsDone = (element) => {
    const id = element.getAttribute('for');
    todos[id].done = !todos[id].done;
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function validateInput(evt) {
    evt.preventDefault();
    const inputValue = inputField.value;

    if (!inputValue.trim()) {
      return;
    }
    addTask(inputValue);
    form.reset();
  }

  function updateList(todos) {
    ulList.innerHTML = '';
    todos.forEach((item, index) => {
      const listItem = createTodosList(item, index);
      ulList.appendChild(listItem);
    });
  }

  function addTask(todo) {
    const item = {
      todo,
      done: false,
      date: returnFormattedDate(),
      count: counter.textContent,
    }
    todos.push(item);
    updateList(todos);
    updateTodosCount();
    localStorage.setItem('todos', JSON.stringify(todos));

  }

  const returnFormattedDate = () => {
    const time = new Date();
    const monthName = time.toLocaleString('en-us', {
      month: 'long'
    });
    const day = time.getDate();
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');

    return `${day} ${monthName} ${hours}:${minutes}:${seconds}`;
  }

  const createTodosList = (item, index) => {
    const li = createElements('list-item');
    const divBtn = createElements('buttons', 'div');
    const btnDelete = createElements('btn-delete', 'button', '', {'data-id': index});
    const todoCheckbox = createElements('checkbox', 'input', '', {
      'id': index,
      'type': 'checkbox'
    });
    const todoLabel = createElements('todo-item', 'label', item.todo, {'for': index});
    const divAddedTime = createElements('added-time date', 'div', item.date);

   
    if(item.done) {
      todoCheckbox.setAttribute('checked', '');
    }
    li.appendChild(divBtn);
    divBtn.appendChild(btnDelete);
    divBtn.appendChild(todoCheckbox);
    divBtn.appendChild(todoLabel);

    todoCheckbox.type = "checkbox";
    li.appendChild(divAddedTime);
    return li;
  }

  const createElements = (elemClass = '', DOMElement = 'li', text = '', obj = {}) => {
    const element = document.createElement(DOMElement);
    element.classList.add(...elemClass.split(' '));
    element.textContent = text;

    for (let attr in obj) {
      element.setAttribute(attr, obj[attr]);
    }
    return element;
  }

  form.addEventListener('submit', validateInput);

  function delegate(type, parent, targetSelector, callback) {
    parent.addEventListener(type, event => {
      let target = event.target;
      while (target && target !== parent) {
        if (target.matches(targetSelector)) {
          return callback(target);
        }
        target = target.parentElement;
      }
      return null;
    });
  };


  delegate('click', ulList, '.btn-delete', removeTodo);
  delegate('click', ulList, '.todo-item', markAsDone);
  updateList(todos);
})();