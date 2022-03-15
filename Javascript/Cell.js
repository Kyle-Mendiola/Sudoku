const ROW = 0; const COLUMN = 1; const GRID = 2;
const NOTEMODE = 1; const WRITEMODE = 0; const ERASEMODE = 2;

class Cell{
    constructor(element, row, column){
        this.element = element;
        this.row = row;
        this.column = column;
        this.answerSlot = new AnswerSlot(this);
        this.notes = new Notes(this);

        this.#registerEvents();

    }

    get filled(){
        return this.answerSlot.answer.length > 0;
    }

    get empty(){
        return (!this.filled) && 
               (this.notes.getFilledNotes().length === 0);
    }

    get answer(){
        return this.answerSlot.answer;
    }

    clearCell(){
        this.notes.clearNotes();
        this.resetCellDisplayState();
        if(this.filled){
            this.answerSlot.updateReplacedAnswer(this.answerSlot.liAnswerSlot.innerHTML);
        }
    }

    resetCellDisplayState(){
        this.notes.hideNoteDisplay();
        this.answerSlot.liAnswerSlot.classList.add('hidden');
    }

    updateCellDisplayState(){
        this.notes.clearNotes();
        this.notes.toggleNoteDisplay();
        this.answerSlot.liAnswerSlot.classList.toggle('hidden');
    }

    getConflictCells(relation){
        if (!this.filled){
            return false
        }

        let conflictingCells = [];
        let comparingCells = this.getRelativeCells(relation);
        for (let objCell of comparingCells) {
            let answerToCompare = objCell.answerSlot.answer;
            if (answerToCompare === this.answerSlot.answer){
                conflictingCells.push(objCell);
            } 
        }

        return conflictingCells;
    }

    getRelativeCells(){
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

    registerLastMove(){
        const lastMove = { 
            cell: this,
            value: Game.selectedNum
        }

        let inputMode = parseInt(Game.inputMode);

        if (this.filled) { 
            lastMove.prevValue = this.answer; 
        }

        switch(inputMode){
            case WRITEMODE:
                lastMove.mode = WRITEMODE;

                const affectedCells = [];
                for (let relCell of this.getRelativeCells()){
                    if (relCell.notes.getNote(lastMove.value).innerHTML === Game.selectedNum){
                        affectedCells.push(relCell);
                    }
                }
                lastMove.notes = affectedCells;

                lastMove.filledNotes = this.notes.getFilledNotes();

                break;

            case NOTEMODE:
                lastMove.mode = NOTEMODE;
    
                break;

            case ERASEMODE:
                lastMove.mode = ERASEMODE;

                lastMove.filledNotes = this.notes.getFilledNotes();
                break;
        }

        Game.prevMove.push(lastMove);
    }

//#region Event Listeners
    fillCell(e){
        let targetCell = Board.getCellByElem(e.currentTarget);
        if (Game.inputMode == NOTEMODE){
            targetCell.registerLastMove();
            targetCell.notes.fillNote(Game.selectedNum);
            return;
        }
        if (Game.inputMode == WRITEMODE){
            targetCell.registerLastMove();
            targetCell.answerSlot.fillAnswer(Game.selectedNum);
            return;
        }
        if (Game.inputMode == ERASEMODE){
            if (!targetCell.empty) {
                targetCell.registerLastMove();
            }
            targetCell.clearCell();
            return;
        }
    }

    hoveron(e){
        for (let cell of this.#getRowMates()){
            cell.element.classList.add('relativeCell');
        }
        for (let cell of this.#getColumnMates()){
            cell.element.classList.add('relativeCell');
        }
    }

    hoveroff(e){
        for (let cell of this.#getRowMates()){
            cell.element.classList.remove('relativeCell');
        }
        for (let cell of this.#getColumnMates()){
            cell.element.classList.remove('relativeCell');
        }
    }

//#endregion

//#region Private Methods
    #registerEvents(){
        const obj = this;
        this.element.addEventListener("click", obj.fillCell);
        this.element.addEventListener("mouseenter", function(e) { obj.hoveron(e); });
        this.element.addEventListener("mouseleave", function(e) { obj.hoveroff(e); });
    }

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
}

//#endregion