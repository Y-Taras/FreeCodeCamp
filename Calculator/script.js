    document.addEventListener("DOMContentLoaded", function(event) {
        var value0 = "";
        var value1 = "";
        var idArray = [];
        var button = document.querySelectorAll("button");
        //  Func expression removes
        var backspaceFunc = function removeLast(str) {
            var arr = str.split(/([\+\-\*\/%])/);
            arr.pop();
            return arr.join("");
        };
        // Displays symbols on the calc screen
        var showData = function calcScreen(data) {
            if (data.length < 17) {
                document.getElementsByClassName("screen")[0].innerHTML = data;
                console.log('data ', data);
            } else {
                document.getElementsByClassName("screen")[0].innerHTML = 'Overflow error';
            }
        };
        /*    var calculate = function calculations(str) {
         console.log(eval(str));
         return eval("str");
         }*/
        for (var i = 0; i < button.length; i++) {
            button[i].addEventListener("click", function() {
                if (this.value) {
                    // checking if user enters two or more times operation symbols.
                    if ((/[\+\-\*\/%]/).test(this.value) && (/[\+\-\*\/%]/).test(value0)) {
                        value1 = value1.slice(0, -1) + this.value;
                    // checking if user enters multiple symbol instead of number in the very beginning
                    } else if ((/[\+\-\*\/%]/).test(this.value) && (idArray[0] === "")) {
                        value1 = "";
                        //else adding the input value to the string variable value1; value0 - kind of previous input number
                    } else if(!(/[\+\-\*\/%]/).test(this.value) && (idArray[idArray.length - 1] === "equal")){
                        value1 = this.value;
                    } else {
                        value0 = this.value;
                        value1 += this.value;
                    }
                } else if (this.id === "leftArr") {
                    value1 = value1.slice(0, -1);
                } else if (this.id === "ce") {
                    value1 = backspaceFunc(value1);
                    console.log('value1CE ', value1);
                } else if (this.id === "ac") {
                    value1 = "";
                }
                showData(value1);
                if (this.id === "equal") {
                    value1 = (eval(value1) + '').substring(0, 16);
                    console.log('eval', value1);
                    showData(value1);
                }
                idArray[0] = this.id;
                console.log('idArray[', i, '] ', idArray);


            });
        }

    });