
const btnCreate = document.getElementById('btn-main');
const btnToggle = document.querySelector('.btn-toggle');
const btnRemove = document.querySelector('.btn-remove');

btnCreate.addEventListener('click', () =>{
  const input = document.querySelector('.input-main');
  const list = document.querySelector('ul');

  list.insertAdjacentHTML(
    'afterbegin',
    `<li>${input.value}</li>`
  );
  input.value = '';
});

btnToggle.addEventListener('click', () =>{
  const listContainer = document.querySelector('.list-container');

  if (listContainer.style.display === 'none'){
    btnToggle.textContent = 'Esconder Lista';
    listContainer.style.display = 'block';
  }
  else {
    btnToggle.textContent = 'Exibir Lista';
    listContainer.style.display = 'none';
  }
});

btnRemove.addEventListener('click', () =>{
  const lastItem = document.querySelector('li:last-child');
  lastItem.remove();
});