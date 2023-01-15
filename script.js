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
    bookCard.id = book.index;
    bookContainer.appendChild(bookCard);

    const titleDiv = document.createElement("div");
    const authorDiv = document.createElement("div");
    const pagesDiv = document.createElement("div");
    const isReadDiv = document.createElement("div");
    const actionButtons = document.createElement("div");
    const readButton = document.createElement("div");
    const deleteButton = document.createElement("div");

    actionButtons.appendChild(readButton);
    actionButtons.appendChild(deleteButton);

    titleDiv.classList = "title";
    authorDiv.classList = "author";
    pagesDiv.classList = "pages";
    isReadDiv.classList = "isRead";
    actionButtons.classList = "actionButtons";
    deleteButton.classList = "deleteButton";
    readButton.classList = "readButton";

    bookCard.appendChild(titleDiv);
    bookCard.appendChild(authorDiv);
    bookCard.appendChild(pagesDiv);
    bookCard.appendChild(isReadDiv);
    bookCard.appendChild(actionButtons);

    titleDiv.innerHTML = "<p>" + book.title + "</p>";
    authorDiv.innerHTML = "<p>" + book.author + "</p>";
    pagesDiv.innerHTML = "<p>" + book.pages + " pages</p>";
    readButton.innerHTML = '<p id=read-' + book.index + '"><span class="iconify" data-icon="mdi-book-open" height="32px"></p>';
    if (book.isRead) {
      isReadDiv.innerHTML = "<p>Already read</p>";
      readButton.style = "color: green;"
    } else {
      isReadDiv.innerHTML = "<p>Not read yet</p>";
      readButton.style = "color: gray;"
    }

    deleteButton.innerHTML =
      '<p id="button-' + book.index + '"><span class="iconify" data-icon="mdi-close-thick" height="32px"></p>';

    deleteButton.addEventListener("click", (e) => {
      const id = e.target.closest(".bookCard").id;
      delete myLibrary[id];
      renderLibrary();
    })

    readButton.addEventListener("click", (e) => {
      const id = e.target.closest(".bookCard").id;
      const book = myLibrary[id];

      if (book.isRead) {
        book.isRead = false;
        e.target.style = "color: gray;"
      }
      else {
        book.isRead = true;
        e.target.style = "color: green;"
      }

      renderLibrary();
    });
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
  let validInput = true;

  for (let i = 0; i < numFields; i++) {
    switch (form[i].id) {
      case "newBookTitle":
        if (!form[i].checkValidity()) {
          document.getElementById("newBookTitleError").textContent = "Please enter a valid title."
          validInput = false;
          console.log(form[i])
        } 
        else { 
          newBookTitle = form[i].value; 
          document.getElementById("newBookTitleError").textContent = ""
        }
        break;
      case "newBookAuthor":
        if (!form[i].checkValidity()) {
          document.getElementById("newBookAuthorError").textContent = "Please enter a valid author."
          validInput = false;
          console.log(form[i])
        } 
        else { 
          newBookAuthor = form[i].value; 
          document.getElementById("newBookAuthorError").textContent = ""
        }
        break;
      case "newBookPages":
        if (!form[i].checkValidity()) {
          document.getElementById("newBookPagesError").textContent = "Number of pages must be at least 1."
          validInput = false;
          console.log(form[i])
        } 
        else { 
          newBookPages = form[i].value; 
          document.getElementById("newBookPagesError").textContent = ""
        }
        break;
      case "newBookIsRead":
        newBookIsRead = form[i].value;
        break;
    }
  }

  if (validInput) {
    addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookIsRead);
    modal.style.display = "none";
    bookCreatorForm.style.display = "none";
    renderLibrary();
  }
}

addBookToLibrary("Hi", "John Smith", 133, false);
addBookToLibrary("Hello World", "Aidan Smith", 153, true);
addBookToLibrary("Another Book", "Aidan Jones", 463, true);
addBookToLibrary("Hi", "John Smith", 133, false);
addBookToLibrary("Hello World", "Aidan Smith", 153, true);
addBookToLibrary("Another Book", "Aidan Jones", 463, true);
addBookToLibrary("Hi", "John Smith", 133, false);
addBookToLibrary("Hello World", "Aidan Smith", 153, true);
addBookToLibrary("Another Book", "Aidan Jones", 463, true);
renderLibrary();

const modal = document.getElementById("modalContainer");
const bookCreatorForm = document.getElementById("bookCreatorForm");
const resetBooksDialog = document.getElementById("resetDialog");
const openBookCreator = document.getElementById("openBookCreator");
const modalCloseButtons = document.getElementsByClassName("modalCloseButton");
const submitCreateBookButton = document.getElementById("submitCreateBook");
const resetBooksButton = document.getElementById("resetBooksButton");
const removeAllBooks = document.getElementById("removeAllBooks");

openBookCreator.addEventListener("click", () => {
  modal.style.display = "flex";
  bookCreatorForm.style.display = "flex";
});

resetBooksButton.addEventListener("click", () => {
  modal.style.display = "flex";
  resetBooksDialog.style.display = "flex";
});

for (let button of modalCloseButtons) { button.addEventListener("click", () => {
  modal.style.display = "none";
  bookCreatorForm.style.display = "none";
  resetBooksDialog.style.display = "none";
})};

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
    bookCreatorForm.style.display = "none";
  }
});

submitCreateBookButton.addEventListener("click", createBookFromForm);

removeAllBooks.addEventListener("click", () => {
  myLibrary = {};
  renderLibrary();
  modal.style.display = "none";
  resetBooksDialog.style.display = "none";
});
