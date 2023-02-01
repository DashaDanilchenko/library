import { BOOK,  storageBooks} from "../index.js"

export function tableBook() {
    const table = document.querySelector(`.${BOOK}`)
    const tableContent = document.createElement('table')
    tableContent.classList.add('table_content')
    console.log(storageBooks)
    tableContent.innerHTML = `
    <thead>
        <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Name author</td>
        <td>Year publication</td>
        <td>Name publishing house</td>
        <td>number pages</td>
        <td>number in the library</td>
        </tr>
    </thead>
    ${       
        storageBooks.map((table) => {
        return `<tr>
            <td>${table.id}</td>
            <td>${table.name}</td>
            <td>${table.nameAuthor}</td>
            <td>${table.year}</td>
            <td>${table.numPage}</td>
            <td>${table.numInLibrary}</td>
            <td>${table.NamePublishingHouse}</td>
        </tr>`
        })
    }`
    table.append(tableContent)
}

