import { selectorCard } from "./selectorCard.js"
import { sendInfo } from "./sendInfo.js"
import { deleteForm } from "./deleteForm.js"

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