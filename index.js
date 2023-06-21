function Book(name, author, pages, readStatus) {
  this.name = name;
  this.author = author;
  this.pagers = pages;
  this.readStatus = readStatus;
  this.info = [name, author, pages, readStatus];
}
let book1 = new Book("YDJS", "ME", "122 pages", "Not read yet");
let book2 = new Book("YDJS", "ME", "122 pages", "Not read yet");
let book3 = new Book("YDJS", "ME", "122 pages", "Not read yet");
let library = document.querySelector(".library");
let myLibrary = [book1, book2, book3];

function addBookToLibrary() {}

function displayBooks(book) {
  const div = document.createElement("div");
  div.innerText = book1.info;
  div.classList.add("book");
  library.appendChild(div);
}

myLibrary.forEach(displayBooks);
