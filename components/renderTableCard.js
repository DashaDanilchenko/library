import { CARD,  storageCard} from "../index.js"

export function tableCard() {
    const table = document.querySelector(`.${CARD}`)
    const tableContent = document.createElement('table')
    tableContent.classList.add('table_content')
    console.log(storageCard)
    tableContent.innerHTML = `
    <thead>
        <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Name book</td>
        <td>Date</td>
        </tr>
    </thead>
    ${       
        storageCard.map((table) => {
        return `<tr>
            <td>${table.id}</td>
            <td>${table.nameUser}</td>
            <td>${table.nameBook}</td>
            <td>${table.date}</td>
        </tr>`
        })
    }`
    table.append(tableContent)
}

