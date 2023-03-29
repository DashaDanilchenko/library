import { BOOK } from "../data.js"
import { renderBooks } from "./renderBooks.js"

export function tableBook(arr, tableContent) {
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