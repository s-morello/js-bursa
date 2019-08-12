/* global getWinner */
var storage = {};
var checkNumber = /^\d+$/;
var i;
var j;
var turn;
var stopGame = false;

window.addEventListener('load', function onLoadWindow() {
  var generateField = document.querySelector('.generateField');
  var count = document.querySelector('.count');
  var errorMessage = document.querySelector('.error-message');
  var field = document.querySelector('.field');
  var winnerMessage = document.querySelector('.winner-message');
  var startNewGame = document.querySelector('.startNewGame');

  function init() {
    errorMessage.textContent = '';
    field.innerHTML = '';
    storage = {};
    turn = 'o';
    stopGame = false;
  }

  function gameState(start) {
    if (start) {
      document.querySelector('.startGame').style.display = 'none';
      document.querySelector('.mainGame').style.display = 'block';
    } else {
      document.querySelector('.startGame').style.display = 'block';
      document.querySelector('.mainGame').style.display = 'none';
    }
  }

  function render() {
    var fragment = document.createDocumentFragment();
    var row;
    var cell;
    storage.cells = count.value;

    for (i = 0; i < count.value; i++) {
      row = document.createElement('div');
      row.classList.add('row');
      fragment.appendChild(row);

      for (j = 0; j < count.value; j++) {
        cell = document.createElement('div');
        cell.classList.add('cell');
        row.appendChild(cell);
      }
    }

    field.appendChild(fragment);
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
    render();
  }

  function changesTurn() {
    if (turn === 'x') {
      turn = 'o';
    } else {
      turn = 'x';
    }
    return turn;
  }

  function getWinnerPlayer() {
    var winner = getWinner();
    if (winner === 'x') {
      winnerMessage.textContent = 'Крестик победил!';
      stopGame = true;
    } else if (winner === 'o') {
      winnerMessage.textContent = 'Нолик победил!';
      stopGame = true;
    }
  }

  function playerMove(event) {
    var target = event.target;
    if (stopGame) return;

    if (target.classList.contains('cell')) {
      if (target.classList.contains('x') || target.classList.contains('o')) {
        return;
      }

      target.classList.add(turn);
      changesTurn();
      getWinnerPlayer();
    }
  }

  function startedNewGame() {
    gameState(false);
  }

  generateField.addEventListener('click', startGenerateNewGame);
  field.addEventListener('click', playerMove);
  startNewGame.addEventListener('click', startedNewGame);
});
