function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = Number(pages);
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

const myLibrary = [];

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
    const tr = document.querySelector('tr');

    table.classList.remove('hidden');
    const convertDataToInstantiateObject = new Book(
      title.value,
      author.value,
      pages.value,
      `${read.checked ? 'read' : 'unread'}`
    );

    myLibrary.push(convertDataToInstantiateObject);
    console.log(
      `Log info: Book ${convertDataToInstantiateObject.title} successfully added in array`
    );
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

  for (let i = 0; i < objValue.length; i++) {
    const td = document.createElement('td');
    td.textContent = objValue[i];
    tr.appendChild(td);
  }

  // adding unique data-attr for each book and DOM btn
  const trBook = document.querySelectorAll('.row-book');
  const lastTrElement = document.querySelectorAll('.row-book:last-child');
  trBook.forEach((item, i) => {
    const numberBook = (item.dataset.book = i);
  });
  lastTrElement.forEach((item, i) => {
    const btn = document.createElement('button');
    btn.textContent = 'del';
    btn.setAttribute('style', 'padding: 12px; cursor: pointer');
    item.appendChild(btn);

    btn.addEventListener('click', e => {
      // https://www.geeksforgeeks.org/remove-elements-from-a-javascript-array/
      // book = books.filter((book) => book.id !== clickedbook.id
      console.log(item.dataset.book);
      const filtered = myLibrary.filter(item.dataset);
      console.log(filtered);
    });
  });
}
