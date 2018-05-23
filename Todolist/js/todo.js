const ToDoList = ( function() {
const inputField = document.getElementById('description');
const btnSubmit = document.getElementById('submit');
const ulList = document.querySelector('.todos-list');
const counter = document.querySelector('.counter');
const form = document.querySelector('.todo-form');
const todos = JSON.parse(localStorage.getItem('todos')) || [];
const szukejTaska = document.getElementById('todo-filter').value;
inputField.focus();
counter.textContent = `${todos.length} items left`;

const filterTodos = (todos, stringToMatch) => {
  return todos.filter((item) => item.todo.includes(stringToMatch));
}

const setCount = () => {
  counter.textContent = `${todos.length} items left`;
  localStorage.setItem('todos', JSON.stringify(todos));
} 

const setTime= () => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const time = new Date();
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  
   return `${date} ${monthNames[time.getMonth()]} ${hours}:${minutes}:${seconds}`;
}
const removeTodo = (evt) => {
  if(!evt.target.matches('.btn-delete')) return;
  const index = evt.target.dataset.index;
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  setCount()
  updateList(todos, ulList);
}

const isTodoDone = (evt) => {
  if(!evt.target.matches('input')) return;
  const index = evt.target.dataset.index;
  todos[index].done = !todos[index].done;
  localStorage.setItem('todos', JSON.stringify(todos));
  updateList(todos, ulList);
}

function updateList(todos, ulList) {
  ulList.innerHTML = todos.map((item, index) => {
    return ulList.innerHTML = `<li class="list-item">
    <div class="buttons">
    <button class="btn-delete" data-index="${index}"></button>
    <input type="checkbox" class="checkbox" id="item${index}" data-index="${index}" ${item.done ? "checked" : ""}>
    <label class="todo-item ${item.done ? "todo-done" : ""}" for="item${index}"></label><span class="todo-text">${item.todo}</span>
    </div>
    <div class="added-time">
    <span class="date">${item.date}</span>
    </div>
    </li>`;
  }).reverse().join('');
}
function addTask(evt) {
  if(!inputField.value) return false;
  const todo = inputField.value;
  const item = {
    todo,
    isDone: false,  
    date: setTime(),
    count: counter.textContent,
  }
   todos.push(item);
   updateList(todos, ulList);
   setCount();
   localStorage.setItem('todos', JSON.stringify(todos));
  this.reset();
 evt.preventDefault();
}

form.addEventListener('submit', addTask);
ulList.addEventListener('click', isTodoDone);
ulList.addEventListener('click', removeTodo);
// szukejTaska.addEventListener('change', filterTodos);
updateList(todos, ulList);  
})();