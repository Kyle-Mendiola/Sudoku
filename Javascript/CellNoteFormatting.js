/* #region  Getters */

/**
 * @param  {int} row x location of the cell; starts at 1 (topmost)
 * @param  {int} col y location of the cell; starts at 1 (leftmost)
 * @returns          ul object at location (row, col)
 */
function getCell(row, col){
    return document.querySelector(`.r${row}.c${col}`);
}

function getAnswerMode(){
    return document.querySelector('input[name="answermode"]:checked').value;
}

/* #endregion */