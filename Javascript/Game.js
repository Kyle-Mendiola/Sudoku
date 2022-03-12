class Game{
    static selectedNum = document.querySelector('input[name=number]:checked').value;
    static inputMode = document.querySelector('input[name=answermode]:checked').value;

    static prevMove = [];

    constructor(){
        registerInputEvents();
        document.getElementById("undo").addEventListener('click', Game.undoLastMove);

        Game.initGame();
    }

    static undoLastMove(){
        let move = Game.prevMove.pop();
        let cell = move.get('cell');
        let filledNotes = [];
        for (let note of move.get('notes')){
            if (note.innerHTML.length != 0){
                filledNotes.push(note);
            }
        }
        if (move.get('mode') == WRITEMODE){
            if (move.get('value') != 0){
                cell.fillAnswer(move.get('value'));
            }
            cell.updateAnswer('');
            cell.updateCellDisplayState();
        }
        else{
            // cell.answercell.innerHTML = "";
            // for (let note of filledNotes){
            //     note.innerHTML = 
            // }
            pr(filledNotes);
        }
    }

    static initGame(){
        for (let rowindex = 1; rowindex <= 9; rowindex++) {
            for (let colindex = 1; colindex <= 9; colindex++) {
                let cell = Game.getCell(rowindex, colindex);
                Board.allCells.push(new Cell(cell, rowindex, colindex));
            }
        }
        for (let input of document.querySelectorAll('input.number')){
            new NumberButton(input);
        }
    }

    /**
     * @param  {int} row x location of the cell; starts at 1 (topmost)
     * @param  {int} col y location of the cell; starts at 1 (leftmost)
     * @returns          ul object at location (row, col)
     */
    static getCell(row, col){
        return document.querySelector(`.r${row}.c${col}`);
    }
}

function updateSelectedNum(e) {
    Game.selectedNum = e.currentTarget.value;
}

function updateInputMode(e) {
    Game.inputMode = e.currentTarget.value;
}

function registerInputEvents(){
    inputs = document.querySelectorAll('input[type="radio"].answermode');
    for (const i of inputs){
        i.addEventListener('click', updateInputMode);
    }
}