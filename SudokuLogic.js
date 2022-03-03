function isAnswerValid(cell) {
    let conflictingCells = [];
    if (isRowIntersected(cell)) {
        conflictingCells.push(isRowIntersected(cell));
    }
    else if(isColumnIntersected(cell)){
        return false;
    }
    else if(isGridDuplicate(cell)){
        return false;
    }

    if (conflictingCells.length > 0){
        return conflictingCells;
    }
    return true;
}

function getConflictingCells(cell) {
    let conflictingCells = [
        isRowIntersected(cell),
        isColumnIntersected(cell),
        isGridDuplicate(cell)
    ];
    conflictingCells = spreadArray(conflictingCells);

    conflictingCells = conflictingCells.filter(a => a !== false);
    if (conflictingCells.length > 0){
        return conflictingCells;
    }
    return false;
}


function getBoardConflict(){
    let filledCells = getFilledCells();
    let conflictingCells = [];
    for (let index = 0; index < filledCells.length; index++) {
        let currentCellConflict = getConflictingCells(filledCells[index]);
        if (currentCellConflict){
            conflictingCells.push(...currentCellConflict);
        }
    }
    conflictingCells = removeArrayDuplicates(conflictingCells);
    if (conflictingCells.length > 0){
        return conflictingCells;
    }
    return false;
}

function isRowIntersected(cell){
    let answer = cell.answercell.innerHTML;
    let conflictingCells = [];
    let rowmates = getRelativeCells(cell, 0);
    for (let index = 1; index <= 9; index++) {
        let cellToCompare = getCell(index, cell.column);
        if (cellToCompare === cell){
            continue;
        }

        let answerToCompare = cellToCompare.answercell.innerHTML;
        if (answer === answerToCompare){
            conflictingCells.push(cellToCompare);
        } 
    }
    if (conflictingCells.length > 0){
        return conflictingCells;
    }
    return false;
}

function isColumnIntersected(cell) {
    let answer = cell.answercell.innerHTML;
    let conflictingCells = [];
    for (let index = 1; index <= 9; index++) {
        let cellToCompare = getCell(cell.row, index);
        if (cellToCompare === cell){
            continue;
        }

        let answerToCompare = cellToCompare.answercell.innerHTML;
        if (answer === answerToCompare){
            conflictingCells.push(cellToCompare);
        } 
    }
    if (conflictingCells.length > 0){
        return conflictingCells;
    }
    return false;
}

function isGridDuplicate(cell){
    let answer = cell.answercell.innerHTML;
    let parentGrid = cell.parentElement.children;
    let conflictingCells = [];
    for (let index = 0; index < 9; index++) {
        let cellToCompare = parentGrid[index];
        if (cellToCompare === cell){
            continue;
        }
        
        let answerToCompare = cellToCompare.answercell.innerHTML;
        if (answer === answerToCompare){
            conflictingCells.push(cellToCompare);
        }
    }
    if (conflictingCells.length > 0){
        return conflictingCells;
    }
    return false;
}

function getRelativeCells(targetCell, relation){
    if (relation === undefined){
        let relatedCells = [];
        for (let rCell of getRowMates(targetCell)){
            relatedCells.push(rCell);
        }
        for (let cCell of getColumnMates(targetCell)){
            relatedCells.push(cCell);
        }
        for (let gCell of getGridMates(targetCell)){
            relatedCells.push(gCell);
        }
        return removeArrayDuplicates(relatedCells);
    }
    if (relation === ROW){
        return getRowMates(targetCell);
    }
    if (relation === COLUMN){
        return getColumnMates(targetCell);
    }
}

function getRowMates(targetCell){
    let rowmates = [];
    for (let index = 1; index <= 9; index++) {
        let currentCell = getCell(targetCell.row, index);
        if (currentCell === targetCell){
            continue;
        }
        rowmates.push(currentCell);
    }
    return rowmates;
}

function getColumnMates(targetCell){
    let columnmates = [];
    for (let index = 1; index <= 9; index++) {
        let currentCell = getCell(index, targetCell.column);
        if (currentCell === targetCell){
            continue;
        }
        columnmates.push(currentCell);
    }
    return columnmates;
}

function getGridMates(targetCell){
    let gridmates = [];
    let parentGrid = targetCell.parentElement.children;
    for (let currentCell of parentGrid) {
        if (currentCell === targetCell){
            continue;
        }
        gridmates.push(currentCell);
    }
    return gridmates;
}