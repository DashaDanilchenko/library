import { createForm } from "./createForm.js"
import { searchTable } from "./searchTable.js"
import { sortArr } from "./sortArr.js"
import { searchArr } from "./searchArr.js"

export function renderElement(page, arrData, arrInLocalStorage) {
    const btnBookActive = document.querySelector("#book_btn")
    const btnUserActive = document.querySelector("#user_btn")
    const btnCardActive = document.querySelector("#card_btn")
    const btnStatisticActive = document.querySelector("#statistic_btn")
    switch (page) {
        case 'book':
            btnBookActive.classList.add('active');
            btnUserActive.classList.remove('active');
            btnCardActive.classList.remove('active');
            btnStatisticActive.classList.remove('active');
          break;
        case 'user':
            btnUserActive.classList.add('active');
            btnBookActive.classList.remove('active');
            btnCardActive.classList.remove('active');
            btnStatisticActive.classList.remove('active');
          break;
        case 'card':
            btnCardActive.classList.add('active');
            btnBookActive.classList.remove('active');
            btnUserActive.classList.remove('active');
            btnStatisticActive.classList.remove('active');
          break;
        default:
            console.log('not data');
      }
   
    render.innerHTML = ""
    let section = document.createElement('section')
    section.classList.add(`${page}`)
    section.innerHTML = `
        <div>
                <span>All ${page}</span>
                <button id="new_${page}">New ${page}</button>
            </div>
            <hr>
            <div class="forms">
                <form>
                    <label for="sort_${page}"><select id="sort_${page}">
                    <option></option>   
                    <option>id</option>
                    ${       
                        arrData.map((item) => {   
                           return `<option>${item}</option>`
                         })
                    }  
                    </select></label>
                    <button id="sort_${page}_btn">Sort</button>
                </form>
                <form>
                <label for="search_${page}"><input type="text" id="search_${page}"></label>
                <button id="search_${page}_btn">Search</button>
            </form>
            </div>
    `
    render.appendChild(section)

    const tableContent = document.createElement('table')
    tableContent.classList.add('table_content')                

    const sortBtn = document.querySelector(`#sort_${page}_btn`)
    sortBtn.type = 'button'
    const sort = document.querySelector(`#sort_${page}`)
    sortBtn.addEventListener('click', (() => sortArr(sort.value, arrInLocalStorage, page, tableContent)))

    const searchBtn = document.querySelector(`#search_${page}_btn`)
    searchBtn.type = 'button'
    const search = document.querySelector(`#search_${page}`)
    searchBtn.addEventListener('click', (() => searchArr(search.value, arrInLocalStorage, page, tableContent)))

    searchTable(page, arrInLocalStorage, tableContent)

    let newContent = document.querySelector(`#new_${page}`)
    newContent.addEventListener('click', (()=> createForm(arrData, arrInLocalStorage, page)))
}