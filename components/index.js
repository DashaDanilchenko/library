import { BOOK, USER, CARD, bookData, userData, cardData } from "./data.js"
import { saveMemory} from "./saveMemory.js"
import { renderElement } from "./renderElement.js"
import { renderStatistic } from "./renderStatistic.js"


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

export function editBook(book) {
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


export function deleteBook(book) {
    arrLBooks = arrLBooks.filter((item) => item.id !== book.id)
    saveMemory(arrLBooks, BOOK)
    renderElement(BOOK, bookData, arrLBooks)
}

// -------USER-----------


export function editUser(user) {
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

export function deleteUser(user) {
    arrLUsers = arrLUsers.filter((item) => item.id !== user.id)
    saveMemory(arrLUsers, USER)
    renderElement(USER, userData, arrLUsers)
}

// -------CARD-----------


export function editCard(card) {
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

export function returnBookInLibrary () {

    const date = document.querySelector('#date')
    date.value = '<i class="fa-solid fa-reply"></i>'

}

export function deleteCard(card) {
    arrCards = arrCards.filter((item) => item.id !== card.id)
    saveMemory(arrCards, CARD)
    renderElement(CARD, cardData, arrCards)
}

// -------RENDER DATA-----------


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
