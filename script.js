let myLibrary = {};
let nextID = 0;

class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary[nextID] = newBook;
  newBook.index = nextID;
  nextID++;
}

function renderLibrary() {
  // first clear bookContainer
  while (bookContainer.firstChild) {
    bookContainer.removeChild(bookContainer.firstChild);
  };

  Object.values(myLibrary).forEach((book) => {
    const bookContainer = document.getElementById("bookContainer");

    const bookCard = document.createElement("div");
    bookCard.classList = "bookCard";
    bookContainer.appendChild(bookCard);

    const titleDiv = document.createElement("div");
    const authorDiv = document.createElement("div");
    const pagesDiv = document.createElement("div");
    const isReadDiv = document.createElement("div");
    const deleteButton = document.createElement("div");

    titleDiv.classList = "title";
    authorDiv.classList = "author";
    pagesDiv.classList = "pages";
    isReadDiv.classList = "isRead";
    deleteButton.classList = "deleteButton";

    bookCard.appendChild(titleDiv);
    bookCard.appendChild(authorDiv);
    bookCard.appendChild(pagesDiv);
    bookCard.appendChild(isReadDiv);
    bookCard.appendChild(deleteButton);

    titleDiv.innerHTML = "<p>" + book.title + "</p>";
    authorDiv.innerHTML = "<p>" + book.author + "</p>";
    pagesDiv.innerHTML = "<p>" + book.pages + " pages</p>";
    if (book.isRead) {
      isReadDiv.innerHTML = "<p>Already read</p>";
    } else {
      isReadDiv.innerHTML = "<p>Not read yet</p>";
    }
    deleteButton.innerHTML =
      '<p><span id="button" class="iconify" data-icon="mdi-close-thick" height="32px"></p>';
  });
}

function createBookFromForm(e) {
  e.preventDefault();
  const form = e.target.parentElement;
  const numFields = form.elements.length;
  let newBookTitle = undefined;
  let newBookAuthor = undefined;
  let newBookPages = undefined;
  let newBookIsRead = undefined;

  for (let i = 0; i < numFields; i++) {
    switch (form[i].id) {
      case "newBookTitle":
        newBookTitle = form[i].value;
        break;
      case "newBookAuthor":
        newBookAuthor = form[i].value;
        break;
      case "newBookPages":
        newBookPages = form[i].value;
        break;
      case "newBookIsRead":
        newBookIsRead = form[i].checked;
        break;
    }
  }

  addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookIsRead);
  modal.style.display = "none";
  renderLibrary();
}

addBookToLibrary("Hi", "John Smith", 133, false);
addBookToLibrary("Hello World", "Aidan Smith", 153, true);
addBookToLibrary("Another Book", "Aidan Jones", 463, true);
renderLibrary();

const modal = document.getElementById("modalContainer");
const openBookCreator = document.getElementById("openBookCreator");
const modalCloseButton = document.getElementById("modalCloseButton");
const submitCreateBookButton = document.getElementById("submitCreateBook");

openBookCreator.addEventListener("click", () => {
  modal.style.display = "flex";
});

modalCloseButton.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

submitCreateBookButton.addEventListener("click", createBookFromForm);
