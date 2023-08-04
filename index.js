const BODY_CONTAINER = document.getElementById("__bodyContainer__")
const OPTION_CONTAINER = document.getElementById("__optionContainer__")
const CANVAS = document.getElementById("__canvas__")
const GRID_SLIDER = document.getElementById("__gridSlider__")
const EDIT_BUTTON = document.getElementById("__editButton__")
const ERASE_BUTTON = document.getElementById("__eraseButton__")
const RANDOM_BUTTON = document.getElementById("__randomButton__")
const CLEAR_BUTTON = document.getElementById("__clearButton__")
const CURRENT_COLOR = document.getElementById("__currentColor__")
const COLOR_PICKER_BUTTON = document.getElementById('__colorPickerButton__');
const COLOR_PICKER = document.getElementById("__colorPicker__")

let  CURRENT_MODE = ""

// READY

setCanvas(8)
selectButton(EDIT_BUTTON)
CURRENT_MODE = EDIT_BUTTON.dataset.mode
CURRENT_COLOR.style.backgroundColor = COLOR_PICKER.value

// FUNCTIONS

function setCanvas(grid_size){
    // Clear canvas
    CANVAS.replaceChildren()

    // Prepare columns
    CANVAS.style.gridTemplateColumns = `repeat(${grid_size}, minmax(5px, 1fr))`
    CANVAS.style.gridTemplateRows = `repeat(${grid_size}, minmax(5px, 1fr))`
    
    // Add cells to canvas
    grid_size *= grid_size
    for(let i = 0; i < grid_size; i++){
        const DIV = document.createElement("div")
        DIV.classList.add("cell")
        CANVAS.appendChild(DIV)
    };
};

function paintCell(cell){
    if (CURRENT_MODE === "EDIT"){
        cell.style.backgroundColor = COLOR_PICKER.value
        return
    } else if (CURRENT_MODE === "ERASE"){
        cell.style.backgroundColor = "white"
        return
    } else if (CURRENT_MODE === "RANDOM"){
        cell.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        return
    };
};

function selectButton(button){
    let button_selected = document.querySelector(".selected")
    if(button_selected !== null){
        button_selected.classList.remove("selected")
    };
    button.classList.add("selected")
};

// EVENTS
addEventListener("mousemove", (event) => {
    let target = event.target
    let is_cell = target.classList.contains("cell")
    let button = event.button
    let buttons = event.buttons
    
    if(is_cell && button === 0 && buttons === 1){
        paintCell(target)
    };
});

addEventListener("mousedown", (event) => {
    let target = event.target
    let is_cell = target.classList.contains("cell")
    let button = event.button
    let buttons = event.buttons
    
    if(is_cell && button === 0 && buttons === 1){
        paintCell(target)
    };
});

EDIT_BUTTON.addEventListener("click", (event) => {
    CURRENT_MODE = EDIT_BUTTON.dataset.mode
    selectButton(EDIT_BUTTON)
});

ERASE_BUTTON.addEventListener("click", (event) => {
    CURRENT_MODE = ERASE_BUTTON.dataset.mode
    selectButton(ERASE_BUTTON)
});

RANDOM_BUTTON.addEventListener("click", (event) => {
    CURRENT_MODE = RANDOM_BUTTON.dataset.mode
    selectButton(RANDOM_BUTTON)
});

COLOR_PICKER_BUTTON.addEventListener('click', (event) => {
    COLOR_PICKER.click();
});

COLOR_PICKER.addEventListener('input', (event) => {
    CURRENT_COLOR.style.backgroundColor = COLOR_PICKER.value
});

CLEAR_BUTTON.addEventListener('click', (event) => {
    GRID_SLIDER.dispatchEvent(new Event("input"));
});

GRID_SLIDER.addEventListener("input", (event) => {
    switch(parseInt(GRID_SLIDER.value)){
        case 0:
            setCanvas(8)
            break;
        case 1:
            setCanvas(16)
            break;
        case 2:
            setCanvas(32)
            break;
        case 3:
            setCanvas(64)
            break;
    };
});