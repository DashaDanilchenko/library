export function saveMemory(arrInLocalStorage, page) {
    localStorage.setItem(`${page}`, JSON.stringify(arrInLocalStorage))
}