class Game{
    static selectedNum = document.querySelector('input[name=number]:checked').value;
    static inputMode = document.querySelector('input[name=answermode]:checked').value;
}

function updateSelectedNum(e) {
    Game.selectedNum = e.currentTarget.value;
}

function updateInputMode(e) {
    Game.inputMode = e.currentTarget.value;
}

