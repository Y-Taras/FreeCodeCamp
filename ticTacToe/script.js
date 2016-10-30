document.addEventListener("DOMContentLoaded", function () {
    var signPlayer, signAI;
    var signValue = document.getElementsByClassName("setSign");
    var signO = '<i class="fa fa-circle-o"></i>',
        signX = '<i class="fa fa-times"></i>';
    var footer = document.getElementsByTagName('footer')[0];
    for (i = 0; i < signValue.length; i++) {
        signValue[i].addEventListener("click", function () {
            signPlayer = this.value;
        });
    }
    var tableElem = document.getElementsByTagName("td");
    console.log(tableElem);
    var board = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];

    var reset = document.getElementsByClassName('hard-reset')[0];
    reset.addEventListener('click', resetAll);

    for (var i = 0; i < tableElem.length; i++) {
        tableElem[i].addEventListener("click", function () {
            if ((signPlayer) && !(this.innerHTML)) {
                this.innerHTML = (signPlayer === "o") ? signO : signX;
                signAI = (signPlayer === 'x') ? 'o' : 'x';
                switch (this.id) {
                    case "a1":
                        board[0] = signPlayer;
                        break;
                    case "a2":
                        board[1] = signPlayer;
                        break;
                    case "a3":
                        board[2] = signPlayer;
                        break;
                    case "b1":
                        board[3] = signPlayer;
                        break;
                    case "b2":
                        board[4] = signPlayer;
                        break;
                    case "b3":
                        board[5] = signPlayer;
                        break;
                    case "c1":
                        board[6] = signPlayer;
                        break;
                    case "c2":
                        board[7] = signPlayer;
                        break;
                    case "c3":
                        board[8] = signPlayer;
                        break;
                }
                makeMove();
            }
        })
    }

    function makeMove() {
        if (game.over(board)[0] === true) {
            footer.innerHTML = "DRAW!";
            footer.className = "show";
            restartGame();
            return;
        }
        var positionAiCoord = getMove();

        tableElem[positionAiCoord].innerHTML = (signAI === 'o') ? signO : signX;
        board[positionAiCoord] = signAI;
        if (game.over(board)[0] === "x") {
            var arr = game.over(board)[1];
            for (var i = 0; i < arr.length; i++) {
                tableElem[arr[i]].className = "winnerLine";
            }
            footer.innerHTML = "The Winner is X";
            footer.className = "show";
            restartGame();
        } else if (game.over(board)[0] === "o") {
            footer.innerHTML = "The Winner is O";
            footer.className = "show";
            restartGame();
        }
    }

    function hideFooter() {
        for (i = 0; i < tableElem.length; i++) {
            tableElem[i].innerHTML = "";
            tableElem[i].className = "";
        }
        footer.className = "hide";
    }

    function restartGame() {
        board = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
        setTimeout(hideFooter, 750);

    }

    function resetAll() {

        board = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
        hideFooter();
        var refresh = document.getElementById("refresh");
        refresh.classList.add("fa-spin");

        setTimeout(function () {
            stopSpinner();
        }, 700);
        function stopSpinner() {
            refresh.classList.remove("fa-spin");
        }

    }

    var game = {
        over: function (board) {

            for (var i = 0; i < board.length; i += 3) {
                if ((board[i] === board[i + 1] && board[i + 1] === board[i + 2]) &&
                    (board[i] !== 'e')) {
                    return [board[i], [i, i + 1, i + 2]];
                }
            }
            for (var j = 0; j < 3; j++) {
                if ((board[j] === board[j + 3] && board[j + 3] === board[j + 6]) &&
                    (board[j] !== 'e')) {
                    return [board[j], [j, j + 3, j + 6]];
                }
            }

            if ((board[4] === board[0] && board[4] === board[8]) &&
                (board[4] !== 'e')) {
                return [board[4], [0, 4, 8]];
            }
            if ((board[4] === board[2] && board[4] === board[6]) &&
                (board[4] !== 'e')) {
                return [board[4], [2, 4, 6]];
            }
            return [board.every(function (element) {
                return element !== 'e';
            })];
        },
        possible_moves: function (board, sign) {
            var testBoard = [],
                nextBoard;
            for (var i = 0; i < board.length; i++) {
                nextBoard = board.slice();
                if (nextBoard[i] === 'e') {
                    nextBoard[i] = sign;
                    testBoard.push(nextBoard);
                }
            }
            return testBoard;
        }
    };

    function moveScore(board) {
        var result = game.over(board)[0];
        if (result === signPlayer) {
            return -100;
        }
        if (result === signAI) {
            return +100;
        }
        return 0;//Game is a draw
    }

    function max(board) {

        if (game.over(board)[0]) {
            return [moveScore(board), []];
        }
        var newGame = [];
        var bestMove = [];
        var score;
        var best_score = -Infinity;
        var movesArray = game.possible_moves(board, signAI);

        for (var i = 0; i < movesArray.length; i++) {
            newGame = movesArray[i].slice();
            score = min(newGame)[0];
            if (score > best_score) {
                best_score = score;
                bestMove = newGame;
            }
        }
        return [best_score, bestMove];
    }

    function min(board) {

        if (game.over(board)[0]) {
            return [moveScore(board), []];
        }
        var newGame = [];
        var worstMove = [];
        var score;
        var worst_score = +Infinity;
        var movesArray = game.possible_moves(board, signPlayer);

        for (var i = 0; i < movesArray.length; i++) {
            newGame = movesArray[i].slice();
            score = max(newGame)[0];
            if (score < worst_score) {
                worst_score = score;
                worstMove = newGame;
            }
        }
        return [worst_score, worstMove];
    }

    function getMove() {
        var getBestMove = max(board)[1];
        console.log(getBestMove);
        for (var i = 0; i < getBestMove.length; i++) {
            if (getBestMove[i] !== board[i]) {
                return i;
            }
        }
    }
});