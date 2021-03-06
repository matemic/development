const ToDoList = (function () {
  const inputField = document.getElementById('description');
  const ulList = document.querySelector('.todos-list');
  const counter = document.querySelector('.counter');
  const btnClearAll = document.querySelector('.btn-clear-all');
  const error = document.querySelector('.error');
  const form = document.querySelector('.todo-form');
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  let isCompleted = false;
  counter.textContent = `${todos.length} items left`;

  const updateTodosCount = (todos) => {
    counter.textContent = `${todos.length} items left`;
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const removeTodo = (element) => {
    const id = element.getAttribute('data-id');
    todos.splice(id, 1);
    updateTodosCount(todos);
    updateList(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const markAsDone = (element) => {
    const id = element.getAttribute('for');
    todos[id].done = !todos[id].done;
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function throwError(text) {
    inputField.classList.add('invalid');
    error.classList.add('active');
    error.textContent = text;
    setTimeout(() => {
      inputField.classList.remove('invalid');
      error.classList.remove('active');
    }, 2000);
  }

  function validateInput(evt) {
    evt.preventDefault();
    const inputValue = inputField.value;

    if (!inputValue.trim()) {
      throwError('You have to add something!');
      return;
    }
    addTask(inputValue);
    evt.preventDefault();
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
    updateTodosCount(todos);
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
    const btnDelete = createElements('btn-delete', 'button', '', {
      'data-id': index
    });
    const todoCheckbox = createElements('checkbox', 'input', '', {
      'id': index,
      'type': 'checkbox'
    });
    const todoLabel = createElements('todo-item', 'label', item.todo, {
      'for': index
    });
    const divAddedTime = createElements('added-time date', 'div', item.date);


    if (item.done) {
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

  const clearAllTodos = (e) => {
    if (!todos.length) {
      throwError('Nothing to clear!');
      return;
    }
    todos.length = 0;
    ulList.innerHTML = '';
    updateTodosCount(todos);
  }

  const getCompletedTasks = () => {
    return todos.filter(todo => todo.done);
  }

  const filterCompletedTasks = (evt) => {
    const completedTasks = getCompletedTasks();
    if (!todos.length) {
      throwError('List is empty!');
    }
    if(!isCompleted) {
      evt.target.textContent = 'All tasks';
      updateList(completedTasks);
      updateTodosCount(completedTasks);
      isCompleted = !isCompleted;
    }
    else {
      evt.target.textContent = 'Completed tasks';
      updateList(todos);
      updateTodosCount(todos);
      isCompleted = !isCompleted;
    }
  }

  form.addEventListener('submit', validateInput);
  btnClearAll.addEventListener('click', clearAllTodos);
  const btnFilterCompleted = document.querySelector('.btn-filter-completed');
  btnFilterCompleted.addEventListener('click', filterCompletedTasks);
  delegate('click', ulList, '.btn-delete', removeTodo);
  delegate('click', ulList, '.todo-item', markAsDone);

  updateList(todos);
})();