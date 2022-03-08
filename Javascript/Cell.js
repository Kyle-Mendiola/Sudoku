const ROW = 0; const COLUMN = 1; const GRID = 2;
const NOTEMODE = 0; const WRITEMODE = 1;

class Cell{
    constructor(element, row, column){
        this.element = element;
        this.row = row;
        this.column = column;
        this.answercell = '';
        this.notes = []

        this.#addChildren();

        this.element.addEventListener("click", this.fillCell);
        this.registerEvent();

    }
    hov(e){
        for (let cell of this.#getRowMates()){
            cell.element.classList.add('relativeCell');
        }
        for (let cell of this.#getColumnMates()){
            cell.element.classList.add('relativeCell');
        }
    }

    hovoff(e){
        for (let cell of this.#getRowMates()){
            cell.element.classList.remove('relativeCell');
        }
        for (let cell of this.#getColumnMates()){
            cell.element.classList.remove('relativeCell');
        }
    }

    registerEvent(){
        const obj = this;
        this.element.addEventListener("mouseenter", function(e) { obj.hov(e); });
        this.element.addEventListener("mouseleave", function(e) { obj.hovoff(e); });
    }

    isFilled(){
        if (this.answercell.innerHTML.length === 0){
            return false;
        }
        return true;
    }

    eraseRelativeNotes(number){
        let relatedCells = this.getRelativeCells();
        for (let cell of relatedCells){
            cell.getNote(number).innerHTML = "";
        }
    }

    clearNotes(){
        for (const note of this.notes){
            note.innerHTML = "";
        }
    }

    fillNote(number){
        let note = this.getNote(number);
        if (!this.isFilled()){
            if (note.innerHTML === ""){
                note.innerHTML = number;
                return
            }
            note.innerHTML = "";
            return
        }
        this.updateCellDisplayState();
        this.answercell.innerHTML = "";
        note.innerHTML = number;
        Board.markBoardConflict();
    }

    fillAnswer(number){
        let answer = this.answercell;
        let objInput = NumberButton.getNumBtn(number);
        if (this.isFilled()){
            if (answer.innerHTML === number){
                this.updateCellDisplayState();
                this.updateAnswer("");
                objInput.updateNumberState();
                return;
            }
            this.updateReplacedAnswer(answer.innerHTML);
            this.eraseRelativeNotes(number);
            this.updateAnswer(number);
            objInput.updateNumberState();
            return;
        }
        this.updateCellDisplayState();
        this.updateAnswer(number);
        this.eraseRelativeNotes(number);
        objInput.updateNumberState();
    }

    fillCell(e){
        let targetCell = Board.getCellByElem(e.currentTarget);
        if (getAnswerMode() == NOTEMODE){
            targetCell.fillNote(Game.selectedNum);
            return
        }
        if (getAnswerMode() == WRITEMODE){
            targetCell.fillAnswer(Game.selectedNum);
            return
        }
    }

    updateAnswer(answer){
        let updatedAns = this.answercell.innerHTML;
        if (updatedAns == ""){
            this.answercell.classList.add("highlighted");
        }
        this.answercell.innerHTML = answer;
        Board.markBoardConflict();
    }

    updateReplacedAnswer(replacednum){
        let replacedNumObj = NumberButton.getNumBtn(replacednum);

        this.answercell.innerHTML = "";

        replacedNumObj.updateNumberState();
    }

    toggleNoteDisplay(){
        for (let note of this.notes){
            note.classList.toggle('hidden')
        }
    }

    updateCellDisplayState(){
        this.clearNotes();
        this.toggleNoteDisplay();
        this.answercell.classList.toggle('hidden');
    }

    getNote(number){
        return this.element.querySelector(`.note${number}`);
    }

    getConflictCells(relation){
        if (this.answercell.innerHTML.length === 0){
            return false
        }
        let conflictingCells = [];
        let comparingCells = this.getRelativeCells(relation);
        for (let objCell of comparingCells) {
            let answerToCompare = objCell.answercell.innerHTML;
            if (answerToCompare === this.answercell.innerHTML){
                conflictingCells.push(objCell);
            } 
        }
        return conflictingCells;
    }

    getRelativeCells(relation){
        if (relation === undefined){
            let relatedCells = [];
            for (let rCell of this.#getRowMates()){
                relatedCells.push(rCell);
            }
            for (let cCell of this.#getColumnMates()){
                relatedCells.push(cCell);
            }
            for (let gCell of this.#getGridMates()){
                relatedCells.push(gCell);
            }
            return removeArrayDuplicates(relatedCells);
        }
        if (relation === ROW){
            return this.#getRowMates();
        }
        if (relation === COLUMN){
            return this.#getColumnMates();
        }
        if (relation === GRID){
            return this.#getGridMates();
        }
    }

//#region Private Methods

    #getRowMates(){
        let rowmates = [];
        for (let index = 1; index <= 9; index++) {
            let objCell = Board.getCell(this.row, index);
            if (objCell === this){
                continue;
            }
            rowmates.push(objCell);
        }
        return rowmates;
    }

    #getColumnMates(){
        let colmates = [];
        for (let index = 1; index <= 9; index++) {
            let objCell = Board.getCell(index, this.column);
            if (objCell === this){
                continue;
            }
            colmates.push(objCell);
        }
        return colmates;
    }

    #getGridMates(){
        let gridmates = [];
        let parentGrid = this.element.parentElement.children;
        for (let currentCell of parentGrid) {
            let objCell = Board.getCellByElem(currentCell);
            if (objCell === this){
                continue;
            }
            gridmates.push(objCell);
        }
        return gridmates;
    }

    #addChildren(){
        for (let notenumber = 1; notenumber <= 9; notenumber++) {
            let listElement = document.createElement('li');
            listElement.setAttribute('class', `note note${notenumber}`);
            this.element.appendChild(listElement);
            this.notes.push(listElement);
        }
        let answerCell = document.createElement("li");
        answerCell.setAttribute('class', 'answercell hidden');
        this.element.appendChild(answerCell);
        this.answercell = answerCell;
    }
}

//#endregion