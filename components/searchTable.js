import { tableCard, tableUser } from "./index.js";
import { tableBook } from "./book/tableBook.js";

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