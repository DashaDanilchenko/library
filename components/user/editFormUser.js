import { editUser } from "../index.js"
import { deleteForm } from "../deleteForm.js"

export function editFormUser(user) {
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