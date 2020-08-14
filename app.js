// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
let allCountDiv = document.getElementById('all-task');
let allCount = 0;
let completedCountDiv = document.getElementById('completed-task');
let completedCount = 0;

// Event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(e) {
  // prevent form from submitting
  e.preventDefault();

  // Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  //Check Mark Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  // Trash Button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  //Append to list
  todoList.appendChild(todoDiv);

  allCount++;
  allCountDiv.innerHTML = allCount;
  //clear todo input value
  todoInput.value = '';
}

// Deleting the item and checkmarking the completed 
function deleteCheck(e) {
  const item = e.target;
  // Delete TODO
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    // Animation
    todo.classList.add('fall');
    // remove after animation ends
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
    if (allCount > 0) {
      allCount--;
    }
    if(completedCount > 0) {
      completedCount--;
    }
  }

  // Check Mark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
    if (todo.classList.contains('completed')) {
      completedCount++;
    } else {
      if (completedCount > 0) {
        completedCount--;
      }
    }
  }
  allCountDiv.innerHTML = allCount;
  completedCountDiv.innerHTML = completedCount;
}

// showing list according to selected option 
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}
