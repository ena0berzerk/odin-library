function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = Number(pages);
  this.read = read;
  this.id = id;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

Book.prototype.toggleReadStatus = function () {
  return this.read ? (this.read = false) : (this.read = true);
};

let myLibrary = [];

const modalWindow = document.querySelector('.modal-window');
function openModal() {
  const addNewBookBtn = document.querySelector('.add-book-btn');
  addNewBookBtn.addEventListener('click', () => {
    modalWindow.classList.remove('hidden');
  });
  closeModal();
}
openModal();

function closeModal() {
  const closeBtn = document.querySelector('.close');
  modalWindow.classList.add('hidden');

  closeBtn.addEventListener('click', () => {
    closeModal();
  });

  window.addEventListener('click', e => {
    if (e.target === modalWindow) {
      closeModal();
    }
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function getDataFromForm() {
  const form = document.querySelector('.modal-form');
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#read');

  form.addEventListener('submit', e => {
    const table = document.querySelector('.table-block');

    table.classList.remove('hidden');
    const convertDataToInstantiateObject = new Book(
      title.value,
      author.value,
      pages.value,
      read.checked,
      // `${read.checked = read.checked ===  ? read : !!unread}`,
      (id = self.crypto.randomUUID())
    );
    myLibrary.push(convertDataToInstantiateObject);
    e.preventDefault();

    closeModal();
    form.reset();

    addNewBookToTable(convertDataToInstantiateObject);
  });
}
getDataFromForm();

function addNewBookToTable(newBook) {
  const table = document.querySelector('table');
  const tr = document.createElement('tr');
  tr.classList.add('row-book');
  table.appendChild(tr);

  const objValue = Object.values(newBook);
  console.log(objValue);

  for (let i = 0; i < objValue.length - 1; i++) {
    const td = document.createElement('td');
    td.textContent = objValue[i];
    tr.appendChild(td);
  }

  const lastTrElement = document.querySelector('.row-book:last-child');

  // previousElementSiblingOfReadBtnInitial.textContent =
  //   previousElementSiblingOfReadBtnInitial === 'true' ? 'Read' : 'Unread';

  const readBtn = document.createElement('button');
  readBtn.classList.add('read-btn');
  readBtn.textContent = 'read';
  readBtn.setAttribute('style', 'padding: 12px; cursor: pointer');
  lastTrElement.appendChild(readBtn);

  // change initial text to 'read/unread' when get data from form instead of 'true/false'
  readBtn.previousElementSibling.textContent =
    readBtn.previousElementSibling.textContent === 'true' ? 'read' : 'unread';

  readBtn.addEventListener('click', e => {
    let textBtn = e.target.previousElementSibling.textContent;
    e.target.previousElementSibling.textContent = textBtn === 'read' ? 'unread' : 'read';
    newBook.toggleReadStatus();
  });

  const delBtn = document.createElement('button');
  delBtn.classList.add('del-btn');
  delBtn.textContent = 'del';
  delBtn.setAttribute('style', 'padding: 12px; cursor: pointer');
  lastTrElement.appendChild(delBtn);

  delBtn.parentElement.dataset.book = id;
  delBtn.addEventListener('click', e => {
    // removeFromLibrary(e);
  });
}
/* 
- Проходим циклом через массив myLibrary
- Делаем проверку, ЕСЛИ на одной из книг id === значению атрибута data-book 
- ТО удали 1 элемент сплайсом из массива myLibrary начиная с истинного (true) индекса
- Удали строку книги через кнопку на которую нажали e.target.parentNode
*/
