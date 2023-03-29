import { tableBook } from "./book/tableBook.js";
import { tableUser } from "./user/tableUser.js";
import { tableCard } from "./card/tableCard.js";

export function searchTable(page, arr, tableContent) {
    if (tableContent) {
        tableContent.innerHTML = ''
    }
    switch (page) {
        case 'book':
          tableBook(arr, tableContent)
          break;
        case 'user':
          tableUser(arr, tableContent);
          break;
        case 'card':
          tableCard(arr, tableContent);
          break;
        default:
          console.log('not data');
      }
}