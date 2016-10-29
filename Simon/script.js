document.addEventListener("DOMContentLoaded", function () {

    var checkOn = document.querySelector("input[type=checkbox]");
    var gameCount = document.getElementsByClassName("innerCount")[0];
    var startButton = document.getElementById("innerStart");
    var strictButton = document.getElementById("strictButton");
    var strictInd = document.getElementById("strictIndicator");
    var strictMode = false;

    var soundArray = document.getElementsByTagName("audio");
    var buttonArray = document.querySelectorAll(".bigButton");

    checkOn.addEventListener("change", function () {

        if (checkOn.checked) {
            gameCount.innerHTML = "--";
        } else {
            gameCount.innerHTML = "";
        }
    });
    startButton.addEventListener("click", function () {
        playGame();
    });
    strictButton.addEventListener("click", function () {
        strictMode = !strictMode;
        strictMode ? strictInd.style.backgroundColor = "#FF0000" :
            strictInd.style.backgroundColor = "#850000";
    });
    function getRandArray() {
        var array = [];
        for (var i = 0; i < 22; i++) {
            array[i] = Math.floor(Math.random() * 4);
        }
        return array;
    }

    function checkButton(randIndexArr) {
        var counter = 0;
        var checker = function checker(e) {
            var clickedButtonId = e.target.dataset.sound;
            changeColor(clickedButtonId);
            if (+(clickedButtonId) !== randIndexArr[counter]) {
                return false;
            }
            counter++;
            return true;
        };
        for (var i = 0; i < 4; i++) {
            buttonArray[i].addEventListener("click", checker, false)
        }

        return checker;

    }

    function changeColor(index) {
        var oldColor = window.getComputedStyle(buttonArray[index], null)['background-color'];
        var newColor = "";

        function setOldColor() {
            buttonArray[index].style.backgroundColor = oldColor;
        }

        switch (oldColor) {
            case "rgb(9, 174, 37)":
                newColor = "#86f999";
                break;
            case "rgb(174, 9, 15)":
                newColor = "#f9868a";
                break;
            case "rgb(174, 174, 9)":
                newColor = "#f9f986";
                break;
            case "rgb(9, 37, 174)":
                newColor = "#8699f9";
                break;
        }
        buttonArray[index].style.backgroundColor = newColor;
        setTimeout(setOldColor, 1500);
    }

    function playGame() {
        var randIndexArr = getRandArray();
        for (var i = 0; i <= 22; i++) {
            for (var j = 0; j <= i; j++) {
                gameCount.innerHTML = i + 1;
                soundArray[randIndexArr[j]].play();
                changeColor(randIndexArr[j]);
                if (j === i) {
                    if (!(checkButton(randIndexArr))) {
                        if (strictMode) {
                            i = j = 0;// start over from the very beginning
                        }
                        j = 0;//start over from the current level
                    }
                }
            }
        }
    }
});
