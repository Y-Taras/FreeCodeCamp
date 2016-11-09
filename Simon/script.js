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
        sleep(1000).then(function () {
            playGame(randIndexArr, level);
        });
    });
    function sleep(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time)
        })

    }

    function checkButton(randIndexArr, counter) {
        console.log('checkButton');
        var indexButton = 0;
        var checker = function checker(e) {
            var clickedButtonId = e.target.dataset.sound;
            lightenButton(clickedButtonId);
            if (+(clickedButtonId) === randIndexArr[indexButton]) {
                if (indexButton === counter) {
                    counter++;
                    for (let i = 0; i < 4; i++) {
                        buttonArray[i].removeEventListener("click", checker, false)
                    }
                    sleep(700).then(function () {
                        playGame(randIndexArr, counter);
                    });
                }
                indexButton++;
            } else {
                gameCount.innerHTML = "--";
                if (strictMode) {
                    indexButton = 0;
                    counter = 0;
                } else {
                    indexButton = 0;
                }
                for (let i = 0; i < 4; i++) {
                    buttonArray[i].removeEventListener("click", checker, false)
                }
                sleep(2000).then(function () {
                    playGame(randIndexArr, counter);
                });
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
        //Show the level of the Game
        gameCount.innerHTML = counter + 1;
        //Light and play random buttons according to the level
        //Light and play user's input then check if input is correct
        randIndexArr.slice(0, counter + 1).reduce(function (promise, div, index) {
            return promise.then(function () {
                lightenButton(div);
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    }, 1000);
                })
            })
        }, Promise.resolve()).then(function () {
            checkButton(randIndexArr, counter);
        });
    }

    function lightenButton(id) {
        var lightColorsArr = ["liteGreen", "liteRed", "liteYell", "liteBlue"];
        soundArray[id].play();
        buttonArray[id].classList.add(lightColorsArr[id]);
        sleep(500).then(function () {
            buttonArray[id].classList.remove(lightColorsArr[id])
        });

    }

})
;