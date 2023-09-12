function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = Number(pages);
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

const lotr = new Book('The Lord of The Rings', 'J.J.R Tolkien', '431', 'no');
const wh40k = new Book('The Horus Heresy', 'Dan Abnett', '6520', 'yes');

const myLibrary = [lotr, wh40k];

function showModalNewBook() {
  const addNewBookBtn = document.querySelector('.add-book-btn');
  const modalWindow = document.querySelector('.modal-window');
  const closeBtn = document.querySelector('.close');

  addNewBookBtn.addEventListener('click', () => {
    modalWindow.classList.remove('hidden');

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
  });

  function closeModal() {
    return modalWindow.classList.add('hidden');
  }
}
showModalNewBook();

function getDataFromForm() {
  const form = document.querySelector('.modal-form');
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#read');

  form.addEventListener('submit', e => {
    const convertDataToInstantiateObject = new Book(
      title.value,
      author.value,
      pages.value,
      `${read.checked ? 'yes' : 'no'}`
    );
    myLibrary.push(convertDataToInstantiateObject);
    console.log(myLibrary);
    e.preventDefault();
  });
}
getDataFromForm();

function showBookInTable() {
  for (const i in myLibrary) {
    const table = document.querySelector('table');
    const tr = document.createElement('tr');
    table.appendChild(tr);
    const objValue = Object.values(myLibrary[i]);
    for (const value in objValue) {
      const td = document.createElement('td');
      td.textContent = objValue[value];
      tr.appendChild(td);
    }
  }
}
showBookInTable();
