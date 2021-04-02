const numButtons = document.getElementsByClassName('grid-item-num-btn')
const consoleDisplay = document.getElementsByClassName('grid-item-console')
const undoButton = document.getElementById('undo')
const clearButton = document.getElementById('clear')
const decimalButton = document.getElementById('decimal')
const openBracketButton = document.getElementById('open-bracket')
const closeBracketButton = document.getElementById('close-bracket')
const percentageButton = document.getElementById('percentage')
const addButton = document.getElementById('add')
const subtrackButton = document.getElementById('subtract')
const multiplyButton = document.getElementById('multiply')
const divideButton = document.getElementById('divide')
const confirmButton = document.getElementById('confirm')
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
    if(!display.decimalAllowed & !/^[0-9]/.test(display.lastChar) & display.lastChar !== ',') {
        display.decimalAllowed = true
    }
    consoleDisplay[0].innerHTML = display.value
}
clearDisplay = (display) => display.value = ''
checkFormula = (str) => {
    let isValid = true
    if('/*%)'.indexOf(str[0]) !== -1) {
        isValid = false
    }
    if('/*(+-'.indexOf(str[str.length-1]) !== -1) {
        isValid = false
    }
    if(str.indexOf('//') !== -1) {
        isValid = false
    }
    if(str.indexOf('**') !== -1) {
        isValid = false
    }
    if(str.indexOf(',,') !== -1) {
        isValid = false
    }
    if(str.indexOf('%%') !== -1) {
        isValid = false
    }
    if(str.indexOf('()') !== -1) {
        isValid = false
    }
    if(str.indexOf('*)') !== -1) {
        isValid = false
    }
    if(str.indexOf('-)') !== -1) {
        isValid = false
    }
    if(str.indexOf('+)') !== -1) {
        isValid = false
    }
    if(str.indexOf('/)') !== -1) {
        isValid = false
    }
    if(str.indexOf('/*') !== -1) {
        isValid = false
    }
    if(str.indexOf('*/') !== -1) {
        isValid = false
    }
    if((str.match(/\(/g) || []).length !== (str.match(/\)/g) || []).length) {
        isValid = false
    }
    return isValid
}
calculate = (str) => {
    const strWithPoints = str.replaceAll(',', '.')
    //const strAsArray = strWithPoints.split(/(\d+\.\d+)+(\d+)/)
    //const strAsArray = strWithPoints.split(/(\d+)/)
    const strAsArray = strWithPoints.split(/(\d+(?:\.\d+)?)/)
    return strAsArray
}

Array.from(numButtons).forEach(item => {
    item.addEventListener('click', event => {
        updateDisplay(event.target.innerHTML)
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
    }
})

openBracketButton.addEventListener('click', event => {
    updateDisplay(event.target.innerHTML)
})

closeBracketButton.addEventListener('click', event => {
    updateDisplay(event.target.innerHTML)
})

percentageButton.addEventListener('click', event => {
    updateDisplay(event.target.innerHTML)
})

addButton.addEventListener('click', event => {
    updateDisplay(event.target.innerHTML)
})

subtrackButton.addEventListener('click', event => {
    updateDisplay(event.target.innerHTML)
})

multiplyButton.addEventListener('click', event => {
    updateDisplay('*')
})

divideButton.addEventListener('click', event => {
    updateDisplay(event.target.innerHTML)
})

confirmButton.addEventListener('click', event => {
    console.log(checkFormula(display.value))
    console.log(calculate(display.value))
})