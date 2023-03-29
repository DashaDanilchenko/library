import { editBook } from "../index.js"
import { deleteForm } from "../deleteForm.js"

export function editFormBook(book) {
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