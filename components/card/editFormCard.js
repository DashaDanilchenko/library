import { returnBookInLibrary, editCard } from "../index.js"
import { selectorCard } from "../selectorCard.js"
import { deleteForm } from "../deleteForm.js"

export function editFormCard(card) {
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