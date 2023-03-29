import { collectData, dataSelectUser, dataSelectBook } from "./index.js"

export function selectorCard(formCreate, nameUser='', nameBook='', date='') {
    collectData()
    return formCreate.innerHTML = 
    `<label for="nameUser">nameUser: <select id="nameUser">
    ${       
        dataSelectUser.map((item) => {
            return item === nameUser
            ?`<option selected=“selected”>${item}</option>`
            :`<option>${item}</option>`
         }).join('')
    }       
        </select>
    </label>
    <label for="nameBook">nameBook: <select id="nameBook">
    ${       
        dataSelectBook.map((item) => {
            return item === nameBook
            ?`<option selected=“selected”>${item}</option>`
            :`<option>${item}</option>`
         }).join('')
    }       
        </select>
    </label>
    <label for="date">date :  <input type="text" id="date" value=${date}></label>`

}