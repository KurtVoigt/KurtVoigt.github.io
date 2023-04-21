import { getAIMove } from "./minimax.js";
window.fillIn = fillIn;
var gameSpaceList = document.getElementsByClassName("gameSpace");

   
var boardState = new Array(9);
var player = true;
var ai = false;
var restartButton = document.getElementById("restart");
restartButton.addEventListener("click", clearBoard);
for (let x = 0; x < boardState.length; x++) {
    boardState[x] = '';

}



function fillIn(spaceName) {
    console.log('clicked');
    let space = document.getElementById(spaceName);
    let winnerDiv = document.getElementById("winnerContainer");
    let index;
    //get index of clicked element in the board state
    for (let i = 0; i < gameSpaceList.length; i++) {
        if (space.id == gameSpaceList[i].id) {
            index = i;
            break;
        }
    }
    if (space.innerText == '') {
        space.innerText = 'X';
        boardState[index] = 'X';
        let winner = checkWin(boardState);

        if (winner === player) {
            for (let i = 0; i < gameSpaceList.length; i++) {
                gameSpaceList[i].onclick = null;
            }
            winnerDiv.innerText = "You Win!"
            return;
        }

        else {
            //check if all spaces are filled
            let spaceOnBoard = false;
            for (let i = 0; i < gameSpaceList.length; i++) {
                if (gameSpaceList[i].innerText === '') {
                    spaceOnBoard = true;
                    break;
                }
            }
            if (!spaceOnBoard) {
                winnerDiv.innerText = "Draw!";
                return;
            }

        }


        boardState = getAIMove(boardState);
        for (let i = 0; i < gameSpaceList.length; i++) {
            gameSpaceList[i].innerText = boardState[i];
        }
        winner = checkWin(boardState);
        if (winner === ai) {
            for (let i = 0; i < gameSpaceList.length; i++) {
                gameSpaceList[i].onclick = null;
            }
            winnerDiv.innerText = "AI Wins!"
            return;
        }
        else {
            //check if all spaces are filled
            let emptySpaceOnBoard = false;
            for (let i = 0; i < gameSpaceList.length; i++) {
                if (gameSpaceList[i].innerText === '') {
                    emptySpaceOnBoard = true;
                    break;
                }
            }
            if (!emptySpaceOnBoard) {
                winnerDiv.innerText = "Draw!";
                return;
            }

        }



    }
}

//I could do this a lot cleaner it's true
function checkWin(board) {
    //horizontal win conditions
    if (boardState[0] === 'X' && boardState[1] === 'X' && boardState[2] === 'X') {
        return player;

    }
    else if (boardState[0] === 'O' && boardState[1] === 'O' && boardState[2] === 'O') {
        return ai;
    }

    else if (boardState[3] === 'X' && boardState[4] === 'X' && boardState[5] === 'X') {
        return player;
    }
    else if (boardState[3] === 'O' && boardState[4] === 'O' && boardState[5] === 'O') {
        return ai;
    }

    else if (boardState[6] === 'X' && boardState[7] === 'X' && boardState[8] === 'X') {
        return player;
    }
    else if (boardState[6] === 'O' && boardState[7] === 'O' && boardState[8] === 'O') {
        return ai;
    }

    //vertical win conditions
    else if (boardState[0] === 'X' && boardState[3] === 'X' && boardState[6] === 'X') {
        return player;
    }
    else if (boardState[0] === 'O' && boardState[3] === 'O' && boardState[6] === 'O') {
        return ai;
    }
    else if (boardState[1] === 'X' && boardState[4] === 'X' && boardState[7] === 'X') {
        return player;
    }
    else if (boardState[1] === 'O' && boardState[4] === 'O' && boardState[7] === 'O') {
        return ai;
    }
    else if (boardState[2] === 'O' && boardState[5] === 'O' && boardState[8] === 'O') {
        return ai;
    }
    else if (boardState[2] === 'X' && boardState[5] === 'X' && boardState[8] === 'X') {
        return player;
    }

    //DIAGONAL WIN CONDITIONS

    else if (boardState[0] === 'X' && boardState[4] === 'X' && boardState[8] === 'X') {
        return player;
    }
    else if (boardState[0] === 'O' && boardState[4] === 'O' && boardState[8] === 'O') {
        return ai;
    }
    else if (boardState[2] === 'X' && boardState[4] === 'X' && boardState[6] === 'X') {
        return player;
    }
    else if (boardState[2] === 'O' && boardState[4] === 'O' && boardState[6] === 'O') {
        return ai;
    }
    //draw condition 
    else {
        return null;
    }
}


function clearBoard() {
    let gameSpaceList = document.getElementsByClassName("gameSpace");
    for (let i = 0; i < gameSpaceList.length; i++) {
        gameSpaceList.item(i).innerText = "";
        boardState[i] = "";
        gameSpaceList.item(i).addEventListener("click", fillIn.bind(this, gameSpaceList.item(i).id));
    }
    let winnerDiv = document.getElementById("winnerContainer");
    winnerDiv.innerText = "";

}