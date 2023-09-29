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
  return (this.read = this.read === 'read' ? (this.read = false) : (this.read = true));
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
    const tr = document.querySelector('tr');

    table.classList.remove('hidden');
    const convertDataToInstantiateObject = new Book(
      title.value,
      author.value,
      pages.value,
      // read.checked,
      `${read.checked ? 'read' : 'unread'}`,
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

  // adding unique data-attr for each book and DOM btn
  const lastTrElement = document.querySelector('.row-book:last-child');

  const readBtn = document.createElement('button');
  readBtn.classList.add('read-btn');
  readBtn.textContent = 'read';
  readBtn.setAttribute('style', 'padding: 12px; cursor: pointer');
  lastTrElement.appendChild(readBtn);

  readBtn.addEventListener('click', e => {
    newBook.toggleReadStatus();
    let textBtn = e.target.previousElementSibling.textContent;
    e.target.previousElementSibling.textContent = textBtn === 'read' ? 'unread' : 'read';
    // for (const bookEl of myLibrary) {
    //   if (bookEl.read === true) {
    //     e.target.previousElementSibling.textContent = 'read';
    //   } else if (bookEl.read === false) {
    //     e.target.previousElementSibling.textContent = 'unread';
    //   }
    // }
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
// https://discord.com/channels/505093832157691914/1047145823101779968
/* 
- Проходим циклом через массив myLibrary
- Делаем проверку, ЕСЛИ на одной из книг id === значению атрибута data-book 
- ТО удали 1 элемент сплайсом из массива myLibrary начиная с истинного (true) индекса
- Удали строку книги через кнопку на которую нажали e.target.parentNode
*/
// function removeFromLibrary(e) {
//   for (let i = 0; i < myLibrary.length; i++) {
//     if (myLibrary[i].id === e.target.parentNode.getAttribute('data-book')) {
//       myLibrary.splice(i, 1);
//       e.target.parentNode.remove();
//     }
//   }
// }

// this func works fine but only in one first cell. how can i make it work with each book row?
function readBtnStatus(e) {
  // const readCell = document.querySelector('.row-book:nth-child(n)');
  // const tdid = document.querySelector('td:last-of-type');
  // console.log(tdid);
  // for (let i = 0; i < myLibrary.length; i++) {
  //   if (
  //     myLibrary[i].id === e.target.parentNode.getAttribute('data-book') &&
  //     myLibrary[i].read === 'read'
  //   ) {
  //     myLibrary[i].read = 'unread';
  //     read.textContent = 'unread';
  //   } else if (
  //     myLibrary[i].id === e.target.parentNode.getAttribute('data-book') &&
  //     myLibrary[i].read === 'unread'
  //   ) {
  //     myLibrary[i].read = 'read';
  //     read.textContent = 'read';
  //   }
  // }
}
