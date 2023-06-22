function Book(title, author, pages, score, readPages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.score = score;
  this.readPages = readPages;

  let progress = readPages + "/" + pages;
  this.info = [title, author, pages, score, progress];
  this.status =
    readPages == pages ? "completed" : readPages == 0 ? "pending" : "ongoing";
}
let book1 = new Book(
  "Automate the boring stuff with Python",
  "Ai Sweigart",
  504,
  6,
  504
);
let book2 = new Book(
  "Refactoring UI",
  "Adam Wathan & Steve Schoger",
  218,
  7,
  62
);
let book3 = new Book("Code", "Charles Petzold", 400, "N/A", 0);
let myLibrary = [book1, book2, book3];
let openBook = {};
const library = document.querySelector(".library");
const newBookBtn = document.querySelector("#new");
const newBookModal = document.querySelector("#new-book-modal");
const editBookModal = document.querySelector("#edit-book-modal");
const newInputs = Array.from(document.forms[0]).slice(0, -1); //to get rid of submit;
const editInputs = Array.from(document.forms[1]).slice(0, -1);
const newSubmitBtn = document.querySelector("#new-submit");
const editSubmitBtn = document.querySelector("#edit-submit");
const closeBtns = document.querySelectorAll(".close");
const deleteBtn = document.querySelector("#delete");

function orderLibrary(myLibrary) {
  myLibrary.sort((a, b) => {
    if (
      a.status == "completed" &&
      (b.status == "pending" || b.status == "ongoing")
    )
      return -1;
    if (a.status == "ongoing" && b.status == "pending") return -1;
    if (
      b.status == "completed" &&
      (a.status == "pending" || a.status == "ongoing")
    )
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
  div.classList.add("B" + (order.innerText - 1));
  editBtn.addEventListener("click", () => {
    openBook = myLibrary.indexOf(
      myLibrary[editBtn.parentNode.parentNode.classList[2].split("")[1]]
    );
    editBookModal.close();
    editBookModal.showModal();
    editInputs.forEach((input) => {
      let editBookBtns = Array.from(document.querySelectorAll(".edit-btn"));
      if (input.options) return;
      input.value =
        myLibrary[editBookBtns.indexOf(editBtn)][input.classList[0]];
    });
  });
}

orderLibrary(myLibrary);
myLibrary.forEach(displayBook);

newBookBtn.addEventListener("click", () => {
  newBookModal.showModal();
  newInputs.forEach((input) => (input.value = "")); //clearing input fields
});

newSubmitBtn.addEventListener("click", () => {
  let inputChecker = 0;
  newInputs.forEach((input) => {
    if (input.value != "") inputChecker++;
  });
  if (inputChecker != newInputs.length) return;
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
  editBookBtns = Array.from(document.querySelectorAll("edit-book"));
});

closeBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    editBookModal.close();
    newBookModal.close();
  })
);

editSubmitBtn.addEventListener("click", () => {
  let inputChecker = 0;
  editInputs.forEach((input) => {
    if (input.value != "") inputChecker++;
  });
  if (inputChecker != newInputs.length) return;
  delete myLibrary[openBook];
  let pagesRead =
    document.querySelector("#edit-pages-read").value >
    document.querySelector("#edit-pages").value
      ? document.querySelector("#edit-pages").value
      : document.querySelector("#edit-pages-read").value; // if pagesRead is bigger than the actual number of pages of the book
  let newBook = new Book(
    document.querySelector("#edit-book-title").value,
    document.querySelector("#edit-author").value,
    document.querySelector("#edit-pages").value,
    document.querySelector("#edit-score").value,
    pagesRead
  );
  myLibrary.push(newBook);
  orderLibrary(myLibrary);
  Array.from(document.getElementsByClassName("book")).forEach((elem) =>
    elem.remove()
  );
  myLibrary.forEach(displayBook);
  editBookBtns = Array.from(document.querySelectorAll("edit-book"));
});

deleteBtn.addEventListener("click", () => {
  Array.from(document.getElementsByClassName("book")).forEach((elem) =>
    elem.remove()
  );
  delete myLibrary[openBook];
  myLibrary.forEach(displayBook);

  editBookModal.close();
});
