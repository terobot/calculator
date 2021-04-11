const numButtons = document.getElementsByClassName('grid-item-num-btn')
const consoleDisplay = document.getElementsByClassName('grid-item-console')
const resultTable = document.getElementsByTagName('table')
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
const zero = document.getElementById('0')
const one = document.getElementById('1')
const two = document.getElementById('2')
const three = document.getElementById('3')
const four = document.getElementById('4')
const five = document.getElementById('5')
const six = document.getElementById('6')
const seven = document.getElementById('7')
const eight = document.getElementById('8')
const nine = document.getElementById('9')
const malformedMessage = '<div class="message">Malformed expression</div>'
const dividedByZeroMessage = '<div class="message">Division by zero is undefined</div>'
const display = {}
display.value = ''
display.prevChar = ''
display.decimalAllowed = true
display.malformedExpression = false
display.dividedByZero = false
display.beforeCursor = ''
display.afterCursor = ''
const results = {}
results.values = []
const cursor = {}
cursor.index = 0

document.onkeydown = async (e) => {
    e = e || window.event
    console.log(e.key)
    if(e.ctrlKey & e.key === 'v') {
        const clip = await navigator.clipboard.readText()
        updateDisplay(clip)
    }
    else if(e.key==='Backspace') {
        undo()
        undoButton.classList.add("basic-key")
    }
    else if(e.key==='Delete') {
        if(cursor.index < display.value.length) {
            cursor.index += 1
            moveCursor()
            undo()
        }
    }
    else if(e.key==='Enter') {
        confirm()
        confirmButton.classList.add("enter-key")
    }
    else if(e.key==='c' & !e.ctrlKey) {
        clear()
        clearButton.classList.add("basic-key")
    }
    else if(e.key==='ArrowLeft') {
        e.preventDefault()
        if(cursor.index > 0) {
            cursor.index -= 1
        }
        moveCursor()
        consoleDisplay[0].scrollLeft -= 10
    }
    else if(e.key==='ArrowRight') {
        e.preventDefault()
        if(cursor.index < display.value.length) {
            cursor.index += 1
        }
        moveCursor()
        consoleDisplay[0].scrollLeft += 10
    }
    else {
        if('0123456789,%+-*()/'.indexOf(e.key) !== -1) {
            updateDisplay(e.key)
            if(e.key === '(') {
                openBracketButton.classList.add("basic-key")
            }
            if(e.key === ')') {
                closeBracketButton.classList.add("basic-key")
            }
            if(e.key === '/') {
                divideButton.classList.add("basic-key")
            }
            if(e.key === '*') {
                multiplyButton.classList.add("basic-key")
            }
            if(e.key === '-') {
                subtrackButton.classList.add("basic-key")
            }
            if(e.key === '+') {
                addButton.classList.add("basic-key")
            }
            if(e.key === '%') {
                percentageButton.classList.add("basic-key")
            }
            if(e.key === ',') {
                decimalButton.classList.add("basic-key")
            }
            if(e.key === '0') {
                zero.classList.add("num-key")
            }
            if(e.key === '1') {
                one.classList.add("num-key")
            }
            if(e.key === '2') {
                two.classList.add("num-key")
            }
            if(e.key === '3') {
                three.classList.add("num-key")
            }
            if(e.key === '4') {
                four.classList.add("num-key")
            }
            if(e.key === '5') {
                five.classList.add("num-key")
            }
            if(e.key === '6') {
                six.classList.add("num-key")
            }
            if(e.key === '7') {
                seven.classList.add("num-key")
            }
            if(e.key === '8') {
                eight.classList.add("num-key")
            }
            if(e.key === '9') {
                nine.classList.add("num-key")
            }
        }
    }
}
document.onkeyup = async (e) => {
    confirmButton.classList.remove("enter-key")
    undoButton.classList.remove("basic-key")
    clearButton.classList.remove("basic-key")
    openBracketButton.classList.remove("basic-key")
    closeBracketButton.classList.remove("basic-key")
    divideButton.classList.remove("basic-key")
    multiplyButton.classList.remove("basic-key")
    subtrackButton.classList.remove("basic-key")
    addButton.classList.remove("basic-key")
    percentageButton.classList.remove("basic-key")
    decimalButton.classList.remove("basic-key")
    zero.classList.remove("num-key")
    one.classList.remove("num-key")
    two.classList.remove("num-key")
    three.classList.remove("num-key")
    four.classList.remove("num-key")
    five.classList.remove("num-key")
    six.classList.remove("num-key")
    seven.classList.remove("num-key")
    eight.classList.remove("num-key")
    nine.classList.remove("num-key")
}

add = (a,b) => parseFloat(a)+parseFloat(b)
subtract = (a,b) => parseFloat(a)-parseFloat(b)
multiply = (a,b) => a*b
divide = (a,b) => a/b
power = (a,b) => a**b
square = (a) => a**2
squareRoot = (a) => a**(1/2)
percentage = (a) => a/100

confirm = () => {
    let result = 0
    if(!checkFormula(display.value)) {
        if(!display.malformedExpression) {
            display.malformedExpression = true
            consoleDisplay[0].innerHTML += malformedMessage
        }
    }
    else if(!checkDivideByZero(display.value)) {
        if(!display.dividedByZero) {
            display.dividedByZero = true
            consoleDisplay[0].innerHTML += dividedByZeroMessage
        }
    }
    else {
        result = evaluate(display.value)
        console.log('result:'+result)
        results.values.push(display.value + '=' + result)
        console.log(results.values)
        updateResultTable(results.values[results.values.length-1])
    }
}
updateResultTable = (result) => {
    let rowElements = result.split(/(=)/)
    let row = resultTable[0].insertRow(0)
    for(i=0; i<3; i++) {
        row.insertCell(i).innerHTML = rowElements[i]
    }
}
undo = () => {
    clearMessage()
    if(cursor.index > 0) {
        display.value = display.beforeCursor.slice(0, -1) + display.afterCursor
        cursor.index -= 1
        consoleDisplay[0].innerHTML = display.value
        consoleDisplay[0].scrollLeft -= 1
        moveCursor()
    }
}
clear = () => {
    display.value = ''
    display.prevChar = ''
    display.decimalAllowed = true
    display.malformedExpression = false
    display.dividedByZero = false
    display.beforeCursor = ''
    display.afterCursor = ''
    consoleDisplay[0].innerHTML = display.value
    cursor.index = 0
    moveCursor()
}
clearMessage = () => {
    if(display.malformedExpression) {
        display.malformedExpression = false
        consoleDisplay[0].innerHTML = consoleDisplay[0].innerHTML.slice(0, -malformedMessage.length)
    }
    if(display.dividedByZero) {
        display.dividedByZero = false
        consoleDisplay[0].innerHTML = consoleDisplay[0].innerHTML.slice(0, -dividedByZeroMessage.length)
    }
}
moveCursor = () => {
    let textAsArray = display.value.split('')
    let charToHighLight = ''
    if(textAsArray[cursor.index] === '' | textAsArray[cursor.index] === undefined) {
        charToHighLight = '_'
    }
    else {
        charToHighLight = textAsArray[cursor.index]
    }
    textAsArray[cursor.index] = `<b class="cursor">${charToHighLight}</b>`
    consoleDisplay[0].innerHTML = textAsArray.join('')
    console.log(consoleDisplay[0].innerHTML)
    display.prevChar = display.value.slice(cursor.index-1, cursor.index)
    display.beforeCursor = display.value.slice(0, cursor.index)
    display.afterCursor = display.value.slice(cursor.index)
    checkDecimalAllowance()
}
checkDecimalAllowance = () => {
    let firstNonNumBefore = ''
    let firstNonNumAfter = ''
    firstNonNumBefore = display.beforeCursor.split('').reverse().join('').match(/[^0-9]/)
    firstNonNumAfter = display.afterCursor.match(/[^0-9]/)
    if(firstNonNumBefore !== null) {
        if(firstNonNumBefore[0] !== ',') {
            if(firstNonNumAfter === null) {
                display.decimalAllowed = true
            }
            else if(firstNonNumAfter[0] !== ',') {
                display.decimalAllowed = true
            }
        }
        else if(firstNonNumBefore[0] === ',') {
            display.decimalAllowed = false
        }
        else if(firstNonNumAfter !== null) {
            if(firstNonNumAfter[0] === ',') {
                display.decimalAllowed = false
            }
        }
    }
    if(firstNonNumAfter !== null) {
        if(firstNonNumAfter[0] === ',') {
            display.decimalAllowed = false
        }
    }
}
isOdd = (a) => a%2
operate = (operator,a,b) => window[operator](a,b)
updateDisplay = (valueToAdd) => {
    clearMessage()
    if(valueToAdd === '*' & display.prevChar === '*') {
        display.value = display.beforeCursor.slice(0, -1) + '^' + display.afterCursor
        display.prevChar = '^'
    }
    else if(valueToAdd === '-' & display.prevChar === '-') {
        display.value = display.beforeCursor.slice(0, -1) + '+' + display.afterCursor
        display.prevChar = '+'
    }
    else if(valueToAdd === '+' & display.prevChar === '-') {
    }
    else if(valueToAdd === '-' & display.prevChar === '+') {
        display.value = display.beforeCursor.slice(0, -1) + '-' + display.afterCursor
        display.prevChar = '-'
    }
    else if(valueToAdd === '+' & display.prevChar === '+') {
    }
    else if(valueToAdd === ',' & !display.decimalAllowed) {
    }
    else if(valueToAdd === ',' & !/^[0-9]/.test(display.prevChar)) {
    }
    else {
        display.value = display.beforeCursor + valueToAdd + display.afterCursor
        display.prevChar = valueToAdd.toString().slice(-1)
        cursor.index += valueToAdd.toString().length
    }
    consoleDisplay[0].innerHTML = display.value
    consoleDisplay[0].scrollLeft += 10
    moveCursor()
}
checkDivideByZero = (str) => {
    let indexOfZeroDivide = str.indexOf('/0')
    if(indexOfZeroDivide !== -1) {
        if(str[indexOfZeroDivide+2] !== ',') {
            return false
        }
    }
    return true
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
    [...str].forEach(c => {
        if('0123456789,%+-\xB2\u221A*()/^'.indexOf(c) === -1) {
            isValid = false
        }
    })
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
    console.log(strAsArray)
    while(strAsArray.findIndex(el => el.length > 1 & el.charAt(el.length-1) === '-') !== -1) {
        let index = strAsArray.findIndex(el => el.length > 1 & el.charAt(el.length-1) === '-')
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
            if(strAsArray[index-1]) {
                strAsArray.splice(index-1, 3, subtract(strAsArray[index-1], strAsArray[index+1]).toString())
            }
            else {
                strAsArray.splice(index, 2, subtract(0, strAsArray[index+1]).toString())
            }
        }
        else if(!isOdd((strAsArray[index].match(/-/g) || []).length)){
            if(strAsArray[index-1]) {
                strAsArray.splice(index-1, 3, subtract(strAsArray[index-1], strAsArray[index+1]).toString())
            }
            else {
                strAsArray.splice(index, 2, subtract(0, strAsArray[index+1]).toString())
            }
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
                if(Number.isInteger(parseInt(tempStr[tempStr.indexOf('['+tempSubStr)+tempSubStr.length+2]))) {
                    tempStr = tempStr.replace('['+tempSubStr+']', '*'+tempResult+'*')
                }
                else if(tempStr[tempStr.indexOf('['+tempSubStr)+tempSubStr.length+2] === '\u221A') {
                    tempStr = tempStr.replace('['+tempSubStr+']', '*'+tempResult+'*')
                }
                else {
                    tempStr = tempStr.replace('['+tempSubStr+']', '*'+tempResult)
                }
            }
            else if(tempStr[tempStr.indexOf('['+tempSubStr)-1] === '\xB2') {
                if(Number.isInteger(parseInt(tempStr[tempStr.indexOf('['+tempSubStr)+tempSubStr.length+2]))) {
                    tempStr = tempStr.replace('['+tempSubStr+']', '*'+tempResult+'*')
                }
                else if(tempStr[tempStr.indexOf('['+tempSubStr)+tempSubStr.length+2] === '\u221A') {
                    tempStr = tempStr.replace('['+tempSubStr+']', '*'+tempResult+'*')
                }
                else {
                    tempStr = tempStr.replace('['+tempSubStr+']', '*'+tempResult)
                }
            }
            else {
                if(Number.isInteger(parseInt(tempStr[tempStr.indexOf('['+tempSubStr)+tempSubStr.length+2]))) {
                    tempStr = tempStr.replace('['+tempSubStr+']', tempResult+'*')
                }
                else if(tempStr[tempStr.indexOf('['+tempSubStr)+tempSubStr.length+2] === '\u221A') {
                    tempStr = tempStr.replace('['+tempSubStr+']', tempResult+'*')
                }
                else {
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
    undo()
})

clearButton.addEventListener('click', event => {
    clear()
})

decimalButton.addEventListener('click', event => {
    updateDisplay(event.target.innerHTML)
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
    confirm()
})