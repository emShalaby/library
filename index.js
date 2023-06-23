const Library = function () {
  const Book = (title, author, pages, score, readPages) => {
    function _realReadPages() {
      if (readPages >= pages) return pages;
      return readPages;
    }
    readPages = _realReadPages();
    let progress = readPages + "/" + pages;
    let status =
      readPages == pages ? "completed" : readPages == 0 ? "pending" : "ongoing";
    let info = [title, author, pages, score, progress];
    return { title, author, pages, score, readPages, progress, status, info };
  };
  const newBookBtn = document.querySelector("#new");
  const newBookModal = document.querySelector("#new-book-modal");
  const editBookModal = document.querySelector("#edit-book-modal");
  const newSubmitBtn = document.querySelector("#new-submit");
  const editSubmitBtn = document.querySelector("#edit-submit");
  const closeBtns = document.querySelectorAll(".close");
  const deleteBtn = document.querySelector("#delete");

  let lib = [];
  let openBook = 0;

  (function _generateInitBooks() {
    let book1 = Book(
      "Automate the boring stuff with Python",
      "Ai Sweigart",
      504,
      6,
      504
    );
    let book2 = Book(
      "Refactoring UI",
      "Adam Wathan & Steve Schoger",
      218,
      7,
      62
    );
    let book3 = Book("Code", "Charles Petzold", 400, "N/A", 0);
    lib.push(book1);
    lib.push(book2);
    lib.push(book3);
  })();

  const _orderBooks = () =>
    lib.sort((a, b) => {
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

  const _addBook = function () {
    let inputChecker = 0;
    let newInputs = Array.from(document.forms[0]).slice(0, -1);
    newInputs.forEach((input) => {
      if (input.value != "") inputChecker++;
    });
    if (inputChecker != newInputs.length) return;
    let pagesRead =
      document.querySelector("#pages-read").value >
      document.querySelector("#pages").value
        ? document.querySelector("#pages").value
        : document.querySelector("#pages-read").value; // if pagesRead is bigger than the actual number of pages of the book
    let newBook = Book(
      document.querySelector("#book-title").value,
      document.querySelector("#author").value,
      document.querySelector("#pages").value,
      document.querySelector("#score").value,
      pagesRead
    );
    lib.push(newBook);
    _orderBooks();

    _displayBooks();
  };
  const editBook = function (book) {};

  _orderBooks();

  const _displayBooks = function () {
    Array.from(document.querySelectorAll(".book")).forEach((elem) =>
      elem.remove()
    );
    lib.forEach((book) => {
      const order = document.createElement("p");
      const editBtn = document.createElement("img");
      const leftCell = document.createElement("div");
      const row = document.createElement("div");

      leftCell.appendChild(editBtn);
      leftCell.appendChild(order);
      leftCell.classList.add("first-box");
      row.appendChild(leftCell);
      row.classList.add("book");

      order.innerText = Number(lib.indexOf(book)) + 1;
      editBtn.src = "./threedots.svg";
      editBtn.alt = "edit-icon";
      editBtn.style.width = "1.5em";
      editBtn.classList.add("edit-btn");

      if (book.status == "completed") row.classList.add("completed");
      else if (book.status == "pending") row.classList.add("pending");
      else row.classList.add("ongoing");

      book.info.forEach((elem) => {
        const p = document.createElement("p");
        p.innerText = elem;
        if (elem == book.info[0]) {
          p.style.fontWeight = 600;
          p.style.fontSize = "1.1em";
        }
        row.appendChild(p);
      });

      document.querySelector(".library").appendChild(row);
      editBtn.addEventListener("click", () => {
        openBook = lib.indexOf(book) == -1 ? 0 : lib.indexOf(book);
        editBookModal.close();
        editBookModal.showModal();

        const editInputs = Array.from(document.forms[1]).slice(0, -1); //to remove submit button;
        editInputs.forEach((input) => {
          if (input.options) return;
          input.value = book[input.className];
        });
      });
    });
  };
  newBookBtn.addEventListener("click", () => {
    newBookModal.showModal();
    Array.from(document.forms[0])
      .slice(0, -1)
      .forEach((input) => (input.value = "")); //clearing input fields
  });

  deleteBtn.addEventListener("click", () => {
    delete lib[openBook];
    _displayBooks();
    editBookModal.close();
  });

  newSubmitBtn.addEventListener("click", _addBook);

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      editBookModal.close();
      newBookModal.close();
    });
  });

  editSubmitBtn.addEventListener("click", () => {
    let inputChecker = 0;
    let editInputs = Array.from(document.forms[1]).slice(0, -1);
    editInputs.forEach((input) => {
      if (input.value != "") inputChecker++;
    });
    if (inputChecker != editInputs.length) return;
    delete lib[openBook];
    let pagesRead =
      document.querySelector("#edit-pages-read").value >
      document.querySelector("#edit-pages").value
        ? document.querySelector("#edit-pages").value
        : document.querySelector("#edit-pages-read").value; // if pagesRead is bigger than the actual number of pages of the book
    let newBook = Book(
      document.querySelector("#edit-book-title").value,
      document.querySelector("#edit-author").value,
      document.querySelector("#edit-pages").value,
      document.querySelector("#edit-score").value,
      pagesRead
    );
    lib.push(newBook);
    _orderBooks();

    _displayBooks();
  });
  _displayBooks();
};
Library();

