import { CARD } from "../data.js"
import { renderCard } from "./renderCard.js"

export function tableCard(arr, tableContent) {
    const table = document.querySelector(`.${CARD}`)
    tableContent.innerHTML = `
    <thead>
        <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Name book</td>
        <td>Date</td>
        <td>Delete</td>
        <td>Edit</td>
        </tr>
    </thead>`
    table.append(tableContent)
    const cards = arr.map(renderCard)
    tableContent.append(...cards)
}