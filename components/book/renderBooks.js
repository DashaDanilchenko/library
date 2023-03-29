import { deleteBook } from "../index.js"
import { editFormBook } from "./editFormBook.js"

export function renderBooks(book) {
    const tab = document.createElement('tr')
    tab.innerHTML = `
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.nameAuthor}</td>
            <td>${book.year}</td>
            <td>${book.numPage}</td>
            <td>${book.numInLibrary}</td>
            <td>${book.NamePublishingHouse}</td>
    `

    const deleteBookBtn = document.createElement('td')
    deleteBookBtn.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>'
    tab.append(deleteBookBtn)
    deleteBookBtn.addEventListener('click', () => deleteBook(book))

    const editBookBtn = document.createElement('td')
    editBookBtn.innerHTML = '<i class="fa-sharp fa-solid fa-pen-to-square"></i>'
    tab.append(editBookBtn)
    editBookBtn.addEventListener('click', () => editFormBook(book))

    return tab
}