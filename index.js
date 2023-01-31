
const bookData = ['name', 'nameAuthor', 'year', 'numPage', 'numInLibrary']
let arrLBooks = []
let storageBooks = JSON.parse(localStorage.getItem('arrLBooks')) || []

function str_gen(num) {
    allStr = '123456789';
    let str = '';
    for (let i = 0; i < num; i++) {
        let pos = Math.floor(Math.random() * allStr.length);
        str += allStr.substring(pos,pos+1);
    }
    return str;
}

function deleteForm(element) {
    element.remove()
}

function createInfo(arr) {
    let obj = {}
    obj.id = str_gen(5)
    arr.map((i) => {
        obj[`${i}`]= document.querySelector(`#${i}`).value
    })
    return obj
}

function sendInfo(info) {
    let objectInfo = createInfo(info)
    arrLBooks.push(objectInfo)
    saveMemory()
}

function createForm(data) {
    const formContainer = document.createElement('div')
    formContainer.classList.add('formModal')
    document.body.append(formContainer)
    const close = document.createElement('div')
    close.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
    formContainer.append(close)
    const formCreate = document.createElement('form')
    formCreate.classList.add('formContext')
    formCreate.innerHTML = `${
        data.map((item) => {
            return `<label for="${item}">${item}:<input type="text" id="${item}"></label>`
         }).join('')
    }`
    formContainer.append(formCreate)
    const sendData = document.createElement("div")
    sendData.innerHTML = 'Send'
    formCreate.append(sendData)
    sendData.addEventListener('click', (()=> sendInfo(data)))
    close.addEventListener('click', (()=> deleteForm(formContainer)))
}

createForm(bookData)

function saveMemory() {
    localStorage.setItem('arrLBooks', JSON.stringify(arrLBooks))
}

console.log(storageBooks)
// localStorage.clear()

const newBookBtn = document.querySelector('new_book')
newBookBtn.addEventListener('click', createBook)