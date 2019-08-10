var state = { tasks: [] };

window.addEventListener('load', function onLoadWindow() {
  var list = document.querySelector('.task-list');
  var button = document.querySelector('.task-button');
  var input = document.querySelector('.task-input');
  var checkNumber = /^\d+$/;
  var i;

  function compareNumbers(a, b) {
    return a - b;
  }

  function sortTasks() {
    var fragment = document.createDocumentFragment();
    var tasksSorted = state.tasks.sort(compareNumbers);
    var li;

    list.innerHTML = '';

    for (i = 0; i < tasksSorted.length; i++) {
      li = document.createElement('li');
      li.textContent = tasksSorted[i];
      fragment.appendChild(li);
    }
    list.appendChild(fragment);
  }

  function getTasks() {

    var ls = localStorage.getItem('tasks');
    if (ls) {
      state.tasks = JSON.parse(ls);
      sortTasks();
    }
  }
  getTasks();

  function addTasks(value) {
    state.tasks.push(value);
    sortTasks();
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }

  function getInputValue() {
    var value = input.value;
    if (checkNumber.test(value)) {
      input.value = '';
      addTasks(value);
    }
  }

  button.addEventListener('click', function onAddTask(event) {
    event.preventDefault();
    getInputValue();
  });
});
