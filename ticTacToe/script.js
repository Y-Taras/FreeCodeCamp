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

    var Reset = document.getElementsByClassName('hard-reset')[0];
    Reset.addEventListener('click', resetAll);

    for (var i = 0; i < tableElem.length; i++) {
        tableElem[i].addEventListener("click", function () {
            if ((signPlayer) && !(this.innerHTML) && (footer.className === "hide"))  {
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

        var positionAiCoord = getMove();
        console.log('positionAiCoord', positionAiCoord);
        if (game.winner(board) === true) {
            footer.innerHTML = "DRAW!";
            footer.className = "show";
            restartGame();
            return;
        }
        tableElem[positionAiCoord].innerHTML = (signAI === 'o') ? signO : signX;
        board[positionAiCoord] = signAI;
        if (game.winner(board)[0] === "x") {
            var arr = game.winner(board)[1];
            for (var i = 0; i < arr.length; i++) {
                tableElem[arr[i]].className = "winnerLine";
            }
            footer.innerHTML = "The Winner is X";
            footer.className = "show";
            restartGame();
            return;
        } else if (game.winner(board)[0] === "o") {
            footer.innerHTML = "The Winner is O";
            footer.className = "show";
            restartGame();
            return;
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
        setTimeout(hideFooter, 1000);

    }

    function resetAll() {
        board = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
        hideFooter();
    }

    var game = {
        over: function (board) {

            for (var i = 0; i < board.length; i += 3) {
                if ((board[i] === board[i + 1] && board[i + 1] === board[i + 2]) &&
                    (board[i] !== 'e')) {
                    return [board[i], [i, i + 1, i + 2]];
                }
            }
            for (var j = 0; j < board.length; j++) {
                if ((board[j] === board[j + 3] && board[j + 3] === board[j + 6]) &&
                    (board[j] !== 'e')) {
                    return [board[j], [j, j + 3, j + 6]];
                }
            }

            if (board[4] === board[0] && board[4] === board[8] &&
                board[4] !== 'e') {
                return [board[4], [0, 4, 8]];
            }
            if (board[4] === board[2] && board[4] === board[6] &&
                board[4] != 'e') {
                return [board[4], [2, 4, 6]];
            }
            return board.every(function (element) {
                return element !== 'e';
            });
        },
        winner: function (board) {
            var winnerArr = game.over(board);
            if (typeof winnerArr === "boolean") {
                return winnerArr;
            }
            //console.log(winnerArr[0]);
            return winnerArr;
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
        //console.log(game.winner(board));
        if (game.winner(board)[0] === signPlayer) {
            return -10;
        }
        if (game.winner(board)[0] === signAI) {
            return +10;
        }
        return 0;//Game is a draw
    }

    function max(board) {

        if (game.winner(board)[0]) {
            return board;
        }
        var newGame = [];
        var bestMove = [];
        var score;
        var best_score = -Infinity;
        var movesArray = game.possible_moves(board, signAI);

        for (var i = 0; i < movesArray.length; i++) {
            newGame = movesArray[i].slice();
            score = moveScore(min(newGame));
            if (score > best_score) {
                best_score = score;
                bestMove = newGame;
            }
        }
        return bestMove;
    }

    function min(board) {

        if (game.winner(board)[0]) {
            return board;
        }
        var newGame = [];
        var worstMove = [];
        var score;
        var worst_score = +Infinity;
        var movesArray = game.possible_moves(board, signPlayer);

        for (var i = 0; i < movesArray.length; i++) {
            newGame = movesArray[i].slice();
            score = moveScore(max(newGame));
            if (score < worst_score) {
                worst_score = score;
                worstMove = newGame;
            }
        }
        return worstMove;
    }

    function getMove() {
        var getBestMove = max(board);
        for (var i = 0; i < getBestMove.length; i++) {
            if (getBestMove[i] !== board[i]) {
                return i;
            }
        }
    }
});