document.addEventListener("DOMContentLoaded", function () {
    'use strict';

    var checkOn = document.querySelector("input[type=checkbox]");
    var gameCount = document.getElementsByClassName("innerCount")[0];
    var startButton = document.getElementById("innerStart");
    var strictButton = document.getElementById("strictButton");
    var strictInd = document.getElementById("strictIndicator");
    var strictMode = false;

    var soundArray = document.getElementsByTagName("audio");
    var buttons = document.querySelectorAll(".bigButton");
    var buttonArray = [].slice.call(buttons, 0);

    checkOn.addEventListener("change", function () {

        if (checkOn.checked) {
            gameCount.innerHTML = "--";
        } else {
            gameCount.innerHTML = "";
        }
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
        document.getElementsByClassName("randArray")[0].innerHTML = array;
        return array;
    }

    startButton.addEventListener("click", function () {
        var level = 0;
        var randIndexArr = getRandArray();
        playGame(randIndexArr, level);
    });

    function checkButton(randIndexArr, counter) {
        var checker = function checker(e) {
            var index = 0;
            var clickedButtonId = e.target.dataset.sound;
            lightenButton(clickedButtonId);
            while (index <= counter) {
                if (+(clickedButtonId) === randIndexArr[index]) {
                    if (index === counter) {
                        counter++;
                        for (var i = 0; i < 4; i++) {
                            buttonArray[i].removeEventListener("click", checker, false)
                        }
                        playGame(randIndexArr, counter);
                    }
                }
                index++;
            }
        };
        for (var i = 0; i < 4; i++) {
            buttonArray[i].addEventListener("click", checker, false)
        }

    }

    function playGame(randIndexArr, counter) {

        if (counter === 22) {
            return;
        }
        gameCount.innerHTML = counter + 1;

        randIndexArr.slice(0, counter + 1).reduce(function (promise, div, index) {
            return promise.then(function () {
                lightenButton(div);
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    }, 1500);
                })
            })
        }, Promise.resolve());
        checkButton(randIndexArr, counter);

    }

    function lightenButton(id) {
        var lightColorsArr = ["liteGreen", "liteRed", "liteYell", "liteBlue"];
        var promise = new Promise((resolve, reject) => {
            soundArray[id].play();
            buttonArray[id].classList.add(lightColorsArr[id]);
            setTimeout(function () {
                resolve();
            }, 500);
        });
        promise.then(function () {
            buttonArray[id].classList.remove(lightColorsArr[id]);
        });
        /*setTimeout(setOldColor, 1000);*/
    }

});