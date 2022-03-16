class Board {

    static allCells = [];

    static getCell(row, column) {
        for (const cell of Board.allCells) {
            if (cell.row == row && cell.column == column) {
                return cell;
            }
        }
    }

    static getCellByElem(element) {
        for (const cell of Board.allCells) {
            if (cell.element === element) {
                return cell;
            }
        }
    }

    static clearBoard() {
        for (const cell of Board.allCells) {
            cell.answercell.innerHTML = "";
            cell.clearNotes();
        }
    }

    static getFilledCells() {
        let filledCells = [];
        for (const cell of Board.allCells) {
            if (cell.filled) {
                filledCells.push(cell);
            }
        }
        return filledCells;
    }

    static getBoardConflict(){
        let filledCells = Board.getFilledCells();
        let conflictingCells = [];
        for (let index = 0; index < filledCells.length; index++) {
            let currentCellConflict = filledCells[index].getConflictCells();
            if (currentCellConflict){
                conflictingCells.push(...currentCellConflict);
            }
        }
        conflictingCells = removeArrayDuplicates(conflictingCells);

        return conflictingCells;
    }

    static markBoardConflict(){
        let boardConflicts = Board.getBoardConflict();
        if (boardConflicts) {
            for (let index = 0; index < boardConflicts.length; index++) {
                boardConflicts[index].answerSlot.liAnswerSlot.classList.add("conflict");
            }
            let filledCells = Board.getFilledCells();
            for (let index = 0; index < filledCells.length; index++) {
                if(!boardConflicts.includes(filledCells[index])){
                    filledCells[index].answerSlot.liAnswerSlot.classList.remove("conflict");
                }
            }
            return
        }
        let filledCells = Board.getFilledCells();
        for (let index = 0; index < filledCells.length; index++) {
            boardConflicts[index].classList.remove("conflict");
        }
    }

    static preFillNumbers(numbers){
        for (let number of numbers){
            Board.getCell(number.row, number.col).answerSlot.permFillAnswer(number.value);
        }
    }
}
