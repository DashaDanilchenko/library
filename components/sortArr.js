import { searchTable } from "./searchTable.js";

export function sortArr(sortData, arr, page, tableContent) {
    function compare (a, b) {
        if (a[`${sortData}`] > b[`${sortData}`]) {
            return 1;
          }
          if (a[`${sortData}`] < b[`${sortData}`]) {
            return -1;
          }
            return 0;
      }
    arr.sort(compare) 

    searchTable(page, arr, tableContent)
}