
const newBookForm = document.getElementById('new-book-form');
const newBookButton = document.getElementById('new-book-button');
const cardHolder = document.getElementById('card-holder');
const submit = document.getElementById('submit');


// Display New Book Form
newBookButton.addEventListener('click', function() {
    newBookForm.classList.toggle("toggle-form")
});


// Create array to hold Book objects
let myLibrary = []


// Create Book Object  - prototype attribute is Book.prototype
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author} - ${this.pages} pages. ${this.read ? 'Read' : 'Not read yet'}`;
}

// Function to add Book to Array
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}


addBookToLibrary("A book", "An author", 100, true);
addBookToLibrary("Another book", "Another author", 200, false);
addBookToLibrary("A third book", "A third author", 100, false);
addBookToLibrary("Alf The Gorilla", "Robert Meredith", 86, true);



// Display Books currently in Array
function displayBooks() {
    refreshScreen()

    for (let i = 0; i < myLibrary.length; i++) {

        // Create card with book information
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('card-number', i);
        card.textContent = myLibrary[i].info();

        // Create button to remove book 
        let removeCard = document.createElement('button');
        removeCard.classList.add('remove-card');
        removeCard.textContent = "Remove Book";
        removeCard.addEventListener('click', function() {
            let cardNum = card.getAttribute('card-number');
            myLibrary.splice(cardNum, 1);
            cardHolder.innerHTML = "";
            displayBooks();
        })

        // Create button to change read status
        let readStatus = document.createElement('button');
        readStatus.classList.add('read-status-button');
        readStatus.textContent = "Change Read Status";
        readStatus.addEventListener('click', function() {
            if (myLibrary[i].read) {
                myLibrary[i].read = false;
            } else {
                myLibrary[i].read = true;
            }
            displayBooks();
            
        })

        cardHolder.appendChild(card);
        card.appendChild(removeCard);
        card.appendChild(readStatus);
    
        }
    }

    displayBooks();



    function refreshScreen() {
        cardHolder.innerHTML = "";
    }

    submit.addEventListener('click', function() {
        let newBookAuthor = document.getElementById("author").value;
        let newBookTitle = document.getElementById("title").value;
        let newBookPages = document.getElementById("pages").value;
        let newBookRead = document.getElementById("read").value;
        addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookRead);
        newBookForm.classList.toggle("toggle-form");
        newBookForm.reset();
        displayBooks();
    })


    





