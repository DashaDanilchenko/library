import { USER,  storageUser} from "../index.js"

export function tableUser() {
    const table = document.querySelector(`.${USER}`)
    const tableContent = document.createElement('table')
    tableContent.classList.add('table_content')
    console.log(storageUser)
    tableContent.innerHTML = `
    <thead>
        <tr>
        <td>ID</td>
        <td>Name</td>
        <td>phone</td>
        </tr>
    </thead>
    ${       
        storageUser.map((table) => {
        return `<tr>
            <td>${table.id}</td>
            <td>${table.name}</td>
            <td>${table.phone}</td>
        </tr>`
        })
    }`
    table.append(tableContent)
}

