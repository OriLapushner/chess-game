import store from '../store/store.js'
const GAME = store.state.game
function getNewBoard() {
    var board = {};
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {

            var piece = getPieceLoc(i, j)
            var color = (i + j) % 2 ? 'black' : 'white';
            var square = {
                isValidMove: false,
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

function getPieceLoc(i, j) {
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
    console.log('clicked square: ', square.coords.i + '-' + square.coords.j)
    if (store.state.game.selected === null) {
        if (store.state.game.turn[0] === square.piece[0]) {
            var coordsStr = getCoordsStr(square.coords)
            store.commit('setSelected', coordsStr)
            var possibleMoves = getPossibleMoves(square)
            // console.log('possible moves: ', possibleMoves)

        }
    }
    else {
        var validMoves = store.state.game.validMoves
        var coordsStr = getCoordsStr(square.coords)
        for (let i = 0; i < validMoves.length; i++) {
            if (coordsStr === validMoves[i]) {
                moveTo(coordsStr)
                changePlayerTurn()
                return
            }
        }
        store.commit('setSelected', null)
        store.commit('removeValidMoves')
    }
}


function getPossibleMoves(square) {
    var moves = []
    if (square.piece === 'white-pawn' || square.piece === 'black-pawn') {
        moves.push(...getPawnMoves(square))
    } else if (square.piece === 'black-rook' || square.piece === 'white-rook') {
        moves.push(...getRookMoves(square))
    } else if (square.piece === 'black-bishop' || square.piece === 'white-bishop') {
        moves.push(...getBishopMoves(square))
    }
    // } else if (square.piece === 'black-queen' || square.piece === 'white-queen') {
    //     moves.push(...getBishopMoves(square), ...getRookMoves(square))
    //     // moves.push()
    // }


        store.commit('setValidMoves', moves)
    return moves
}
function getPawnMoves(square) {
    var coordsStr
    var moves = []
    var direction = square.piece[0] === 'w' ? 1 : -1;
    var isValid = checkValidIndex(square.coords.i + direction, square.coords.j)
    console.log(isValid)
    if (isValid) {
        coordsStr = square.coords.i + direction + '-' + square.coords.j
        if (store.state.game.board[coordsStr].piece === 'empty') {
            moves.push(coordsStr)
            coordsStr = square.coords.i + 2 * direction + '-' + square.coords.j
            isValid = checkValidIndex(square.coords.i + 2 * direction, square.coords.j)
            if (isValid) {
                if (store.state.game.board[coordsStr].piece === 'empty') {
                    if (direction === 1 && square.coords.i === 1) moves.push(coordsStr)
                    else if (direction === -1 && square.coords.i === 6) moves.push(coordsStr)
                }
            }
        }
    }
    isValid = checkValidIndex(square.coords.i + direction, square.coords.j + 1)
    if (isValid) {
        coordsStr = getCoordsStr({ i: square.coords.i + direction, j: square.coords.j + 1 })
        if (store.state.game.board[coordsStr].piece[0] !== square.piece[0] &&
            store.state.game.board[coordsStr].piece !== 'empty') moves.push(coordsStr)
    }
    isValid = checkValidIndex(square.coords.i + direction, square.coords.j - 1)
    if (isValid) {
        coordsStr = getCoordsStr({ i: square.coords.i + direction, j: square.coords.j - 1 })
        if (store.state.game.board[coordsStr].piece[0] !== square.piece[0] &&
            store.state.game.board[coordsStr].piece !== 'empty') moves.push(coordsStr)
    }
    return moves
}

function getRookMoves(square) {
    var moves = []
    var top = getDirectionMove(square, 1, 0)
    moves.push(...top)
    var bot = getDirectionMove(square, -1, 0)
    moves.push(...bot)
    var right = getDirectionMove(square, 0, 1)
    moves.push(...right)
    var left = getDirectionMove(square, 0, 1)
    moves.push(...left)
    return moves

}
function getBishopMoves(square) {
    var moves = []
    var topLeft = getDirectionMove(square, -1, -1)
    moves.push(...topLeft)
    var topRight = getDirectionMove(square, -1, 1)
    moves.push(...topRight)
    var botRight = getDirectionMove(square, 1, 1)
    moves.push(...botRight)
    var botLeft = getDirectionMove(square, 1, -1)
    moves.push(...botLeft)
    return moves
}

function getDirectionMove(square, iModifier, jModifier) {
    var moves = []
    var isActive = true
    var coordsStr
    var isValid
    while (isActive) {
        isValid = checkValidIndex(square.coords.i + iModifier, square.coords.j + jModifier)
        if (isValid) {
            coordsStr = getCoordsStr({ i: square.coords.i + iModifier, j: square.coords.j + jModifier })
            if (store.state.game.board[coordsStr].piece[0] === square.piece[0]) {
                // console.log('adding move: ', coordsStr)
                isActive = false

            } else if (store.state.game.board[coordsStr].piece !== 'empty') {
                isActive = false
                moves.push(coordsStr)
                // console.log('stopped due to encounter')
            } else moves.push(coordsStr)
        } else isActive = false

        if (iModifier < 0) iModifier--
        else if (iModifier > 0) iModifier++
        if (jModifier < 0) jModifier--
        else if (jModifier > 0) jModifier++
    }
    return moves
}

function moveTo(coordsStr) {
    var toRemove = store.state.game.selected
    var pieceToMove = store.state.game.board[toRemove].piece
    // console.log('to remove: ',toRemove)
    store.commit('setPiece', { piece: 'empty', coordsStr: toRemove })
    store.commit('setPiece', { piece: pieceToMove, coordsStr })
    store.commit('setSelected', null)
    store.commit('removeValidMoves')
    // store.commit('setPiece',pieceToMove,coordsStr)
}

// function getPieceVal(i,j){
//     var coordsStr = getCoordsStr({i,j})
//     return store.state.game.board[coordsStr].piece
// }

function getCoordsStr(coords) {
    return coords.i + '-' + coords.j
}

function changePlayerTurn() {
    var player = store.state.game.turn === 'white' ? 'black' : 'white'

    store.commit('setPlayerTurn', player)

}

function checkValidIndex(i, j) {
    return (i >= 0 && i < 8 && j >= 0 && j < 8)

}

export default {
    getNewBoard,
    squareClicked
}

