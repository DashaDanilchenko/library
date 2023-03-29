import { USER } from "../data.js"
import { renderUser } from "./renderUser.js"

export function tableUser(arr, tableContent) {
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