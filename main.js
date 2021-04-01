const numButtons = document.getElementsByClassName('grid-item-num-btn')
const consoleDisplay = document.getElementsByClassName('grid-item-console')
const undoButton = document.getElementById('undo')
const clearButton = document.getElementById('clear')
const decimalButton = document.getElementById('decimal')
const display = {}
display.value = ''
display.lastChar = ''
display.decimalAllowed = true

add = (a,b) => a+b
subtract = (a,b) => a-b
multiply = (a,b) => a*b
divide = (a,b) => a/b
square = (a) => a**2
squareRoot = (a) => Math.sqrt(a)
percentage = (a) => a/100

operate = (operator,a,b) => window[operator](a,b)
updateDisplay = (valueToAdd) => {
    display.value += valueToAdd
    display.lastChar = valueToAdd
}
clearDisplay = (display) => display.value = ''

Array.from(numButtons).forEach(item => {
    item.addEventListener('click', event => {
        updateDisplay(event.target.innerHTML)
        consoleDisplay[0].innerHTML = display.value
    })
})

undoButton.addEventListener('click', event => {
    if(display.value !== '') {
        if(display.value.slice(-1) === ',') {
            display.decimalAllowed = true
        }
        display.value = display.value.slice(0,-1)
        display.lastChar = display.value.slice(-1)
        consoleDisplay[0].innerHTML = display.value
    }
})

clearButton.addEventListener('click', event => {
    if(display.value !== '') {
        display.value = ''
        display.lastChar = ''
        display.decimalAllowed = true
        consoleDisplay[0].innerHTML = display.value
    }
})

decimalButton.addEventListener('click', event => {
    if(display.decimalAllowed & /^[0-9]/.test(display.lastChar)) {
        updateDisplay(event.target.innerHTML)
        display.decimalAllowed = false
        consoleDisplay[0].innerHTML = display.value
    }
})