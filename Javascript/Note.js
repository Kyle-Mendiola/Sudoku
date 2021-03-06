class Notes{
    constructor(parentCell){
        this.parentCell = parentCell;
        this.notes = new Map();
        this.addNoteElements();
    }

    fillNote(number){
        let note = this.getNote(number);
        if (!this.parentCell.filled){
            if (note.innerHTML === ""){
                note.innerHTML = number;
                return;
            }
            note.innerHTML = "";
            return;
        }
        this.parentCell.updateCellDisplayState();
        this.parentCell.answerSlot.answer = "";
        note.innerHTML = number;
        Board.markBoardConflict();
    }

    forceFillNote(number){
        let note = this.getNote(number);
        if (!this.parentCell.filled){
 
            note.innerHTML = "";
            return;
        }
    }

    getNote(notenum){
        return this.notes.get(parseInt(notenum));
    }

    clearNotes(){
        this.notes.forEach((value) => {
            this.emptyNote(value)
        });
    }

    eraseRelativeNotes(number){
        let relatedCells = this.parentCell.getRelativeCells();
        for (let cell of relatedCells){
            this.emptyNote(cell.notes.getNote(number));
        }
    }

    toggleNoteDisplay(){
        this.notes.forEach((value) => {
            value.classList.toggle("hidden");
        });
    }

    getFilledNotes(){
        const filledNotes = [];
        this.notes.forEach((value) => {
            if (value.innerHTML.length > 0){
                filledNotes.push(parseInt(value.innerHTML));
            }
        });
        return filledNotes;
    }

    hideNoteDisplay(){
        this.notes.forEach((value) => {
            value.classList.remove("hidden");
        });
    }

    emptyNote(note){
        note.innerHTML = "";
    }

    addNoteElements(){
        for (let notenumber = 1; notenumber <= 9; notenumber++) {
            let newNote = this.createNoteElement(notenumber)
            this.notes.set(notenumber, newNote);
            this.parentCell.element.appendChild(newNote);
        }
    }

    createNoteElement(noteNum){
        let listElement = document.createElement('li');
        listElement.setAttribute('class', `note note${noteNum}`);
        return listElement;
    }
}