import store from '../store/store.js'

function getNewBoard() {
    var board = {};
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {

            var piece = getPieceLoc(i,j)
            var color = (i + j) % 2 ? 'black' : 'white';
            var square ={
                isAvaibleMove: false,
                color,
                piece,
                coords: {
                    i,
                    j
                }
            }
            board[i + '-' + j] = square

        }

    }
    return board
}

function getPieceLoc(i,j) {
    var piece;
    if (i === 0) {
        switch (j) {
            case 0:
            case 7:
                piece = 'white-rook'
                break;
            case 1:
            case 6:
                piece = 'white-knight'
                break;
            case 2:
            case 5:
                piece = 'white-bishop'
                break;
            case 3:
                piece = 'white-queen'
                break;
            case 4:
                piece = 'white-king'
                break;

            default:
                break;
        }
    }
    else if (i === 1) {
        piece = 'white-pawn'
    }
    else if (i === 7) {
        switch (j) {
            case 0:
            case 7:
                piece = 'black-rook'
                break;
            case 1:
            case 6:
                piece = 'black-knight'
                break;
            case 2:
            case 5:
                piece = 'black-bishop'
                break;
            case 3:
                piece = 'black-queen'
                break;
            case 4:
                piece = 'black-king'
                break;

            default:
                break;
        }
    }
    else if (i === 6) piece = 'black-pawn'

    else piece = 'empty'

    return piece
}

function squareClicked(square) {
    if (store.state.game.selected === null) {
        if(store.state.game.turn[0] === square.piece[0]){
        store.commit('setSelected', square.coords.i + '-' + square.coords.j)
        var possibleMoves = getPossibleMoves(square)
        console.log('possible moves: ',possibleMoves)

    }
    else return
    }
}

function getPossibleMoves(square){
    var moves = []
    if(square.piece === 'white pawn' || 'black pawn'){
        moves = getPawnMoves(square)
    }
//     else if(piece === 'black rook' || piece === 'white rook'){
//             moves = getRookMoves(piece)
// }
store.commit('setAvaibleMoves',moves)
return moves
}
function getPawnMoves(square){
    console.log('piece from pawn moves: ',square)
    var moves = []
    var direction = square.piece[0] === 'w'  ? 1 : -1;
    var coordsStr = square.coords.i + direction + '-' + square.coords.j
    if(store.state.game.board[coordsStr].piece === 'empty'){
        moves.push(coordsStr)
        // coordsStr = piece.coords.i + direction + '-' + piece.coords.j
        // if(store.state.game.board[coordsStr] === 'empty')
    }
return moves
}

function getRookMoves(piece){
    var moves = []
    for (let i = 0; i < 8; i++) {
        if(piece.coords.i === i) continue
            var coordsStr = i + '-' + j
            if(store.state.game.board[coordsStr].piece[0] === piece[0]){
                break;
            }
            moves.push(coordsStr)
        }
        for (let i = 0; i < 8; i++) {
            const element = array[i];
        }
    return moves
}


export default {
    getNewBoard,
    squareClicked
}

