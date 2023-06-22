function Book(title, author, pages, score, readPages) {
  this.name = title;
  this.author = author;
  this.pages = pages;
  let progress = readPages + "/" + pages;
  this.info = [title, author, pages, score, progress];
}
let book1 = new Book("ABCD", "ME", "122", 8, "50");
let book2 = new Book("EFG", "SE", "123", 10, "60");
let book3 = new Book("HIJK", "VE", "124", 9, "70");
let library = document.querySelector(".library");
let myLibrary = [book1, book2, book3];
let newBookBtn = document.querySelector("#new");
const modal = document.querySelector(".modal");
let submitBtn = document.querySelector("#submit");

function addBookToLibrary() {}

function displayBooks(book) {
  const order = document.createElement("p");
  const div = document.createElement("div");
  order.innerText = Number(myLibrary.indexOf(book, 0)) + 1;
  div.appendChild(order);

  div.classList.add("book");
  book.info.forEach((elem) => {
    const p = document.createElement("p");
    p.innerText = elem;
    div.appendChild(p);
  });
  library.appendChild(div);
}

myLibrary.forEach(displayBooks);

newBookBtn.addEventListener("click", () => {
  modal.showModal();
});

submitBtn.addEventListener("click", () => {
  myLibrary.push(
    new Book(
      document.querySelector("#book-title").value,
      document.querySelector("#author").value,
      document.querySelector("#pages").value,
      document.querySelector("#score").value,
      document.querySelector("#pages-read").value
    )
  );
  displayBooks(myLibrary[myLibrary.length - 1]);
});
