class Book {
   constructor(title, author, pages, read, id) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
      this.id = id;
   }

   info() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
   }

   toggleReadStatus() {
      return this.read ? (this.read = false) : (this.read = true);
   }
}

let myLibrary = [];

const modalWindow = document.querySelector('.modal-window');
function openModal() {
   const addNewBookBtn = document.querySelector('.add-book-btn');
   addNewBookBtn.addEventListener('click', () => {
      setTimeout(() => {
         modalWindow.classList.remove('hidden');
         modalWindow.classList.add('show-modal');
      }, 100);
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

   for (let i = 0; i < objValue.length - 1; i++) {
      const td = document.createElement('td');
      td.textContent = objValue[i];
      tr.appendChild(td);
   }

   const lastTrElement = document.querySelector('.row-book:last-child');

   const readBtn = document.createElement('button');
   readBtn.classList.add('read-btn');
   readBtn.textContent = 'Status';
   readBtn.setAttribute('style', 'margin: 12px 12px; padding: 4px;');
   lastTrElement.appendChild(readBtn);

   // change initial text to 'read/unread' when get data from form instead of 'true/false' text
   readBtn.previousElementSibling.textContent =
      readBtn.previousElementSibling.textContent === 'true' ? 'Read' : 'Unread';

   readBtn.addEventListener('click', e => {
      let textBtn = e.target.previousElementSibling.textContent;
      e.target.previousElementSibling.textContent = textBtn === 'Read' ? 'Unread' : 'Read';
      newBook.toggleReadStatus();
   });

   const delBtn = document.createElement('button');
   delBtn.classList.add('del-btn');
   delBtn.textContent = 'Remove';
   delBtn.setAttribute('style', 'padding: 4px;');
   lastTrElement.appendChild(delBtn);

   delBtn.parentElement.dataset.book = id;
   delBtn.addEventListener('click', e => {
      removeFromLibrary(e);
      if (myLibrary.length === 0) {
         const table = document.querySelector('.table-block');
         table.classList.add('hidden');
      }
   });
}

function removeFromLibrary(book) {
   for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id === book.target.parentNode.getAttribute('data-book')) {
         myLibrary.splice(i, 1);
         book.target.parentNode.remove();
      }
   }
}
