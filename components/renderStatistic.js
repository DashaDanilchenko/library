import { dataSelectBookCard, dataSelectUserCard, collectData } from "./index.js"

export function renderStatistic() {
    const btnBookActive = document.querySelector("#book_btn")
    const btnUserActive = document.querySelector("#user_btn")
    const btnCardActive = document.querySelector("#card_btn")
    const btnStatisticActive = document.querySelector("#statistic_btn")
    btnStatisticActive.classList.add('active')
    btnBookActive.classList.remove('active');
    btnUserActive.classList.remove('active');
    btnCardActive.classList.remove('active');
    collectData()
    let user = 'not active visitor'
    let book = 'not popular book'
    dataSelectBookCard.sort((a, b) => {
        if (a === b) {
           book = a
        }
    })
    dataSelectUserCard.sort((a, b) => {
        if (a === b) {
            user = a
        }
    })
    render.innerHTML = ""
    let section = document.createElement('section')
    section.classList.add('statistic')
    section.innerHTML = `
    <p><span>Active visitor :</span> ${user}</p>
    <p><span>Popular book :</span> ${book}</p>`
    render.appendChild(section)
}