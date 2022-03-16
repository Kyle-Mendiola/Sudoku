class Game{
    static selectedNum = document.querySelector('input[name=number]:checked').value;
    static inputMode = document.querySelector('input[name=answermode]:checked').value;

    static prevMove = [];

    constructor(){
        document.getElementById("undo")
            .addEventListener('click', Game.undoLastMove);

        Game.initGame();
    }

    static get completed(){
        return Board.getFilledCells().length === 81 
            && Board.getBoardConflict().length === 0;
    }

    static undoLastMove(){
        if (Game.prevMove.length === 0){
            prr("Can't Undo any further");
            return;
        }

        const lastMove = Game.prevMove.pop();

        switch(lastMove.mode){
            case NOTEMODE:
                lastMove.cell.notes.fillNote(lastMove.value);

                if (lastMove.hasOwnProperty("prevValue")){
                    lastMove.cell.answerSlot.fillAnswer(lastMove.prevValue);
                }

                return

            case WRITEMODE:
                lastMove.cell.answerSlot.fillAnswer(lastMove.value);
                for (let notenumber of lastMove.filledNotes){
                    lastMove.cell.notes.fillNote(notenumber);
                }

                if (lastMove.hasOwnProperty("prevValue")){
                    lastMove.cell.answerSlot.fillAnswer(lastMove.prevValue);
                }

                for (let cell of lastMove.notes){
                    cell.notes.fillNote(lastMove.value);
                }

                return
            
            case ERASEMODE:
                if (lastMove.hasOwnProperty("prevValue")){
                    lastMove.cell.answerSlot.fillAnswer(lastMove.prevValue);
                    return;
                }
                lastMove.cell.resetCellDisplayState();

                for (let notenumber of lastMove.filledNotes){
                    lastMove.cell.notes.fillNote(notenumber);
                }
                return;
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

        for (let input of document.querySelectorAll('input.answermode')){
            new InputMode(input, input.value);
        }

        registerKeyboardEvents();
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

function registerKeyboardEvents(){
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case "ArrowUp":
                NumberButton.cycleToPrevNumber();
                break;
            case "ArrowDown":
                NumberButton.cycleToNextNumber();
                break;
            case "ArrowLeft":
                InputMode.cycleToPrevAnsMode();
                break;
            case "ArrowRight":
                InputMode.cycleToNextAnsMode();
                break;
        }
    });
}