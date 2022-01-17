"use strict"
var display = $("#display")
var output = $("#output")
var numbers = $(".number")
var operators = $(".operator")
var equal = $("#equalsButton")
var clear = $("#clearButton")

var addNumbers = function(num1, num2) {
    return num1 + num2
}

var subtractNumbers = function(num1, num2) {
    return num1 - num2
}

var multiplyNumbers = function(num1, num2) {
    return num1 * num2
}

var divideNumbers = function(num1, num2) {
    return num1 / num2
}

var alreadyClicked = false
var enableSecondNumber = false
var enableRepeatedEqual = false
var firstNumberForOp = ""
var secondNumberForOp = ""
var operation = ""
var repeatLastNumber

var calculateAndDisplay = function(firstNumberForOp, secondNumberForOp) {
    var num1 = Number(firstNumberForOp)
    var num2 = Number(secondNumberForOp)

    if (operation == "addButton") {
        var result = addNumbers(num1, num2)
        display.val(result)
    } else if (operation == "subtractButton") {
        var result = subtractNumbers(num1, num2)
        display.val(result)
    } else if (operation == "multiplyButton") {
        var result = multiplyNumbers(num1, num2)
        display.val(result)
    } else if (operation == "divideButton") {
        var result = divideNumbers(num1, num2)
        display.val(result)
    }
    return result
}

numbers.click(function() {
    var prevNumber = display.val()
    var currNumber = $(this).val()
    
    if (!enableSecondNumber) {
        if (!alreadyClicked) {
            alreadyClicked = true
            display.val(currNumber)
            firstNumberForOp = display.val()

        } else {
            display.val(prevNumber + currNumber)
            firstNumberForOp = display.val()
        }
    } else {
        if (!alreadyClicked) {
            alreadyClicked = true
            enableRepeatedEqual = true
            display.val(currNumber)
            secondNumberForOp = display.val()
            
        } else {
            enableRepeatedEqual = true
            display.val(prevNumber + currNumber)
            secondNumberForOp = display.val()
        }
    }
})

operators.click(function() {
    if (!enableSecondNumber) {
        alreadyClicked = false
        enableSecondNumber = true
        operation = $(this).attr("id")
        secondNumberForOp = ""
        
    } else if (enableSecondNumber && secondNumberForOp != "") {
        alreadyClicked = false
        enableSecondNumber = true
        var newOperation = $(this).attr("id")
        var result = calculateAndDisplay(firstNumberForOp, secondNumberForOp)

        firstNumberForOp = result
        secondNumberForOp = ""
        operation = newOperation

    } else if (enableSecondNumber && secondNumberForOp == "") {
        alreadyClicked = false
        enableSecondNumber = true
        var newOperation = $(this).attr("id")
        secondNumberForOp = ""
        operation = newOperation
    }
})

equal.click(function() {
    alreadyClicked = false
    enableSecondNumber = false
       
    if (secondNumberForOp != "") {
        repeatLastNumber = secondNumberForOp
        var result = calculateAndDisplay(firstNumberForOp, secondNumberForOp)
        firstNumberForOp = result
        secondNumberForOp = ""
        
    } else if (secondNumberForOp == "" && enableRepeatedEqual) {
        var result = calculateAndDisplay(firstNumberForOp, repeatLastNumber)
        firstNumberForOp = result
        secondNumberForOp = ""
    }
})

clear.click(function(){
    display.val("")
    alreadyClicked = false
    enableSecondNumber = false
    enableRepeatedEqual = false
    firstNumberForOp = ""
    secondNumberForOp = ""
    operation = ""
    repeatLastNumber = ""
})
