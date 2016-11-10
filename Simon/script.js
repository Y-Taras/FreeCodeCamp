document.addEventListener("DOMContentLoaded", function () {
    'use strict';

    var checkOn = document.querySelector("input[type=checkbox]");
    var gameCount = document.getElementsByClassName("innerCount")[0];
    var startButton = document.getElementById("innerStart");
    var strictButton = document.getElementById("strictButton");
    var strictInd = document.getElementById("strictIndicator");
    var strictMode = false;
    var playGameActive = false;
    var indexButton = 0;
    var stopPlayDiv = false;

    var soundArray = document.getElementsByTagName("audio");
    var message = document.querySelector('.player');
    var buttons = document.querySelectorAll(".bigButton");
    var buttonArray = [].slice.call(buttons, 0);

    checkOn.addEventListener("change", function () {

        if (checkOn.checked) {
            gameCount.innerHTML = "--";
            strictMode = false;
        } else {
            gameCount.innerHTML = "";
            for (let i = 0; i < 4; i++) {
                buttonArray[i].removeEventListener("click", checker, false)
            }
        }
    });

    strictButton.addEventListener("click", function () {
        if (checkOn.checked) {
            strictMode = !strictMode;
            strictMode ? strictInd.style.backgroundColor = "#FF0000" :
                strictInd.style.backgroundColor = "#850000";
        }
    });

    function getRandArray() {
        var array = [];
        for (var i = 0; i < 22; i++) {
            array[i] = Math.floor(Math.random() * 4);
        }
        return array;
    }

    var randIndexArr,
        counter;

    startButton.addEventListener("click", function () {
        if (checkOn.checked) {
            if (playGameActive) {
                for (let i = 0; i < 4; i++) {
                    buttonArray[i].removeEventListener("click", checker, false)
                }
                stopPlayDiv = true;
            }
            playGameActive = true;
            counter = 0;
            indexButton = 0;
            randIndexArr = getRandArray();
            console.log(randIndexArr);
            sleep(700).then(function () {
                playGame();
            });
        }

    });

    function sleep(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time)
        })

    }

    var checker = function checker(e) {
        var clickedButtonId = e.target.dataset.sound;
        lightenButton(clickedButtonId);
        if (+(clickedButtonId) === randIndexArr[indexButton]) {
            if (indexButton === counter) {
                counter++;
                for (let i = 0; i < 4; i++) {
                    buttonArray[i].removeEventListener("click", checker, false)
                }
                sleep(2000).then(function () {
                    indexButton = 0;
                    playGame();
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
            sleep(2000).then(function () {
                playGame();
            });
        }
    };

    function playGame() {
        stopPlayDiv = false;
        if (counter === 22) {
            Promise.resolve()
                .then(function () {
                    message.classList.add('winner');
                })
                .then(function() {
                    return sleep(2500);
                })
                .then(function() {
                    message.classList.remove('winner');
                });
            return;
        }
        //Show the level of the Game
        gameCount.innerHTML = counter + 1;
        //Light and play user's input then check if input is correct
        randIndexArr.slice(0, counter + 1).reduce(function (promise, div, index) {
            return promise.then(function () {

                if (!stopPlayDiv) {
                    lightenButton(div)
                }
                else {
                    return;
                }
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve();
                    }, 1000);
                })
            })
        }, Promise.resolve()).then(function () {
            for (var i = 0; i < 4; i++) {
                buttonArray[i].addEventListener("click", checker, false)
            }
        });
    }

    function lightenButton(id) {
        if (checkOn.checked) {
            var lightColorsArr = ["liteGreen", "liteRed", "liteYell", "liteBlue"];
            soundArray[id].play();
            buttonArray[id].classList.add(lightColorsArr[id]);
            sleep(500).then(function () {
                buttonArray[id].classList.remove(lightColorsArr[id])
            });
        }

    }

});