document.addEventListener("DOMContentLoaded", function () {
    var numbersArr = [],
        stack = [],
        tempValue = "",
        buttId = "",
        buttClass = "",
        buttVal = "",
        lastButtClass = "",
        lastButtId = "",
        button = document.querySelectorAll("button");

    // Displays symbols on the calc screen
    var showData = function calcScreen(data) {
        if (data >= 1e+17){
            data = "Overflow  error";
        }
        document.getElementsByClassName("screen")[0].innerHTML = data;
        console.log('data ', data);

    };

    var removeLastChar = function (str) {
        var str1 = str.substr(0, str.length - 1);
        return str1;
    };

    //calculating string expression
    var calculate = function calculations(array) {
        var str = array.join("");
        //finding expression with high priority
        var regex1 = /\d*(?:\.\d+)?[\*\/%]\d*(?:\.\d+)?/;
        //finding expression with low priority
        var regex2 = /(?:\d*\.)?\d+[\+\-](?:\d*\.)?\d+/;
        var found = "",
            temp = "";

        //extracting the expression from input str.
        //calculates two operands depending on operator between them
        function calcTwoOper(str) {

            var arr = str.split(/([\+\-\*\/%])/);
            if (arr[0] === "") {
                return str;
            }

            var a = Number(arr[0]);
            var b = Number(arr[2]);
            var result,
                roundedResult;

            switch (arr[1]) {
                case "+":
                    result = a + b;
                    break;
                case "-":
                    result = a - b;
                    break;
                case "*":
                    result = a * b;
                    break;
                case "/":
                    result = a / b;
                    break;
                case "%":
                    result = a % b;
                    break;
                default:
                    return;
            }
            roundedResult = Math.round(result * 1e+15) / 1e+15;
            return roundedResult + "";
        }

        while (str.match(regex1)) {
            temp = str.match(regex1)[0];
            found = calcTwoOper(temp);
            str = str.replace(regex1, found);
        }
        while (str.match(regex2)) {
            temp = str.match(regex2)[0];
            found = calcTwoOper(temp);
            str = str.replace(regex2, found);
        }
        return str;
    };

    for (var i = 0; i < button.length; i++) {
        button[i].addEventListener("click", function () {

            buttClass = this.className;
            buttVal = this.value;
            buttId = this.id;

            if (buttClass === "number") {
                if ((lastButtClass === "operator") || (lastButtId === "equal")) {
                    tempValue = "";
                }

                if ((buttVal === "." && (/\./.test(tempValue))) || (tempValue.length >= 16)) {
                    //if user puts a second point in a number - Do nothing)
                } else {
                    tempValue += this.value;
                }
            }
            if (buttClass === "operator") {
                if (tempValue.charAt(tempValue.length-1) === "."){
                    tempValue = removeLastChar(tempValue);
                }
                stack.push(tempValue);
                stack.push(buttVal);
            }
            if (buttId === "ac") {
                stack.length = 0;
                tempValue = "";
            }
            if (buttId === "ce") {
                tempValue = "";
            }
            if ((buttId === "leftArrow") && ((lastButtClass === "number") || (lastButtId === "leftArrow"))) {
                tempValue = removeLastChar(tempValue);
            }
            if (buttId === "equal") {
                if (tempValue.charAt(tempValue.length-1) === "."){
                    tempValue = removeLastChar(tempValue);
                }
                stack.push(tempValue);
                tempValue = calculate(stack);
                stack.length = 0;
                numbersArr.length = 0;
            }
            showData(tempValue);

            lastButtClass = buttClass;
            lastButtId = buttId;
        });
    }
});