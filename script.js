const myLibrary = [];

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

function modalNewBookBtn() {
  const 
}