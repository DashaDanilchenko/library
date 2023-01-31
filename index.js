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

function saveMemory(arrSpend, page) {
    console.log(arrSpend)
    localStorage.setItem(`${page}`, JSON.stringify(arrSpend))
}

function sendInfo(info, arr, page) {
    let objectInfo = createInfo(info)
    arr.push(objectInfo)
    saveMemory(arr, page)
}

function createForm(data, arrIn, page) {
    const formContainer = document.createElement('div')
    formContainer.classList.add('formModal')
    document.body.append(formContainer)
    const close = document.createElement('div')
    close.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
    formContainer.append(close)
    const formCreate = document.createElement('form')
    formCreate.classList.add('formContext')
    formCreate.innerHTML = `${
        data.map((item) => {
            return `<label for="${item}">${item}:<input type="text" id="${item}"></label>`
         }).join('')
    }`
    formContainer.append(formCreate)
    const sendData = document.createElement("div")
    sendData.innerHTML = 'Send'
    formCreate.append(sendData)
    sendData.addEventListener('click', (()=> sendInfo(data, arrIn, page)))
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
                    <label for="search_${page}"><input type="text" id="search_${page}></label>
                    <button>Search</button>
                </form>
            </div>
    `
    render.appendChild(section)


    switch (page) {
      case 'book':
        tableBook();
        break;
      case 'user':
        tableUser();
        break;
      case 'card':
        tableCard();
        break;
      default:
        alert( "Нет таких значений" );
    }


    createTable()
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



console.log(localStorage)
// localStorage.clear()

function tableBook() {
    const table = document.querySelector(`.${BOOK}`)
    const tableContent = document.createElement('table')
    tableContent.classList.add('table_content')
    console.log(storageBooks)
    tableContent.innerHTML = `
    <thead>
        <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Name author</td>
        <td>Year publication</td>
        <td>Name publishing house</td>
        <td>number pages</td>
        <td>number in the library</td>
        </tr>
    </thead>
    ${       
        storageBooks.map((table) => {
        return `<tr>
            <td>${table.id}</td>
            <td>${table.name}</td>
            <td>${table.nameAuthor}</td>
            <td>${table.year}</td>
            <td>${table.numPage}</td>
            <td>${table.numInLibrary}</td>
            <td>${table.NamePublishingHouse}</td>
        </tr>`
        })
    }`
    table.append(tableContent)
}

function tableUser() {
    const table = document.querySelector(`.${USER}`)
    const tableContent = document.createElement('table')
    tableContent.classList.add('table_content')
    console.log(storageUser)
    tableContent.innerHTML = `
    <thead>
        <tr>
        <td>ID</td>
        <td>Name</td>
        <td>phone</td>
        </tr>
    </thead>
    ${       
        storageUser.map((table) => {
        return `<tr>
            <td>${table.id}</td>
            <td>${table.name}</td>
            <td>${table.phone}</td>
        </tr>`
        })
    }`
    table.append(tableContent)
}


function tableCard() {
    const table = document.querySelector(`.${CARD}`)
    const tableContent = document.createElement('table')
    tableContent.classList.add('table_content')
    console.log(storageCard)
    tableContent.innerHTML = `
    <thead>
        <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Name book</td>
        <td>Date</td>
        </tr>
    </thead>
    ${       
        storageCard.map((table) => {
        return `<tr>
            <td>${table.id}</td>
            <td>${table.nameUser}</td>
            <td>${table.nameBook}</td>
            <td>${table.date}</td>
        </tr>`
        })
    }`
    table.append(tableContent)
}
