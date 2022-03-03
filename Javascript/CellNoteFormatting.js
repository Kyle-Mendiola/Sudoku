const NOTEMODE = 0; const WRITEMODE = 1;

/**
 * 
 * Next to work on : The number replaced
 * by another number does not get its 
 * corresponding input selection updated
 * 
 * Ex: 9 units of number [8], one of them gets
 * replaced with [1] or any number. The 8
 * on the input selection is still disabled
 *  
 */

function fillCell(e){
    let number = document.querySelector('input[name="number"]:checked').value;
    let targetCell = e.currentTarget;
    if (getAnswerMode() == NOTEMODE){
        fillNote(targetCell, number);
        return
    }   
    fillAnswer(targetCell, number);
}

function fillAnswer(cell, number){
    let answer = cell.answercell;
    if (isFilled(cell)){
        if (answer.innerHTML === number){
            updateCellDisplayState(cell);
            replaceAnswer(cell, "");
            updateNumberState(number);
            return;
        }
        eraseRelativeNotes(cell, number);
        replaceAnswer(cell, number);
        updateNumberState(number);
        return;
    }
    updateCellDisplayState(cell);
    replaceAnswer(cell, number);
    eraseRelativeNotes(cell, number);
    updateNumberState(number);
}

function replaceAnswer(cell, answer){
    cell.answercell.innerHTML = answer;
    markBoardConflicts();
}

function eraseRelativeNotes(cell, number) {
    for (let relCell of getRelativeCells(cell)){
        getNote(relCell, number).innerHTML = "";
    }
}

// Probs need refactoring 
function markBoardConflicts() {
    let boardConflicts = getBoardConflict();
    if (boardConflicts) {
        for (let index = 0; index < boardConflicts.length; index++) {
            boardConflicts[index].answercell.style.color = "red";
        }
        let filledCells = getFilledCells();
        for (let index = 0; index < filledCells.length; index++) {
            if(!boardConflicts.includes(filledCells[index])){
                filledCells[index].answercell.style.color = "black";
            }
        }
        return
    }
    let filledCells = getFilledCells();
    for (let index = 0; index < filledCells.length; index++) {
        filledCells[index].answercell.style.color = "black";    
    }
}

function fillNote(cell, number){
    let note = getNote(cell, number);
    if (!isFilled(cell)){
        if (note.innerHTML === ""){
            note.innerHTML = number;
            return
        }
        note.innerHTML = "";
        return
    }
    updateCellDisplayState(cell);
    note.innerHTML = number;
    markBoardConflicts(cell);
}

function updateNumberState(number) {
    let numberinput = document.getElementById(`no${number}`);
    if(isNumberCompleted(number)){
        numberinput.disabled = true;
    }else{
        numberinput.disabled = false;    
    }
    updateNumberLabel(number);
}

function updateNumberLabel(number){
    let numberinput = document.getElementById(`no${number}`);
    let labelnumber = document.querySelector(`label.no${number}`);
    if(numberinput.disabled){
        labelnumber.style.textDecoration = "line-through";
        changeSelectedNum();
        return
    }
    labelnumber.style.textDecoration = "none";
}

function changeSelectedNum(){
    let numSelection = document.querySelectorAll("input.number");
    pr(numSelection);
    for (let index = 0; index < 9; index++) {
        let currentInput = numSelection[index];
        if (currentInput.disabled){
            continue
        }
        currentInput.checked = true;
        break;
    }
}

function isNumberCompleted(number){
    let counter = 0;
    for (let cell of getFilledCells()){
        if(cell.answercell.innerHTML == number){
            counter = counter + 1;
        }
    }
    if (counter < 9) {
        return false;
    }
    return true;
}

function clearCell(cell){
    let notes = cell.querySelectorAll(".note");
    for (let index = 0; index < notes.length; index++) {
        notes[index].innerHTML = "";
    }
}

function hideNotes(cell){
    clearCell(cell);
    let notes = cell.querySelectorAll(".note");
    for (let index = 0; index < notes.length; index++) {
        notes[index].style.display = "none";
    }
}

function toggleNotesDisplay(cell){
    let notes = cell.querySelectorAll(".note");
    let isNotesHidden = isDisplayNone(notes[0]);
    if (isNotesHidden){
        for (let index = 0; index < notes.length; index++) {
            notes[index].style.display = "inline";
        }
        return
    }
    hideNotes(cell);
}

function toggleDisplay(element){
    if (isDisplayNone(element)){
        element.style.display = "inline-block";
        return
    }
    element.style.display = "none";
}

function updateCellDisplayState(cell){
    clearCell(cell);
    toggleNotesDisplay(cell);
    toggleDisplay(cell.answercell);
}

function unmarkConflictCells(cell) {
    let conflictingCells = getConflictingCells(cell);
}

function cleanNotes(){
    let notes = document.querySelectorAll("li.note");
    for (let index = 0; index < notes.length; index++){
        notes[index].innerHTML = "";  
    }
}

function isFilled(cell){
    return !isDisplayNone(cell.answercell);
}

/* #region  Getters */
/**
 * @param  {int} row x location of the cell; starts at 1 (topmost)
 * @param  {int} col y location of the cell; starts at 1 (leftmost)
 * @returns          ul object at location (row, col)
 */
 function getCell(row, col){
    return document.querySelector(`.r${row}.c${col}`);
}

function getFilledCells(){
    let cells = document.querySelectorAll(".cell");
    let filledCells = [];
    for (let index = 0; index < cells.length; index++) {
        if (isFilled(cells[index])){
            filledCells.push(cells[index]);
        }  
    }
    return filledCells;
}

function getAnswerMode(){
    return document.querySelector('input[name="answermode"]:checked').value;
}

function getNote(cell, number){
    return cell.querySelector(`.note${number}`);
}
/* #endregion */