import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

const matches = books; //added const

const page = 1; //added const

// Display Books
// code to display more books goes here


let [bookStart,bookEnd] = [0,36]
const inco = document.querySelector("[data-list-items]"); // created a variable and took the empty div from HTML line 93
const extracted = matches.slice(bookStart, bookEnd); //source.slice(range[0], range[1])   // commented out source and replaced it with books to display the 36 books
const fragment = document.createDocumentFragment();
for (const { author, image, title, id, description, published } of extracted) {
    // turned it into a for loop by adding const inside the brackets ()
    //const { author: authorId, id, image, title } = props

    let element = document.createElement("button");
    element.classList = "preview";
    element.dataset.id = id;
    element.dataset.title = title;
    element.dataset.description = description;
    element.dataset.image = image;
    element.dataset.subtitle = `${authors[author]} (${new Date(
        published
    ).getFullYear()})`;
    element.setAttribute("data-preview", id);

    element.innerHTML = /* html */ `
            <div><img
                class ="preview__image"
                src="${image}"
            /></div>
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;
    //removed "" and Id on authorId and removed the // forward slash

    fragment.appendChild(element);
}

inco.appendChild(fragment); // appended the fragment into inco

// Preview of the books

const details = (event) => {
    const overlay1 = document.querySelector("[data-list-active]");
    const title = document.querySelector("[data-list-title]");
    const subtitle = document.querySelector("[data-list-subtitle]");

    const description = document.querySelector("[data-list-description]");
    const image1 = document.querySelector("[data-list-image]");
    const imageblur = document.querySelector("[data-list-blur]");
    event.target.dataset.id ? (overlay1.style.display = "block") : undefined;
    event.target.dataset.title
        ? (title.innerHTML = event.target.dataset.title)
        : undefined;
    event.target.dataset.subtitle
        ? (subtitle.innerHTML = event.target.dataset.subtitle)
        : undefined;
    event.target.dataset.description
        ? (description.innerHTML = event.target.dataset.description)
        : undefined;
    event.target.dataset.image
        ? image1.setAttribute("src", event.target.dataset.image)
        : undefined;
    event.target.dataset.image
        ? imageblur.setAttribute("src", event.target.dataset.image)
        : undefined;
};

document.querySelector("[data-list-items]").addEventListener("click", details);
document.querySelector("[data-list-close]").addEventListener("click", () => {
    document.querySelector("[data-list-active]").style.display = "none";
});

//Dark mode and light mode

const day = {
    //added const
    dark: "10, 10, 20",
    light: "255, 255, 255",
};

const night = {
    dark: "255, 255, 255",
    light: "10, 10, 20",
};

const settingOverlay = document.querySelector("[data-header-settings]");
settingOverlay.addEventListener("click", (event) => {
    document.querySelector("[data-settings-overlay]").style.display = "block";
});

const theme = document.querySelector("[data-settings-theme]");
const saveButton = document.querySelector(
    "body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary"
);
saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (theme.value === "day") {
        document.querySelector("body").style.setProperty("--color-dark", day.dark);
        document
            .querySelector("body")
            .style.setProperty("--color-light", day.light);
        document.querySelector("[data-settings-overlay]").style.display = "none";
    }

    if (theme.value === "night") {
        document
            .querySelector("body")
            .style.setProperty("--color-dark", night.dark);
        document
            .querySelector("body")
            .style.setProperty("--color-light", night.light);
        document.querySelector("[data-settings-overlay]").style.display = "none";
    }
});

// cancel button on theme

const dataSettingsCancel = document.querySelector("[data-settings-cancel]");
dataSettingsCancel.addEventListener("click", (event) => {
    document.querySelector("[data-settings-overlay]").style.display = "none";
});

// Show More Button

const moreBooks = document.querySelector("[data-list-button]"); // created a variable and called data-list-button from the DOM
const showMore = page * BOOKS_PER_PAGE; /*  Show more */ //moved it to the line below and removed the = before. removed books and replaced with matches so that it can get total number of books

moreBooks.disabled = !(matches.length - showMore > 0); //replaced data-list-button  with the variable I just created, replaced [page * BOOKS_PER_PAGE] with showMore on this code block

moreBooks.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining">${matches.length - showMore > 0 ? matches.length - showMore : 0
    }</span>
`;
// removed the () on the main and removed [] on page*BOOKS_PER_PAGE and replaced with (). Removed the [] and replaced with ``

moreBooks.addEventListener("click", () => {
    moreBooks.focus();
});

//Display of the show more button

const showMoreButton = document.querySelector("[data-list-button]");
let startIndex = 36;
let endIndex = 72;

showMoreButton.addEventListener("click", () => {
    const extracted = matches.slice(startIndex, endIndex);

    const fragment = document.createDocumentFragment();
    for (const {
        author,
        image,
        title,
        id,
        description,
        published,
    } of extracted) {
        const element = document.createElement("button");
        element.classList.add("preview");
        element.dataset.id = id;
        element.dataset.title = title;
        element.dataset.description = description;
        element.dataset.image = image;
        element.dataset.subtitle = `${authors[author]} (${new Date(
            published
        ).getFullYear()})`;
        element.setAttribute("data-preview", id);

        element.innerHTML = /* html */ `
        <div>
          <img class="preview__image" src="${image}" />
        </div>
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>
      `;

        fragment.appendChild(element);
    }

    document.querySelector("[data-list-items]").appendChild(fragment);

    startIndex += 36;
    endIndex += 36;
});

//Search Button

const searchButton = document.querySelector("[data-header-search]"); // created a variable and took the empty div from HTML line 65
const searchBar = document.querySelector("[data-search-overlay]"); // created a variable and took the empty div from HTML line 113

searchButton.addEventListener("click", () => {
    searchBar.open = true;
});

//genre and author drop down list

//data search drop down

const dataSearchGenres = document.querySelector("[data-search-genres]"); //named my variable the name i used to call genre from the DOM, and changed createDocument to querySelector
const allGenresOption = document.createElement("option"); //renamed variable name
allGenresOption.value = "any"; //called the variable I created above
allGenresOption.innerText = "All Genres"; // replaced element with the variable I created above and added .innerText
dataSearchGenres.appendChild(allGenresOption); //appended the two variable I created or renamed above
for (const [id, names] of Object.entries(genres)) {
    // created a for loop and started by removing i++ and adding const inside the ()
    const element = document.createElement("option"); //created variable element
    element.value = id; //replaced value with id
    element.innerText = names; //replaced text with names and added innertext
    dataSearchGenres.appendChild(element); //called the datasearchgenre variable and appended to element
}

for (const [id, names] of Object.entries(genres)) {
    // added const inside the bracket and called genres instead of author, removed the ; and id++
    const element = document.createElement("option"); //added const declared a variable called element
    element.value = id; //replaced value with id
    element.innerText = names; //replaced text with names and added innertext
    dataSearchGenres.appendChild(element); //called the datasearchgenre variable and appended to element
}

// Drop down for authors

const dataSearchAuthors = document.querySelector("[data-search-authors]"); //named my variable the name i used to call genre from the DOM, and changed createDocument to querySelector
const allAuthorsOption = document.createElement("option");
allAuthorsOption.value = "any";
allAuthorsOption.innerText = "All Authors";
dataSearchAuthors.appendChild(allAuthorsOption);
for (const [id, names] of Object.entries(authors)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = names;
    dataSearchAuthors.appendChild(element);
}

const dataSearchCancel = document.querySelector("[data-search-cancel]");
dataSearchCancel.addEventListener("click", () => {
    if ((searchBar.open = true)) {
        searchBar.close();
    }
});


// Search specific books
const searchFilter = document.querySelector('[data-search-form]')
// add event listener to search form
searchFilter.addEventListener('submit', (event)=>{
    event.preventDefault();
// hide book list
   document.querySelector('[data-list-items]').style.display = 'none'
// clear message area
   document.querySelector('[data-list-message]').innerHTML = ''
// get form data
   const formData = new FormData(event.target)
    const title1 = formData.get('title');
    const genre1 = formData.get('genre');
    const author1 = formData.get('author');
// array to store filtered books
const filteredBooks = [];
// loop through all books
for (let i = 0; i < matches.length; i++) {
  const book = matches[i];
  // if genre and author are not selected, filter by title only
  if (genre1 === 'any' && author1 === 'any') {
   if (book.title.toLowerCase().includes(title1.toLowerCase())){
    filteredBooks.push(book);
   }
  }
  // if genre is not selected, filter by title and author
  if (genre1 === 'any') {
    if (book.title.toLowerCase().includes(title1.toLowerCase()) && book.author === author1){
     filteredBooks.push(matches);
    }
   }
   // if title is not entered, filter by author and genre
   if (title1 === '') {
    if (book.author === author1 && book.genres.includes(genre1)){
     filteredBooks.push(matches);
    }
   }
   // if neither title nor author are selected, filter by genre only
   if (title1 === '' && author1 === 'any' ) {
    if (book.genres.includes(genre1)){
     filteredBooks.push(matches);
    }
   }
   // display message if no books match filters
   if (filteredBooks.length > 0){
    document.querySelector('[data-list-message]').innerText = ''
    document.querySelector('[data-list-button]').disabled = true
    document.querySelector('[data-list-message]').style.marginTop = '-125px';
   } else{
    document.querySelector('[data-list-message]').innerText = 'No results found. Your filters might be too narrow.'
    document.querySelector('[data-list-button]').disabled = true
   }
}
// display filtered books
document.querySelector('[class="list__message"]').style.display = 'block'
// create fragment to hold filtered books
const fragment2 = document.createDocumentFragment()
    for (const {author ,image, title, id , description, published} of filteredBooks) {
        const preview = document.createElement('button')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description
        preview.dataset.genre = genres
        // create preview button with book information
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`
// append preview button to fragment
        fragment2.appendChild(preview)
        }
// add filtered books to message area
    const booklist2 = document.querySelector('[class="list__message"]')
    booklist2.append(fragment2)
        document.querySelector('[data-search-form]').reset()
        document.querySelector("[data-search-overlay]").close()
    })
