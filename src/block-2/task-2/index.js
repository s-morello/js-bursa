window.addEventListener('load', function onLoadWindow() {
  var checkNumber = /^\d+$/;
  var fragement = document.createDocumentFragment();
  var body = document.querySelector('body');
  var root;
  var inp1;
  var err1;
  var inp2;
  var err2;
  var button;
  var res;
  var result;

  root = document.createElement('div');
  root.classList.add('root');

  inp1 = document.createElement('input');
  inp1.classList.add('inp1');
  root.appendChild(inp1);

  err1 = document.createElement('div');
  err1.classList.add('error-message');
  root.appendChild(err1);

  inp2 = document.createElement('input');
  inp2.classList.add('inp2');
  root.appendChild(inp2);

  err2 = document.createElement('div');
  err2.classList.add('error-message');
  root.appendChild(err2);

  button = document.createElement('button');
  button.classList.add('button');
  button.textContent = 'Посчитать';
  root.appendChild(button);

  res = document.createElement('div');
  res.id = 'result';
  root.appendChild(res);

  fragement.appendChild(root);
  body.appendChild(fragement);

  button.addEventListener('click', function clickButton() {
    var check = false;
    var res1;
    var res2;
    if (!checkNumber.test(inp1.value)) {
      err1.textContent = 'Введенное значение в поле не число!';
      res.textContent = '';
      check = true;
    }

    if (!checkNumber.test(inp2.value)) {
      err2.textContent = 'Введенное значение в поле не число!';
      res.textContent = '';
      check = true;
    }

    if (check) {
      return;
    }

    res1 = parseInt(inp1.value, 10);
    res2 = parseInt(inp2.value, 10);
    result = res1 + res2;

    res.textContent = result;
    err1.textContent = '';
    err2.textContent = '';
  });
});
