/* global getWinner */
var storage = {};
var checkNumber = /^\d+$/;
var i;
var j;

window.addEventListener('load', function onLoadWindow() {
  var generateField = document.querySelector('.generateField');
  var count = document.querySelector('.count');
  var errorMessage = document.querySelector('.error-message');
  var field = document.querySelector('.field');
  var winnerMessage = document.querySelector('.winner-message');
  var startNewGame = document.querySelector('.startNewGame');

  function gameState(start) {
    if (start) {
      document.querySelector('.startGame').style.display = 'none';
      document.querySelector('.mainGame').style.display = 'block';
    } else {
      document.querySelector('.startGame').style.display = 'block';
      document.querySelector('.mainGame').style.display = 'none';
    }
  }

  function render(count) {
    var fragment = document.createDocumentFragment();
    var row;
    var cell;

    for (i = 0; i < count; i++) {
      row = document.createElement('div');
      row.classList.add('row');
      fragment.appendChild(row);

      for (j = 0; j < count; j++) {
        cell = document.createElement('div');
        cell.classList.add('cell');
        row.appendChild(cell);
      }
    }

    field.appendChild(fragment);
  }

  function loadSaveGame() {
    var save = JSON.parse(localStorage.getItem('game'));
    if (save) {
      storage = save;
      gameState(true);
      render(storage.cells);
    }
  }

  function init() {
    errorMessage.textContent = '';
    field.innerHTML = '';
    storage = {};
    storage.turn = 'o';
    storage.stopGame = false;
    localStorage.removeItem('game');
  }

  function saveGame() {
    localStorage.setItem('game', JSON.stringify(storage));
  }

  function startGenerateNewGame() {
    if (!checkNumber.test(count.value)) {
      errorMessage.textContent = 'Вы ввели не коректное число!';
      return;
    }

    if (count.value > 15 || count.value < 5) {
      errorMessage.textContent = 'Число дожно быть от 5 до 15!';
      return;
    }

    init();
    gameState(true);
    render(count.value);
    storage.cells = count.value;
    saveGame();
  }

  function getWinnerPlayer() {
    var winner = getWinner();
    if (winner === 'x') {
      winnerMessage.textContent = 'Крестик победил!';
      storage.stopGame = true;
    } else if (winner === 'o') {
      winnerMessage.textContent = 'Нолик победил!';
      storage.stopGame = true;
    }
  }

  function playerMove(event) {
    var target = event.target;
    if (storage.stopGame) return;

    if (target.classList.contains('cell')) {
      if (target.classList.contains('x') || target.classList.contains('o')) {
        return;
      }
      target.classList.add(storage.turn);
      storage.turn = (storage.turn === 'o') ? 'x' : 'o';
      getWinnerPlayer();
      saveGame();
    }
  }

  function startedNewGame() {
    init();
    gameState(false);
  }

  generateField.addEventListener('click', startGenerateNewGame);
  field.addEventListener('click', playerMove);
  startNewGame.addEventListener('click', startedNewGame);

  loadSaveGame();
});
