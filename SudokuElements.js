const ROW = 0; const COLUMN = 1; 
const GRID = 2; const ALL = 3;

/**
 * Add 9 note<li> and 1 answer<li> child elements to all <ul>
 */
function addListElements(){
    let cells = document.querySelectorAll("ul.cell");
    for (let index = 0; index < cells.length; index++) {
        for (let notenumber = 1; notenumber <= 9; notenumber++) {
            listElement = document.createElement('li');
            listElement.setAttribute('class', `note note${notenumber}`);
            cells[index].appendChild(listElement);
        }
        answerCell = document.createElement("li");
        answerCell.setAttribute('class', 'answercell');
        cells[index].appendChild(answerCell);
    }  
}

/**
 * Assign all needed events to elements
 */
function assignEvents(){
    for (let rowindex = 1; rowindex <= 9; rowindex++) {
        for (let colindex = 1; colindex <= 9; colindex++) {
            let cell = getCell(rowindex, colindex);
            cell.row = rowindex;
            cell.column = colindex;
            cell.rowmates = getRowMates(cell);
            cell.columnmates = getColumnMates(cell);
            cell.answercell = cell.querySelector(".answercell");
            cell.addEventListener("click", fillCell);
        }
    }
    document.getElementById("clear").addEventListener = ("click", cleanNotes);
}

function isDisplayNone(element){
    return window.getComputedStyle(element).display === "none";
}

function removeArrayDuplicates(arr){
    return [...new Set(arr)];
}
/**
 * @param  {} arr array to split content arrays;
 * Splits the array contents inside arr
 */
function spreadArray(arr){
    let splitArray = [];
    if (Array.isArray(arr)){
        for (let index = 0; index < arr.length; index++) {
            for(let sub = 0; sub < arr[index].length; sub++){
                splitArray.push(arr[index][sub]);
            }
        }
    }
    return splitArray;
}

function pr(sumtin){
    console.log(sumtin);
}