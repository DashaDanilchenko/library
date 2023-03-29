import { BOOK, USER, CARD, bookData, userData, cardData } from "./data.js"
import { deleteForm } from "./deleteForm.js"
import { saveMemory} from "./saveMemory.js"
import { sendInfo } from "./sendInfo.js"
import { renderElement } from "./renderElement.js"
import { renderStatistic } from "./renderStatistic.js"
import { selectorCard } from "./selectorCard.js"



let render = document.querySelector("#render")

export let arrLBooks = []
export let arrLUsers = []
export let arrCards = []

export let dataSelectBook = []
export let dataSelectUser = []
export let dataSelectBookCard = []
export let dataSelectUserCard = []

export function collectData() {
    dataSelectBook = []
    dataSelectUser = []
    dataSelectBookCard = []
    dataSelectUserCard = []

    arrLBooks.forEach(book => {
        dataSelectBook.push(book.name)
    });
    arrLUsers.forEach(user => {
        dataSelectUser.push(user.name)
    });

    arrCards.forEach(book => {
        dataSelectBookCard.push(book.nameBook)
    });
    arrCards.forEach(user => {
        dataSelectUserCard.push(user.nameUser)
    });
}


export function createForm(arrData, arrInLocalStorage, page) {
    const blockScreen = document.createElement('div')
    blockScreen.classList.add('block_screen')
    document.body.append(blockScreen)
    const formContainer = document.createElement('div')
    formContainer.classList.add('form_modal')
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
                return `<label for="${item}">${item} :  <input type="text" id="${item}"></label>`
             }).join('')
        }`
    }
    formContainer.append(formCreate)
    const sendData = document.createElement("button")
    sendData.type = "button"
    sendData.innerHTML = 'Send'
    sendData.classList.add('send')
    formCreate.append(sendData)
    sendData.addEventListener('click', (()=> sendInfo(arrData, arrInLocalStorage, page)))
    close.addEventListener('click', (()=> deleteForm(formContainer, blockScreen)))
}

export function searchTable(page, arr, tableContent) {
    if (tableContent) {
        tableContent.innerHTML = ''
    }
    switch (page) {
        case 'book':
          tableBook(arr, tableContent)
          break;
        case 'user':
          tableUser(arr, tableContent);
          break;
        case 'card':
          tableCard(arr, tableContent);
          break;
        default:
          console.log(10);
      }
}

export function sortArr(sortData, arr, page, tableContent) {
    function compare (a, b) {
        if (a[`${sortData}`] > b[`${sortData}`]) {
            return 1;
          }
          if (a[`${sortData}`] < b[`${sortData}`]) {
            return -1;
          }
            return 0;
      }
    arr.sort(compare) 

    searchTable(page, arr, tableContent)
}

export function searchArr(searchDate, arr, page , tableContent) {
    let keySearch
    switch (page) {
        case 'book':
            keySearch = 'name';
          break;
        case 'user':
            keySearch = 'name';
          break;
        case 'card':
            keySearch = 'nameUser';
          break;
        default:
          console.log(10);
      }
    let arrSearch = arr.filter((item) => (item[`${keySearch}`].toLowerCase()).includes((`${searchDate}`.toLowerCase()))) || []
    searchTable(page, arrSearch, tableContent) 
}


const pageBook = document.querySelector('#book_btn')
pageBook.addEventListener('click', (()=> renderElement(BOOK, bookData, arrLBooks)))

const pageUser = document.querySelector('#user_btn')
pageUser.addEventListener('click', (()=> renderElement(USER, userData, arrLUsers)))

const pageCard = document.querySelector('#card_btn')
pageCard.addEventListener('click', (()=> renderElement(CARD, cardData, arrCards)))

const pageStatistic = document.querySelector('#statistic_btn')
pageStatistic.addEventListener('click', (()=> renderStatistic()))


let storageBooks = JSON.parse(localStorage.getItem('book')) || []
let storageUser = JSON.parse(localStorage.getItem('user')) || []
let storageCard = JSON.parse(localStorage.getItem('card')) || []

renderElement(BOOK, bookData, arrLBooks)


// -------BOOK-----------

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
    const blockScreen = document.createElement('div')
    blockScreen.classList.add('block_screen')
    document.body.append(blockScreen)
    const formContainer = document.createElement('div')
    formContainer.classList.add('form_modal')
    document.body.append(formContainer)
    const close = document.createElement('div')
    close.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
    formContainer.append(close)
    const formCreate = document.createElement('form')
    formCreate.classList.add('formContext')
   
    formCreate.innerHTML = 
        `<label for="name">name :  <input type="text" id="name" value=${book.name}></label>
        <label for="nameAuthor">nameAuthor :  <input type="text" id="nameAuthor" value=${book.nameAuthor}></label>
        <label for="year">year :  <input type="text" id="year" value=${book.year}></label>
        <label for="numPage">numPage :  <input type="text" id="numPage" value=${book.numPage}></label>
        <label for="numInLibrary">numInLibrary :  <input type="text" id="numInLibrary" value=${book.numInLibrary}></label>
        <label for="NamePublishingHouse">NamePublishingHouse :  <input type="text" id="NamePublishingHouse" value=${book.NamePublishingHouse}></label>`

    formContainer.append(formCreate)
    const sendData = document.createElement("button")
    sendData.type = "button"
    sendData.classList.add('send')
    sendData.innerHTML = 'Send'
    formCreate.append(sendData)
    sendData.addEventListener('click', (()=> editBook(book)))
    close.addEventListener('click', (()=> deleteForm(formContainer, blockScreen)))
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


function tableBook(arr, tableContent) {
    const table = document.querySelector(`.${BOOK}`)
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
    const books = arr.map(renderBooks)
    tableContent.append(...books)
}

// -------USER-----------


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
    const blockScreen = document.createElement('div')
    blockScreen.classList.add('block_screen')
    document.body.append(blockScreen)
    const formContainer = document.createElement('div')
    formContainer.classList.add('form_modal')
    document.body.append(formContainer)
    const close = document.createElement('div')
    close.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
    formContainer.append(close)
    const formCreate = document.createElement('form')
    formCreate.classList.add('formContext')
   
    formCreate.innerHTML = 
        `<label for="name">name :  <input type="text" id="name" value=${user.name}></label>
        <label for="phone">phone :  <input type="text" id="phone" value=${user.phone}></label>`

    formContainer.append(formCreate)
    const sendData = document.createElement("button")
    sendData.type = "button"
    sendData.classList.add('send')
    sendData.innerHTML = 'Send'
    formCreate.append(sendData)
    sendData.addEventListener('click', (()=> editUser(user)))
    close.addEventListener('click', (()=> deleteForm(formContainer, blockScreen)))
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


function tableUser(arr, tableContent) {
    const table = document.querySelector(`.${USER}`)
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
    const users = arr.map(renderUser)
    tableContent.append(...users)
}

// -------CARD-----------


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

function returnBookInLibrary () {

    const date = document.querySelector('#date')

    date.value = '<i class="fa-solid fa-reply"></i>'

}


function editFormCard(card) {
    const blockScreen = document.createElement('div')
    blockScreen.classList.add('block_screen')
    document.body.append(blockScreen)
    const formContainer = document.createElement('div')
    formContainer.classList.add('form_modal')
    document.body.append(formContainer)
    const close = document.createElement('div')
    close.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
    formContainer.append(close)
    const formCreate = document.createElement('form')
    formCreate.classList.add('formContext')
    selectorCard(formCreate, card.nameUser, card.nameBook, card.date)
    formContainer.append(formCreate)

    const returnBook = document.createElement("button")
    returnBook.classList.add('send')
    returnBook.type = "button"
    returnBook.innerHTML = 'The book is returned'

    const sendData = document.createElement("button")
    sendData.classList.add('send')
    sendData.type = "button"
    sendData.innerHTML = 'Send'

    formCreate.append(returnBook)
    formCreate.append(sendData)

    returnBook.addEventListener('click', (()=> returnBookInLibrary()))
    sendData.addEventListener('click', (()=> editCard(card)))
    close.addEventListener('click', (()=> deleteForm(formContainer, blockScreen)))
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

function tableCard(arr, tableContent) {
    const table = document.querySelector(`.${CARD}`)
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
    const cards = arr.map(renderCard)
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
