class AnswerSlot{
    constructor(parentCell){
        this.parentCell = parentCell;
        this.liAnswerSlot = this.createAnswerSlot();

        this.parentCell.element.appendChild(this.liAnswerSlot);
    }

    get answer(){
        return this.liAnswerSlot.innerHTML;
    }

    set answer(answer){
        this.liAnswerSlot.innerHTML = answer;
    }

    createAnswerSlot(){
        let answerSlot = document.createElement("li");
        answerSlot.setAttribute('class', 'answercell hidden');
        return answerSlot;
    }

    fillAnswer(number){
        // let answer = this.answer;
        let objInput = NumberButton.getNumBtn(number);
        if (this.parentCell.filled){
            if (this.answer === number){
                this.updateAnswer("");
                this.parentCell.notes.clearNotes();
                this.parentCell.resetCellDisplayState();
                objInput.updateNumberState();
                return;
            }
            this.updateReplacedAnswer(this.answer);
            this.parentCell.notes.eraseRelativeNotes(number);
            this.updateAnswer(number);
            objInput.updateNumberState();
            return;
        }
        this.parentCell.updateCellDisplayState();
        this.updateAnswer(number);
        this.parentCell.notes.eraseRelativeNotes(number);
        objInput.updateNumberState();
    }

    highlightAnswer(){
        if (!this.parentCell.filled){
            this.liAnswerSlot.classList.add("highlighted");
        }
    }

    updateAnswer(answer){
        this.highlightAnswer();
        this.answer = answer;
        Board.markBoardConflict();
    }

    updateReplacedAnswer(replacednum){
        let replacedNumObj = NumberButton.getNumBtn(replacednum);

        this.answer = "";

        replacedNumObj.updateNumberState();
    }
}