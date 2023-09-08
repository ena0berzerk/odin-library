function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = Number(pages);
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

const lotr = new Book('The Lord of The Rings', 'J.J.R Tolkien', '431', 'not read yet');
const wh40k = new Book('Horus Heresy', 'A lot', '5000', 'read');

const myLibrary = [lotr, wh40k];

function modalNewBookBtn() {
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
modalNewBookBtn();
