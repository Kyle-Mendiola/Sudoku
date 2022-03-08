class NumberButton {

    static numBtnList = [];
    static prevValue = 1;

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

    #registerEvents(){
        const obj = this;
        this.numbtn.addEventListener("change", function(e) { obj.highlightCells(e); });
        this.numbtn.addEventListener('click', this.updateSelectedNum);
    }

    highlightCells(e){
        let filledCells = Board.getFilledCells();
        pr(this);
        for (let cell of filledCells){
            if (cell.answercell.innerHTML == this.value){
                cell.answercell.classList.add("highlighted");
                continue;
            }
            cell.answercell.classList.remove("highlighted");
        }
    }

    updateSelectedNum(e) {
        NumberButton.prevValue = 
        Game.selectedNum = e.currentTarget.value;
    }

    isNumberCompleted() {
        let counter = 0;
        for (let cell of Board.getFilledCells()) {
            if (cell.answercell.innerHTML == this.value) {
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
}
