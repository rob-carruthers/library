let myLibrary = [];

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
  myLibrary.push(newBook);

  const bookContainer = document.getElementById("bookContainer");

  const bookCard = document.createElement("div");
  bookCard.classList = "bookCard";
  bookContainer.appendChild(bookCard);

  const titleDiv = document.createElement("div");
  const authorDiv = document.createElement("div");
  const pagesDiv = document.createElement("div");
  const isReadDiv = document.createElement("div");

  titleDiv.classList = "title";
  authorDiv.classList = "author";
  pagesDiv.classList = "pages";
  isReadDiv.classList = "isRead";

  bookCard.appendChild(titleDiv);
  bookCard.appendChild(authorDiv);
  bookCard.appendChild(pagesDiv);
  bookCard.appendChild(isReadDiv);

  titleDiv.textContent = newBook.title;
  authorDiv.textContent = newBook.author;
  pagesDiv.textContent = newBook.pages + " pages";
  if (newBook.isRead) {
    isReadDiv.textContent = "Already read";
  } else {
    isReadDiv.textContent = "Not read yet";
  }
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
}

addBookToLibrary("Hi", "John Smith", 133, false);
addBookToLibrary("Hello World", "Aidan Smith", 153, true);
addBookToLibrary("Another Book", "Aidan Jones", 463, true);

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
