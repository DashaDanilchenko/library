
let render = document.querySelector("#render")

const BOOK = 'book'
const USER = 'user'
const CARD = 'card'
const STATISTIC = 'statistics'

const bookData = ['name', 'nameAuthor', 'year', 'numPage', 'numInLibrary', 'NamePublishingHouse']
let arrLBooks = []

const userData = ['name', 'phone']
let arrLUsers = []

const cardData = ['nameUser', 'nameBook', 'date']
let arrCards = []

const dataSelectBook = []
const dataSelectUser = []

function str_gen(num) {
    allStr = '123456789';
    let str = '';
    for (let i = 0; i < num; i++) {
        let pos = Math.floor(Math.random() * allStr.length);
        str += allStr.substring(pos,pos+1);
    }
    return str;
}

function deleteForm(element) {
    element.remove()
}

function createInfo(arr) {
    let obj = {}
    obj.id = str_gen(5)
    arr.map((i) => {
        obj[`${i}`]= document.querySelector(`#${i}`).value
    })
    return obj
}

function saveMemory(arrInLocalStorage, page) {
    localStorage.setItem(`${page}`, JSON.stringify(arrInLocalStorage))
}

function sendInfo(arrData, arrInLocalStorage, page) {
    let objectInfo = createInfo(arrData)
    arrInLocalStorage.push(objectInfo)
    saveMemory(arrInLocalStorage, page)
    switch (page) {
        case 'book':
            renderElement(BOOK, bookData, arrLBooks);
          break;
        case 'user':
            renderElement(USER, userData, arrLUsers);
          break;
        case 'card':
            renderElement(CARD, cardData, arrCards);
          break;
        default:
          console.log(10);
      }
}

function collectData() {
    arrLBooks.forEach(book => {
        dataSelectBook.push(book.name)
    });
    arrLUsers.forEach(user => {
        dataSelectUser.push(user.name)
    });
}


function selectorCard(formCreate, nameUser='', nameBook='', date='') {
    collectData()
    return formCreate.innerHTML = 
    `<label for="nameUser">nameUser: <select id="nameUser">
    ${       
        dataSelectUser.map((item) => {
            return item === nameUser
            ?`<option>${nameUser}</option>`
            :`<option>${item}</option>`
         }).join('')
    }       
        </select>
    </label>
    <label for="nameBook">nameBook: <select id="nameBook">
    ${       
        dataSelectBook.map((item) => {
            return item === nameBook
            ?`<option>${nameBook}</option>`
            :`<option>${item}</option>`
         }).join('')
    }       
        </select>
    </label>
    <label for="date">date:<input type="text" id="date" value=${date}></label>`

}

function createForm(arrData, arrInLocalStorage, page) {
    const formContainer = document.createElement('div')
    formContainer.classList.add('formModal')
    document.body.append(formContainer)
    const close = document.createElement('div')
    close.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
    formContainer.append(close)
    const formCreate = document.createElement('form')
    formCreate.classList.add('formContext')
    if (page === 'card') {
        selectorCard(formCreate)
    } else {
        formCreate.innerHTML = `${
            arrData.map((item) => {
                return `<label for="${item}">${item}:<input type="text" id="${item}"></label>`
             }).join('')
        }`
    }
    formContainer.append(formCreate)
    const sendData = document.createElement("button")
    sendData.type = "button"
    sendData.innerHTML = 'Send'
    formCreate.append(sendData)
    sendData.addEventListener('click', (()=> sendInfo(arrData, arrInLocalStorage, page)))
    close.addEventListener('click', (()=> deleteForm(formContainer)))
}


function renderElement(page, arrData, arrInLocalStorage) {
    render.innerHTML = ""
    let section = document.createElement('section')
    section.classList.add(`${page}`)
    section.innerHTML = `
        <div>
                <span>all ${page}:</span>
                <button id="new_${page}">New ${page}</button>
            </div>
            <hr>
            <div class="forms">
                <form>
                    <label for="sort_${page}"><input type="text" id="sort_${page}"></label>
                    <button>Sort</button>
                </form>
                <form>
                <label for="search_${page}"><input type="text" id="search_${page}"></label>
                <button>Search</button>
            </form>
            </div>
    `
    render.appendChild(section)

    switch (page) {
      case 'book':
        tableBook()
        break;
      case 'user':
        tableUser();
        break;
      case 'card':
        tableCard();
        break;
      default:
        console.log(10);
    }

    let newContent = document.querySelector(`#new_${page}`)
    newContent.addEventListener('click', (()=> createForm(arrData, arrInLocalStorage, page)))
}


const pageBook = document.querySelector('#book_btn')
pageBook.addEventListener('click', (()=> renderElement(BOOK, bookData, arrLBooks)))

const pageUser = document.querySelector('#user_btn')
pageUser.addEventListener('click', (()=> renderElement(USER, userData, arrLUsers)))

const pageCard = document.querySelector('#card_btn')
pageCard.addEventListener('click', (()=> renderElement(CARD, cardData, arrCards)))

const pageStatistic = document.querySelector('#statistic_btn')
pageStatistic.addEventListener('click', (()=> renderElement(STATISTIC)))


let storageBooks = JSON.parse(localStorage.getItem('book')) || []
let storageUser = JSON.parse(localStorage.getItem('user')) || []
let storageCard = JSON.parse(localStorage.getItem('card')) || []

renderElement(BOOK, bookData, arrLBooks)

console.log(localStorage)
// localStorage.clear()


function editBook(book) {
    arrLBooks = arrLBooks.map((item) => {
    return item.id === book.id
    ? {...item,
        name: document.querySelector('#name').value,
        nameAuthor: document.querySelector('#nameAuthor').value,
        year: document.querySelector('#year').value,
        numPage: document.querySelector('#numPage').value,
        numInLibrary: document.querySelector('#numInLibrary').value,
        NamePublishingHouse: document.querySelector('#NamePublishingHouse').value,}
    : {... item}
   })
    saveMemory(arrLBooks, BOOK)
    renderElement(BOOK, bookData, arrLBooks)
}


function editFormBook(book) {
    const formContainer = document.createElement('div')
    formContainer.classList.add('formModal')
    document.body.append(formContainer)
    const close = document.createElement('div')
    close.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
    formContainer.append(close)
    const formCreate = document.createElement('form')
    formCreate.classList.add('formContext')
   
    formCreate.innerHTML = 
        `<label for="name">name:<input type="text" id="name" value=${book.name}></label>
        <label for="nameAuthor">nameAuthor:<input type="text" id="nameAuthor" value=${book.nameAuthor}></label>
        <label for="year">year:<input type="text" id="year" value=${book.year}></label>
        <label for="numPage">numPage:<input type="text" id="numPage" value=${book.numPage}></label>
        <label for="numInLibrary">numInLibrary:<input type="text" id="numInLibrary" value=${book.numInLibrary}></label>
        <label for="NamePublishingHouse">NamePublishingHouse:<input type="text" id="NamePublishingHouse" value=${book.NamePublishingHouse}></label>`

    formContainer.append(formCreate)
    const sendData = document.createElement("button")
    sendData.type = "button"
    sendData.innerHTML = 'Send'
    formCreate.append(sendData)
    sendData.addEventListener('click', (()=> editBook(book)))
    close.addEventListener('click', (()=> deleteForm(formContainer)))
}


function deleteBook(book) {
    arrLBooks = arrLBooks.filter((item) => item.id !== book.id)
    saveMemory(arrLBooks, BOOK)
    renderElement(BOOK, bookData, arrLBooks)
}


function renderBooks(book) {
    const tab = document.createElement('tr')
    tab.innerHTML = `
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.nameAuthor}</td>
            <td>${book.year}</td>
            <td>${book.numPage}</td>
            <td>${book.numInLibrary}</td>
            <td>${book.NamePublishingHouse}</td>
    `

    const deleteBookBtn = document.createElement('td')
    deleteBookBtn.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>'
    tab.append(deleteBookBtn)
    deleteBookBtn.addEventListener('click', () => deleteBook(book))

    const editBookBtn = document.createElement('td')
    editBookBtn.innerHTML = '<i class="fa-sharp fa-solid fa-pen-to-square"></i>'
    tab.append(editBookBtn)
    editBookBtn.addEventListener('click', () => editFormBook(book))

    return tab
}


function tableBook() {
    const table = document.querySelector(`.${BOOK}`)
    const tableContent = document.createElement('table')
    tableContent.classList.add('table_content')
    tableContent.innerHTML = `
    <thead>
        <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Name author</td>
        <td>Year publication</td>
        <td>Name publishing house</td>
        <td>Number pages</td>
        <td>Number in the library</td>
        <td>Delete</td>
        <td>Edit</td>
        </tr>
    </thead> `
    table.append(tableContent)
    const books = arrLBooks.map(renderBooks)
    tableContent.append(...books)
}

///////////////////////


function editUser(user) {
    arrLUsers = arrLUsers.map((item) => {
    return item.id === user.id
    ? {...item,
        name: document.querySelector('#name').value,
        phone: document.querySelector('#phone').value,
    }
    : {... item}
   })
    saveMemory(arrLUsers, USER)
    renderElement(USER, userData, arrLUsers)
}


function editFormUser(user) {
    const formContainer = document.createElement('div')
    formContainer.classList.add('formModal')
    document.body.append(formContainer)
    const close = document.createElement('div')
    close.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
    formContainer.append(close)
    const formCreate = document.createElement('form')
    formCreate.classList.add('formContext')
   
    formCreate.innerHTML = 
        `<label for="name">name:<input type="text" id="name" value=${user.name}></label>
        <label for="phone">phone:<input type="text" id="phone" value=${user.phone}></label>`

    formContainer.append(formCreate)
    const sendData = document.createElement("button")
    sendData.type = "button"
    sendData.innerHTML = 'Send'
    formCreate.append(sendData)
    sendData.addEventListener('click', (()=> editUser(user)))
    close.addEventListener('click', (()=> deleteForm(formContainer)))
}



function deleteUser(user) {
    arrLUsers = arrLUsers.filter((item) => item.id !== user.id)
    saveMemory(arrLUsers, USER)
    renderElement(USER, userData, arrLUsers)
}

function renderUser(user) {
    const tab = document.createElement('tr')
    tab.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.phone}</td>
    `

    const deleteUserBtn = document.createElement('td')
    deleteUserBtn.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>'
    tab.append(deleteUserBtn)
    deleteUserBtn.addEventListener('click', () => deleteUser(user))

    const editUserBtn = document.createElement('td')
    editUserBtn.innerHTML = '<i class="fa-sharp fa-solid fa-pen-to-square"></i>'
    tab.append(editUserBtn)
    editUserBtn.addEventListener('click', () => editFormUser(user))

    return tab
}


function tableUser() {
    const table = document.querySelector(`.${USER}`)
    const tableContent = document.createElement('table')
    tableContent.classList.add('table_content')
    tableContent.innerHTML = `
    <thead>
        <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Phone</td>
        <td>Delete</td>
        <td>Edit</td>
        </tr>
    </thead>`
    table.append(tableContent)
    const users = arrLUsers.map(renderUser)
    tableContent.append(...users)
}

// /////////////////////////


function editCard(card) {
    arrCards = arrCards.map((item) => {
    return item.id === card.id
    ? {...item,
        nameUser: document.querySelector('#nameUser').value,
        nameBook: document.querySelector('#nameBook').value,
        date: document.querySelector('#date').value,
    }
    : {... item}
   })
    saveMemory(arrCards, CARD)
    renderElement(CARD, cardData, arrCards)
}


function editFormCard(card) {
    const formContainer = document.createElement('div')
    formContainer.classList.add('formModal')
    document.body.append(formContainer)
    const close = document.createElement('div')
    close.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
    formContainer.append(close)
    const formCreate = document.createElement('form')
    formCreate.classList.add('formContext')
    selectorCard(formCreate, card.nameUser, card.nameBook, card.date)
    // formCreate.innerHTML = 
    //     `<label for="nameUser">nameUser:<input type="text" id="nameUser" value=${card.nameUser}></label>
    //     <label for="nameBook">nameBook:<input type="text" id="nameBook" value=${card.nameBook}></label>
    //     <label for="date">date:<input type="text" id="date" value=${card.date}></label>`

    formContainer.append(formCreate)
    const sendData = document.createElement("button")
    sendData.type = "button"
    sendData.innerHTML = 'Send'
    formCreate.append(sendData)
    sendData.addEventListener('click', (()=> editCard(card)))
    close.addEventListener('click', (()=> deleteForm(formContainer)))
}

function deleteCard(card) {
    arrCards = arrCards.filter((item) => item.id !== card.id)
    saveMemory(arrCards, CARD)
    renderElement(CARD, cardData, arrCards)
}


function renderCard(card) {
    const tab = document.createElement('tr')
    tab.innerHTML = `
        <td>${card.id}</td>
        <td>${card.nameUser}</td>
        <td>${card.nameBook}</td>
        <td>${card.date}</td>
    `

    const deleteCardBtn = document.createElement('td')
    deleteCardBtn.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>'
    tab.append(deleteCardBtn)
    deleteCardBtn.addEventListener('click', () => deleteCard(card))

    const editCardBtn = document.createElement('td')
    editCardBtn.innerHTML = '<i class="fa-sharp fa-solid fa-pen-to-square"></i>'
    tab.append(editCardBtn)
    editCardBtn.addEventListener('click', () => editFormCard(card))

    return tab
}

function tableCard() {
    const table = document.querySelector(`.${CARD}`)
    const tableContent = document.createElement('table')
    tableContent.classList.add('table_content')
    tableContent.innerHTML = `
    <thead>
        <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Name book</td>
        <td>Date</td>
        <td>Delete</td>
        <td>Edit</td>
        </tr>
    </thead>`
    table.append(tableContent)
    const cards = arrCards.map(renderCard)
    tableContent.append(...cards)
}



if (storageUser) {
    arrLUsers = storageUser 
    renderElement(USER, userData, arrLUsers)
}

if (storageCard) {
    arrCards = storageCard 
    renderElement(CARD, cardData, arrCards) 
}

if (storageBooks) {
    arrLBooks = storageBooks 
    renderElement(BOOK, bookData, arrLBooks)
}