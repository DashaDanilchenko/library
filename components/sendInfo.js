import { arrLBooks, arrLUsers, arrCards } from './index.js'
import { BOOK, USER, CARD, bookData, userData, cardData } from "./data.js"
import { createInfo } from "./createInfo.js"
import { saveMemory } from "./saveMemory.js"
import { renderElement } from './renderElement.js'

export function sendInfo(arrData, arrInLocalStorage, page) {
    let objectInfo = createInfo(arrData)
    arrInLocalStorage.push(objectInfo)
    saveMemory(arrInLocalStorage, page)
    switch (page) {
        case 'book':
            renderElement(BOOK, bookData, arrLBooks);
          break;
        case 'user':
            renderElement(USER, userData, arrLUsers);
          break;
        case 'card':
            renderElement(CARD, cardData, arrCards);
          break;
        default:
          console.log('not data');
      }
}