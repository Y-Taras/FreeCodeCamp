document.addEventListener("DOMContentLoaded", function () {
        "use strict";
        var stack = [],
            tempValue = "",//value of input number-string
            buttId = "",
            buttClass = "",
            buttVal = "",//Value of input
            button = document.querySelectorAll("button");

        var precedence = {"^": 4, "*": 3, "/": 3, "+": 2, "-": 2};
        var associativity = {"^": "Right", "*": "Left", "/": "Left", "+": "Left", "-": "Left"};

        document.getElementsByClassName("screen")[0].innerHTML = "0";

        function peek(array) {
            return array[array.length - 1];
        }

        function splitString(str) {
            var arrayData = str.split(/([\+\-\*\/\(\)\^])/);
            return arrayData.filter(Boolean);
        }

        var postToInfix = function (strTokens) {
            var parentheses = 0;
            var out = [],
                stack = [];

            // if string starts with either of those
            // ('.', '+', '*', '/', '^', '(') it must be incorrect
            while (/[\.\+\*\/\^)]/.test(strTokens.charAt(0))) {
                strTokens = strTokens.slice(1);
            }
            //checking number of parentheses
            var matchesArray1 = strTokens.match(/\(/g);
            var matchesArray2 = strTokens.match(/\)/g);
            // parentheses is broken
            if (matchesArray1 && matchesArray2 &&
                matchesArray1.length !== matchesArray2.length) {
                return null;
            }
            // special case where negation happens at the beginning of input
            if (strTokens.charAt(0) === '-') {
                strTokens = '0' + strTokens;
            }
            // find places where negation occurs (i.e. '(-3)') and place zeros
            // before minuses to make it standard subtraction
            strTokens = strTokens.replace(/\(-/gi, "(0-");
            var tokens = splitString(strTokens);

            for (i = 0; i < tokens.length; i += 1) {
                //If the token is a number, then add it to the output queue.
                if (!isNaN(tokens[i])) {
                    out += tokens[i] + " ";
                }
                /* If the token is an operator, o1, then:*/
                if (precedence.hasOwnProperty(tokens[i])) {
                    while ((precedence.hasOwnProperty(peek(stack))) &&
                    ((associativity[tokens[i]] === "Left" && precedence[tokens[i]] <= precedence[peek(stack)]) ||
                    (associativity[tokens[i]] === "Right" && precedence[tokens[i]] < precedence[peek(stack)]))) {
                        out += stack.pop() + " ";
                    }
                    stack.push(tokens[i]);
                }
                //If the token is a left parenthesis (i.e. "("), then push it onto the stack.
                if (tokens[i] === "(") {
                    stack.push(tokens[i]);
                }
                //If the token is a right parenthesis (i.e. ")"):
                if (tokens[i] === ")") {
                    while (peek(stack) !== "(") {
                        out += stack.pop() + " ";
                    }
                    if (peek(stack) === "(") {
                        stack.pop();
                    }
                    else {
                        console.log(" there are mismatched parentheses");
                    }
                }
                console.log('i =', i, 'stack = ', stack, 'out = ', out);
            }
            while (stack.length) {
                if (peek(stack) === "(" || peek(stack) === ")") {
                    console.log(" there are mismatched parentheses");
                }
                out += stack.pop() + " ";
            }
            console.log('stack = ', stack, 'out = ', out);
            return out;
        };

        function evalPostfixExpr(str) {
            if (str === null) {
                return "Error";
            }
            var arrayTokens = str.split(" ");
            //remove last "" element of the array, and reverse it;
            arrayTokens.pop();
            arrayTokens = arrayTokens.reverse();
            var stack = [];
            while (arrayTokens.length > 0) {
                var token = arrayTokens.pop();
                if (!isNaN(token)) {
                    stack.push(token);
                } else {
                    // not enough values on stack
                    if (stack.length < 2) {
                        console.log("Error");
                    }
                    else {
                        var secondArg = Number(stack.pop());
                        var firstArg = Number(stack.pop());
                        var d = 0;

                        switch (token) {
                            case '+':
                                d = firstArg + secondArg;
                                break;

                            case '-':
                                d = firstArg - secondArg;
                                break;

                            case '*':
                                d = firstArg * secondArg;
                                break;

                            case '/':
                                d = firstArg / secondArg;
                                break;

                            case '^':
                                d = Math.pow(firstArg, secondArg);
                                break;
                        }
                        stack.push(d);
                    }
                }
            }
            if (stack.length === 1) {
                return function () {
                    var finalEval = stack.pop();
                    var lengthNum = String(finalEval).length;
                    if (Math.abs(Number(finalEval)) >= 1e+15) {
                        return "error";
                    } else if (lengthNum >= 16) {
                        finalEval = String(finalEval).slice(0, 14);
                        return Number(finalEval);
                    } else {
                        return Number(finalEval);
                    }
                }();
            }
        }

        // Displays symbols on the calc screen
        function showData(data) {
            if (data === "") {
                document.getElementsByClassName("screen")[0].innerHTML = "0";
            } else {
                document.getElementsByClassName("screen")[0].innerHTML = data;
            }
        }

        var improveInput = function calcScreen(data) {

            var arrayData = splitString(data);
            var arrLength = arrayData.length;
            //getting index of last elem in array, that is a number
            var i = 1;
            while (isNaN(+arrayData[arrLength - i])) {
                if (arrLength === i) {
                    break;
                }
                i += 1;
            }
            if ((arrayData[arrLength - i - 2] === "(" && arrayData[arrLength - i - 1] === "-") ||
                ((arrLength - i) === 1 && arrayData[0] === "-")) {
                return "-" + arrayData[arrLength - i];
            }
            return arrayData[arrLength - i];
        };

        function ceFunc(str) {
            var arr = splitString(str);
            if (!isNaN(+peek(arr))) {
                arr.pop();
                arr = arr.join("");
            }
            return arr;
        }

        function leftArrowFunc(str) {
            if (!/[\+\*\/\^\-\(\)]/.test(str.charAt(str.length - 1))) {
                str = str.slice(0, -1);
            }
            return str;
        }

        for (var i = 0; i < button.length; i++) {

            button[i].addEventListener("click", function () {

                buttId = this.id;
                buttClass = this.className;
                buttVal = this.value;

                switch (buttId) {
                    case "ac":
                        tempValue = "";
                        showData(tempValue);
                        break;
                    case "ce":
                        tempValue = ceFunc(tempValue);
                        showData(improveInput(tempValue));
                        break;
                    case "leftArrow":
                        tempValue = leftArrowFunc(tempValue);
                        showData(improveInput(tempValue));
                        break;
                    case "equal":
                        tempValue = evalPostfixExpr(postToInfix(tempValue));
                        showData(tempValue);
                        break;
                    default:
                        tempValue += buttVal;
                        //second dot in a number or more than 15 digits. Illegal.
                        if (/\d+\.\d+\./.test(tempValue) ||
                            /[\d\.]{16}/.test(tempValue)) {
                            tempValue = tempValue.slice(0, -1);
                        }
                        // there are two operators after each other
                        if (/[\+\-\/\*\^]{2}/.test(tempValue)) {
                            tempValue = tempValue.slice(0, -2) + buttVal;
                        }
                        // check if pressing multiple "0"
                        if (/[\+\-\/\*\^\(\)]0\d$/.test(tempValue)) {
                            tempValue = tempValue.slice(0, -2) + buttVal;
                        }
                        if (/^0\d/.test(tempValue)) {
                            tempValue = buttVal;
                        }
                        // if string starts with either of those
                        // ('.', '+', '*', '/', '^', '(') it must be incorrect
                        if (tempValue.length === 1 && /[\.\+\*\/\^\)]/.test(tempValue)) {
                            tempValue = "";
                        } else {
                            showData(improveInput(tempValue));
                        }
                }
            });
        }
    }
);