class node {
    constructor(gamestate, player) {
        this.children = [];
        this.value = 0;
        this.gameState = gamestate;
        this.player = player;
    }

    addChild(node) {
        this.children.push(node);
    }

    assignValue(value) {
        this.value = value;
    }
}

class gameTree {

    constructor(gameState) {
        this.gameState = gameState;
        this.root = new node(gameState, this.getMax());
        this.populateTree(this.root, this.root.player, gameState);
        this.DetermineValuesforNodes(this.root);
        for(let i = 0; i < this.root.children.length; i++){
            if(this.root.value === this.root.children[i].value){
                this.root.gameState = this.root.children[i].gameState;
                break;
            }
        }
    }

    getMin() {
        return "min";
    }
    getMax() {
        return "max";
    }

    gameStateFull(gamestate) {
        let allFilled = true;
        for (let i = 0; i < gamestate.length; i++) {
            if (gamestate[i] === '') {
                allFilled = false;
            }
        }
        return allFilled;
    }

    populateTree(parent, player, gameState) {
        //check for draw condition
        if (this.gameStateFull(gameState)) {
            return;
        }
        else if (this.checkWin(gameState) !== null) {
            return;
        }
        else {
            //populate gamestate and attach to root
            if (player === this.getMax()) {
                //ai playing, fill in O's
                for (let i = 0; i < gameState.length; i++) {
                    let newGameState = [...gameState];
                    if (gameState[i] === '') {
                        newGameState[i] = "O";
                        let newChild = new node(newGameState, this.getMin());
                        parent.children.push(newChild);
                        this.populateTree(newChild, newChild.player, newChild.gameState);

                    }
                }
            }
            else if (player === this.getMin()) {
                for (let i = 0; i < gameState.length; i++) {
                    let newGameState = [...gameState];
                    if (gameState[i] === '') {
                        newGameState[i] = "X";
                        let newChild = new node(newGameState, this.getMax());
                        parent.children.push(newChild);
                        this.populateTree(newChild, newChild.player, newChild.gameState);

                    }
                }

            }
        }
    }

    DetermineValuesforNodes(root) {
        if (root.children.length === 0) {
            //leaf, determine value of game state
            let winner = this.checkWin(root.gameState);
            if (winner === "ai") {
                root.assignValue(10);
            }
            else if (winner === "player") {
                root.assignValue(-10);
            }
            else if (winner === null) {
                root.assignValue(2);
            }

            return root;
        }
        else {
            //traverse tree and assign values based on win condition

            if (root.player === this.getMax()) {
                let comparator = -Infinity;
                let winningGameState;
                for (let i = 0; i < root.children.length; i++) {
                    let childValue = this.DetermineValuesforNodes(root.children[i]).value;
                    if (comparator < childValue) {
                        comparator = childValue;
                        winningGameState = root.children[i].gameState;
                    }
                }
                root.assignValue(comparator);
            }
            else {
                let comparator = Infinity;
                let winningGameState;
                for (let i = 0; i < root.children.length; i++) {
                    let childValue = this.DetermineValuesforNodes(root.children[i]).value;
                    if (comparator > childValue) {
                        comparator = childValue;
                        winningGameState = root.children[i].gameState;
                    }

                }

                root.assignValue(comparator);
            }

            return root;
        }

    }

    checkWin(boardState) {
        //horizontal win conditions
        if (boardState[0] === 'X' && boardState[1] === 'X' && boardState[2] === 'X') {
            return "player";

        }
        else if (boardState[0] === 'O' && boardState[1] === 'O' && boardState[2] === 'O') {
            return "ai";
        }

        else if (boardState[3] === 'X' && boardState[4] === 'X' && boardState[5] === 'X') {
            return "player";
        }
        else if (boardState[3] === 'O' && boardState[4] === 'O' && boardState[5] === 'O') {
            return "ai";
        }

        else if (boardState[6] === 'X' && boardState[7] === 'X' && boardState[8] === 'X') {
            return "player";
        }
        else if (boardState[6] === 'O' && boardState[7] === 'O' && boardState[8] === 'O') {
            return "ai";
        }

        //vertical win conditions
        else if (boardState[0] === 'X' && boardState[3] === 'X' && boardState[6] === 'X') {
            return "player";
        }
        else if (boardState[0] === 'O' && boardState[3] === 'O' && boardState[6] === 'O') {
            return "ai";
        }
        else if (boardState[1] === 'X' && boardState[4] === 'X' && boardState[7] === 'X') {
            return "player";
        }
        else if (boardState[1] === 'O' && boardState[4] === 'O' && boardState[7] === 'O') {
            return "ai";
        }
        else if (boardState[2] === 'O' && boardState[5] === 'O' && boardState[8] === 'O') {
            return "ai";
        }
        else if (boardState[2] === 'X' && boardState[5] === 'X' && boardState[8] === 'X') {
            return "player";
        }

        //DIAGONAL WIN CONDITIONS

        else if (boardState[0] === 'X' && boardState[4] === 'X' && boardState[8] === 'X') {
            return "player";
        }
        else if (boardState[0] === 'O' && boardState[4] === 'O' && boardState[8] === 'O') {
            return "ai";
        }
        else if (boardState[2] === 'X' && boardState[4] === 'X' && boardState[6] === 'X') {
            return "player";
        }
        else if (boardState[2] === 'O' && boardState[4] === 'O' && boardState[6] === 'O') {
            return "ai";
        }
        //draw condition 
        else {
            return null;
        }
    }

}

function getAIMove(gamestate) {
    let tree = new gameTree(gamestate);


    return tree.root.gameState;
}

export { getAIMove };