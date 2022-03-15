class NumberButton {

    static numBtnList = [];

    constructor(numbtn) {
        this.numbtn = numbtn;
        this.value = numbtn.value;
        this.label = document.querySelector(`label.no${this.value}`);

        NumberButton.numBtnList.push(this);
        
        this.#registerEvents();
    }

    static getNumBtn(number) {
        for (let numbtn of NumberButton.numBtnList) {
            if (numbtn.value == number) {
                return numbtn;
            }
        }
    }

    static cycleToNextNumber(){
        let curNum = parseInt(Game.selectedNum);
        do {
            curNum = (curNum === 9 ? 1 : curNum + 1);
        } while (NumberButton.getNumBtn(curNum).disabled);
        NumberButton.getNumBtn(curNum).numbtn.click();
    }

    static cycleToPrevNumber(){
        let curNum = parseInt(Game.selectedNum);
        do {
            curNum = (curNum === 1 ? 9 : curNum - 1);
        } while (NumberButton.getNumBtn(curNum).disabled);
        NumberButton.getNumBtn(curNum).numbtn.click();
    }

    isNumberCompleted() {
        let counter = 0;
        for (let cell of Board.getFilledCells()) {
            if (cell.answerSlot.answer == this.value) {
                counter = counter + 1;
            }
        }
        if (counter < 9) {
            return false;
        }
        return true;
    }

    updateNumberState() {
        if (this.isNumberCompleted()) {
            this.numbtn.disabled = true;
        } else {
            this.numbtn.disabled = false;
        }
        this.updateNumberLabel();
    }

    updateNumberLabel() {
        if (this.numbtn.disabled) {
            this.label.classList.add("disabled");
            this.changeSelectedNum();
            return;
        }
        this.label.classList.remove("disabled");
    }

    changeSelectedNum() {
        for (let index = 0; index < 9; index++) {
            let currentInput = NumberButton.numBtnList[index];
            if (currentInput.numbtn.disabled) {
                continue;
            }
            currentInput.numbtn.click();
            Game.selectedNum = currentInput.value;
            break;
        }
    }
//#region Event Listeners
    highlightCells(e){
        let filledCells = Board.getFilledCells();
        for (let cell of filledCells){
            if (cell.answerSlot.answer == this.value){
                cell.answerSlot.liAnswerSlot.classList.add("highlighted");
                continue;
            }
            cell.answerSlot.liAnswerSlot.classList.remove("highlighted");
        }
    }

    updateSelectedNum(e) {
        Game.selectedNum = e.currentTarget.value;
    }
//#endregion

//#region Private Methods
    #registerEvents(){
        const obj = this;
        this.numbtn.addEventListener("change", function(e) { obj.highlightCells(e); });
        this.numbtn.addEventListener('click', this.updateSelectedNum);
    }
}
//#endregion
