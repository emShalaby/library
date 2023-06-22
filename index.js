function Book(title, author, pages, score, readPages) {
  this.name = title;
  this.author = author;
  this.pages = pages;
  this.readPages = readPages;
  let progress = readPages + "/" + pages;
  this.info = [title, author, pages, score, progress];
  this.status =
    readPages == pages ? "completed" : readPages == 0 ? "pending" : "ongoing";
}
let book1 = new Book("ABCD", "ME", "122", 8, 122);
let book2 = new Book("EFG", "SE", "123", 10, 0);
let book3 = new Book("HIJK", "VE", "124", 9, 120);
let myLibrary = [book1, book2, book3];
let editBookBtns = document.querySelectorAll("edit-book");
const library = document.querySelector(".library");
const newBookBtn = document.querySelector("#new");
const newBookModal = document.querySelector("#new-book-modal");
const editBookModal = document.querySelector("#edit-book-modal");
const inputs = Array.from(document.forms[0]).slice(0, -1); //to get rid of submit;
const submitBtn = document.querySelector("#submit");
function orderLibrary(myLibrary) {
  myLibrary.sort((a, b) => {
    if (a.status == "completed" && b.status == ("pending" | "ongoing"))
      return -1;
    if (a.status == "ongoing" && b.status == "pending") return -1;
    if (b.status == "completed" && a.status == ("pending" | "ongoing"))
      return 1;
    if (b.status == "ongoing" && a.status == "pending") return 1;
    else return 0;
  });
} //order library based on book status
function displayBook(book) {
  const order = document.createElement("p");
  const div = document.createElement("div");
  const editBtn = document.createElement("img");
  const div2 = document.createElement("div");
  order.innerText = Number(myLibrary.indexOf(book, 0)) + 1;
  editBtn.src = "./threedots.svg";
  editBtn.alt = "edit-icon";
  editBtn.style.width = "1.5em";
  editBtn.classList.add("edit-btn");
  editBookBtns.push(editBtn);
  div2.appendChild(editBtn);
  div2.appendChild(order);
  div2.classList.add("first-box");
  div.appendChild(div2);
  div.classList.add("book");
  book.info.forEach((elem) => {
    const p = document.createElement("p");
    p.innerText = elem;
    if (elem == book.info[0]) {
      p.style.fontWeight = 600;
      p.style.fontSize = "1.1em";
    }
    div.appendChild(p);
  });
  library.appendChild(div);
  if (book.readPages == book.pages) div.classList.add("completed");
  else if (book.readPages == 0) div.classList.add("pending");
  else div.classList.add("ongoing");
}

orderLibrary(myLibrary);
myLibrary.forEach(displayBook);

newBookBtn.addEventListener("click", () => {
  newBookModal.showModal();
  inputs.forEach((input) => (input.value = "")); //clearing input fields
});

submitBtn.addEventListener("click", () => {
  let inputChecker = 0;
  inputs.forEach((input) => {
    if (input.value != "") inputChecker++;
  });
  if (inputChecker != inputs.length) return;
  let pagesRead =
    document.querySelector("#pages-read").value >
    document.querySelector("#pages").value
      ? document.querySelector("#pages").value
      : document.querySelector("#pages-read").value; // if pagesRead is bigger than the actual number of pages of the book
  let newBook = new Book(
    document.querySelector("#book-title").value,
    document.querySelector("#author").value,
    document.querySelector("#pages").value,
    document.querySelector("#score").value,
    pagesRead
  );
  myLibrary.push(newBook);
  orderLibrary(myLibrary);
  Array.from(document.getElementsByClassName("book")).forEach((elem) =>
    elem.remove()
  );
  myLibrary.forEach(displayBook);
});
