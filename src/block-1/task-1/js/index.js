/* global getWinner */
window.addEventListener('load', function loadWindow() {
  var buttonStartNewGame = document.querySelector('.startNewGame');
  var field = document.querySelector('.field');
  var winnMessage = document.querySelector('.winner-message');
  var cells = document.querySelectorAll('.cell');
  var i;
  var turn = 'x';
  var stopGame = false;

  function resetGame() {
    winnMessage.textContent = '';
    for (i = 0; i < cells.length; i++) {
      cells[i].classList.remove('o');
      cells[i].classList.remove('x');
    }
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
      winnMessage.textContent = 'Крестик победил!';
      stopGame = true;
    } else if (winner === 'o') {
      winnMessage.textContent = 'Нолик победил!';
      stopGame = true;
    }
  }

  buttonStartNewGame.addEventListener('click', function startNewGame() {
    resetGame();
  });

  field.addEventListener('click', function clickField(event) {
    var target = event.target;
    if (stopGame) return;
    if (target.classList.contains('x') || target.classList.contains('o')) {
      return;
    }
    if (target.classList.contains('cell')) {
      target.classList.add(changesTurn());
      getWinnerPlayer();
    }
  });
});
