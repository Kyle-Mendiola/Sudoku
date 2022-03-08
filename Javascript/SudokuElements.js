/**
 * Assign all needed events to elements
 */
function assignEvents(){
    for (let rowindex = 1; rowindex <= 9; rowindex++) {
        for (let colindex = 1; colindex <= 9; colindex++) {
            let cell = getCell(rowindex, colindex);
            Board.allCells.push(new Cell(cell, rowindex, colindex));
        }
    }
    for (let input of document.querySelectorAll('input.number')){
        new NumberButton(input);
    }
}

function isDisplayNone(element){
    return window.getComputedStyle(element).display === "none";
}

function removeArrayDuplicates(arr){
    return [...new Set(arr)];
}
/**
 * @param  {} arr array to split its inner arrays;
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
