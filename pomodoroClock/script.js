document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    document.getElementsByClassName("counter")[0].style.width =
        document.getElementsByClassName("progress")[0].offsetWidth + "px";
    var buttons = document.getElementsByTagName("button");
    var minutes;
    var seconds = 60;
    var workTime = true;
    var id;

    function timer() {
        var barLength;
        var breakLen = document.getElementsByClassName("breakLen")[0].textContent;
        var sessionLen = document.getElementsByClassName("sessionLen")[0].textContent;

        seconds -= 1;
        if (seconds === -1) {
            seconds = 59;
            minutes -= 1;
        }
        if (minutes === 0 && seconds === 0) {
            minutes = workTime ? breakLen : sessionLen;
            workTime = !workTime;
            if (document.getElementsByTagName("input")[0].checked) {
                var onChangeDing = document.createElement('audio');
                onChangeDing.setAttribute('src', 'leopard.wav');
                onChangeDing.play();
            }
        }
        barLength = workTime ? (minutes * 60 + seconds) / (+sessionLen * 60) : (minutes * 60 + seconds) / (+breakLen * 60);
        barLength = parseInt(barLength * 100);
        if (barLength > 10 && barLength < 33) {
            document.getElementsByClassName("progress-bar")[0].className =
                document.getElementsByClassName("progress-bar")[0].className.replace("success", "warning");
        } else if (barLength <= 10) {
            document.getElementsByClassName("progress-bar")[0].className =
                document.getElementsByClassName("progress-bar")[0].className.replace("warning", "danger");
        }else {
            document.getElementsByClassName("progress-bar")[0].className =
                document.getElementsByClassName("progress-bar")[0].className.replace("danger", "success");
        }
        document.getElementsByClassName("progress-bar")[0].style.width = barLength + "%";
        document.getElementsByClassName("progress-bar")[0].setAttribute("aria-valuenow", barLength);
        document.getElementsByClassName("textBefore")[0].textContent = workTime ? "Work-Time:" :
            "Break-Time:";

        document.getElementsByClassName("minutes")[0].textContent = ('0' + minutes).slice(-2);
        document.getElementsByClassName("seconds")[0].textContent = ('0' + seconds).slice(-2);
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            if (this.value === "start") {
                minutes = document.getElementsByClassName("sessionLen")[0].textContent - 1;
                seconds = 60;
                id = setInterval(timer, 1000);
            }
            if (this.value === "reset") {
                clearInterval(id);
                document.getElementsByClassName("progress-bar")[0].style.width = "100%";
                document.getElementsByClassName("sessionLen")[0].innerHTML = 25;
                document.getElementsByClassName("breakLen")[0].innerHTML = 5;
                document.getElementsByClassName("minutes")[0].textContent = '00';
                document.getElementsByClassName("seconds")[0].textContent = '00';
            }
            switch (this.className) {
                case "plusSession":
                    document.getElementsByClassName("sessionLen")[0].innerHTML++;
                    break;
                case  "minusSession":
                    if (document.getElementsByClassName("sessionLen")[0].innerHTML > 1) {
                        document.getElementsByClassName("sessionLen")[0].innerHTML--;
                    }
                    break;
                case  "plusBreak":
                    document.getElementsByClassName("breakLen")[0].innerHTML++;
                    break;
                case  "minusBreak":
                    if (document.getElementsByClassName("breakLen")[0].innerHTML > 1) {
                        document.getElementsByClassName("breakLen")[0].innerHTML--;
                    }
                    break;
            }
        });
    }
});