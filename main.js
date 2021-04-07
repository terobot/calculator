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
const squareButton = document.getElementById('square')
const squareRootButton = document.getElementById('squareroot')
const confirmButton = document.getElementById('confirm')
const display = {}
display.value = ''
display.lastChar = ''
display.decimalAllowed = true

add = (a,b) => parseInt(a)+parseInt(b)
subtract = (a,b) => parseInt(a)-parseInt(b)
multiply = (a,b) => a*b
divide = (a,b) => a/b
power = (a,b) => a**b
square = (a) => a**2
squareRoot = (a) => a**(1/2)
percentage = (a) => a/100

isOdd = (a) => a%2
operate = (operator,a,b) => window[operator](a,b)
updateDisplay = (valueToAdd) => {
    if(valueToAdd === '*' & display.lastChar === '*') {
        display.value = display.value.slice(0, -1) + '^'
        display.lastChar = '^'
    }
    else if(valueToAdd === '-' & display.lastChar === '-') {
        display.value = display.value.slice(0, -1) + '+'
        display.lastChar = '+'
    }
    else if(valueToAdd === '+' & display.lastChar === '-') {
    }
    else if(valueToAdd === '-' & display.lastChar === '+') {
        display.value = display.value.slice(0, -1) + '-'
        display.lastChar = '-'
    }
    else if(valueToAdd === '+' & display.lastChar === '+') {
    }
    else {
        display.value += valueToAdd
        display.lastChar = valueToAdd
    }  
    if(!display.decimalAllowed & !/^[0-9]/.test(display.lastChar) & display.lastChar !== ',') {
        display.decimalAllowed = true
    }
    consoleDisplay[0].innerHTML = display.value
}
checkFormula = (str) => {
    let isValid = true
    if('^/*%)\xB2'.indexOf(str[0]) !== -1) {
        isValid = false
    }
    if('^/*(+-\u221A'.indexOf(str[str.length-1]) !== -1) {
        isValid = false
    }
    if(str.indexOf('//') !== -1) {
        isValid = false
    }
    if(str.indexOf('**') !== -1) {
        isValid = false
    }
    if(str.indexOf('-/') !== -1) {
        isValid = false
    }
    if(str.indexOf('-*') !== -1) {
        isValid = false
    }
    if(str.indexOf('+/') !== -1) {
        isValid = false
    }
    if(str.indexOf('+*') !== -1) {
        isValid = false
    }
    if(str.indexOf('^^') !== -1) {
        isValid = false
    }
    if(str.indexOf('+^') !== -1) {
        isValid = false
    }
    if(str.indexOf('-^') !== -1) {
        isValid = false
    }
    if(str.indexOf(',,') !== -1) {
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
    if(str.indexOf('^)') !== -1) {
        isValid = false
    }
    if(str.indexOf('\u221A)') !== -1) {
        isValid = false
    }
    if(str.indexOf('/*') !== -1) {
        isValid = false
    }
    if(str.indexOf('*/') !== -1) {
        isValid = false
    }
    if(str.indexOf('^*') !== -1) {
        isValid = false
    }
    if(str.indexOf('*^') !== -1) {
        isValid = false
    }
    if(str.indexOf('/^') !== -1) {
        isValid = false
    }
    if(str.indexOf('^/') !== -1) {
        isValid = false
    }
    if(str.indexOf('*\xB2') !== -1) {
        isValid = false
    }
    if(str.indexOf('+\xB2') !== -1) {
        isValid = false
    }
    if(str.indexOf('-\xB2') !== -1) {
        isValid = false
    }
    if(str.indexOf('/\xB2') !== -1) {
        isValid = false
    }
    if(str.indexOf('^\xB2') !== -1) {
        isValid = false
    }
    if(str.indexOf('\u221A^') !== -1) {
        isValid = false
    }
    if(str.indexOf('\u221A\xB2') !== -1) {
        isValid = false
    }
    if((str.match(/\(/g) || []).length !== (str.match(/\)/g) || []).length) {
        isValid = false
    }
    return isValid
}
cleanFormula = (str) => {
    const cleanDots = str.replaceAll(',', '.')
    const cleanBrackets = cleanDots.replaceAll('(', '[').replaceAll(')', ']')
    const cleanedStr = cleanBrackets
    return cleanedStr
}
calculate = (str) => {
    let strAsArray = str.split(/(\d+(?:\.\d+)?)/).filter(el => el)
    while(strAsArray.findIndex(el => el.length > 1 & el.charAt(el.length-1) === '-') !== -1) {
        let index = strAsArray.findIndex(el => el.charAt(el.length-1) === '-')
        strAsArray.splice(index+1, 1, multiply(-1, strAsArray[index+1]).toString())
        strAsArray.splice(index, 1, strAsArray[index].slice(0, -1))
        strAsArray = strAsArray.filter(el => el)
    }
    while(strAsArray.findIndex(el => el.charAt(0) === '%' | el.charAt(0) === '\xB2') !== -1) {
        let index = strAsArray.findIndex(el => el.charAt(0) === '%' | el.charAt(0) === '\xB2')
        if(strAsArray[index][0] === '%'){
            strAsArray.splice(index-1, 1, percentage(strAsArray[index-1]).toString())
        }
        else if(strAsArray[index][0] === '\xB2'){
            strAsArray.splice(index-1, 1, square(strAsArray[index-1]).toString())
        }
        strAsArray.splice(index, 1, strAsArray[index].slice(1))
        strAsArray = strAsArray.filter(el => el)
    }
    while(strAsArray.findIndex(el => el.charAt(el.length-1) === '\u221A') !== -1) {
        let index = strAsArray.findIndex(el => el.charAt(el.length-1) === '\u221A')
        strAsArray.splice(index+1, 1, squareRoot(strAsArray[index+1]).toString())
        strAsArray.splice(index, 1, strAsArray[index].slice(0, -1))
        strAsArray = strAsArray.filter(el => el)
    }
    while(strAsArray.findIndex(el => el.charAt(el.length-1) === '^') !== -1) {
        let index = strAsArray.findIndex(el => el.charAt(0) === '^')
        strAsArray.splice(index+1, 1, power(strAsArray[index-1], strAsArray[index+1]).toString())
        strAsArray.splice(index-1, 2, strAsArray[index].slice(1))
        strAsArray = strAsArray.filter(el => el)
    }
    while(strAsArray.findIndex(el => el.charAt(0) === '/' | el.charAt(0) === '*') !== -1) {
        let index = strAsArray.findIndex(el => el.charAt(0) === '/' | el.charAt(0) === '*')
        if(strAsArray[index][0] === '/'){
            strAsArray.splice(index+1, 1, divide(strAsArray[index-1], strAsArray[index+1]).toString())
        }
        else if(strAsArray[index][0] === '*'){
            strAsArray.splice(index+1, 1, multiply(strAsArray[index-1], strAsArray[index+1]).toString())
        }
        strAsArray.splice(index-1, 2, strAsArray[index].slice(1))
        strAsArray = strAsArray.filter(el => el)
    }
    while(strAsArray.findIndex(el => el.charAt(el.length-1) === '+' | el.charAt(el.length-1) === '-') !== -1) {
        let index = strAsArray.findIndex(el => el.charAt(el.length-1) === '+' | el.charAt(el.length-1) === '-')
        if(isOdd((strAsArray[index].match(/-/g) || []).length)){
            strAsArray.splice(index-1, 3, subtract(strAsArray[index-1], strAsArray[index+1]).toString())
        }
        else if(!isOdd((strAsArray[index].match(/-/g) || []).length)){
            strAsArray.splice(index-1, 3, add(strAsArray[index-1], strAsArray[index+1]).toString())
        }
        strAsArray = strAsArray.filter(el => el)
    }
    return strAsArray[0]
}
evaluate = (str) => {
    if(checkFormula(display.value)) {
        const cleanedStr = cleanFormula(str)
        let tempStr = cleanedStr
        let tempSubStr = ''
        let tempResult = ''
        while (tempStr.indexOf('[') !== -1) {
            tempSubStr = tempStr.match(/\[([^\[\]]*)\]/)[1]
            tempResult = calculate(tempSubStr)
            if(Number.isInteger(parseInt(tempStr[tempStr.indexOf('['+tempSubStr)-1]))) {
                if(Number.isInteger(parseInt(tempStr[tempStr.indexOf('['+tempSubStr)+tempSubStr.length+1]))) {
                    tempStr = tempStr.replace('['+tempSubStr+']', '*'+tempResult+'*')
                }
                else if(!Number.isInteger(parseInt(tempStr[tempStr.indexOf('['+tempSubStr)+tempSubStr.length+1]))) {
                    tempStr = tempStr.replace('['+tempSubStr+']', '*'+tempResult)
                }
            }
            else if(!Number.isInteger(parseInt(tempStr[tempStr.indexOf('['+tempSubStr)-1]))) {
                if(Number.isInteger(parseInt(tempStr[tempStr.indexOf('['+tempSubStr)+tempSubStr.length+1]))) {
                    tempStr = tempStr.replace('['+tempSubStr+']', tempResult+'*')
                }
                else if(!Number.isInteger(parseInt(tempStr[tempStr.indexOf('['+tempSubStr)+tempSubStr.length+1]))) {
                    tempStr = tempStr.replace('['+tempSubStr+']', tempResult)
                }
            }
        }
        return calculate(tempStr)
    }
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

squareButton.addEventListener('click', event => {
    updateDisplay('\xB2')
})

squareRootButton.addEventListener('click', event => {
    updateDisplay('\u221A')
})

confirmButton.addEventListener('click', event => {
    console.log(checkFormula(display.value))
    console.log(evaluate(display.value))
})