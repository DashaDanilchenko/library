import { deleteUser } from "../index.js"
import { editFormUser } from "./editFormUser.js"

export function renderUser(user) {
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