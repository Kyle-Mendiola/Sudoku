class InputMode{
    
    static allInputObject =  [];

    constructor(elem, mode){
        this.elem = elem;
        this.mode = mode;

        this.registerInputEvents();
    }

    updateInputMode(e) {
        Game.inputMode = e.currentTarget.value;
    }
    
    static cycleToNextAnsMode(){
        let inputs = document.querySelectorAll('input[type="radio"].answermode');
        let curInput = parseInt(Game.inputMode);
        curInput = (curInput === 2 ? 0 : curInput + 1);
        inputs[curInput].click();
    }
    
    static cycleToPrevAnsMode(){
        let inputs = document.querySelectorAll('input[type="radio"].answermode');
        let curInput = parseInt(Game.inputMode);
        curInput = (curInput === 0 ? 2 : curInput - 1);
        inputs[curInput].click();
    }
    
    registerInputEvents(){
        const obj = this;
        this.elem.addEventListener('click', function(e) { obj.updateInputMode(e); });
    }
}