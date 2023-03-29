import { searchTable } from "./searchTable.js";

export function searchArr(searchDate, arr, page , tableContent) {
    let keySearch
    switch (page) {
        case 'book':
            keySearch = 'name';
          break;
        case 'user':
            keySearch = 'name';
          break;
        case 'card':
            keySearch = 'nameUser';
          break;
        default:
          console.log('not data');
      }
    let arrSearch = arr.filter((item) => (item[`${keySearch}`].toLowerCase()).includes((`${searchDate}`.toLowerCase()))) || []
    searchTable(page, arrSearch, tableContent) 
}