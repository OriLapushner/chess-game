import store from '../store/store.js'
const game = store.state.game
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
    if (game.selected === null) {
        if (game.turn[0] === square.piece[0]) {
            var coordsStr = getCoordsStr(square.coords)
            store.commit('setSelected', coordsStr)
            var possibleMoves = getPossibleMoves(square)
            // console.log('possible moves: ', possibleMoves)

        }
    }
    else {
        var validMoves = game.validMoves
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
        moves = getPawnMoves(square)
    } else if (square.piece === 'black-rook' || square.piece === 'white-rook') {
        moves = getRookMoves(square)
    } else if (square.piece === 'black-bishop' || square.piece === 'white-bishop') {
        moves = getBishopMoves(square)
    } else if (square.piece === 'black-queen' || square.piece === 'white-queen') {
        moves.push(...getBishopMoves(square), ...getRookMoves(square))
        // moves.push()
    }
    else if (square.piece === 'black-knight' || square.piece === 'white-knight'){
        moves = getKnightMoves(square)
    }
    else if (square.piece === 'black-king' || square.piece === 'white-king'){
        moves = getKingMoves(square)
    }
    store.commit('setValidMoves', moves)
    return moves
}
function getPawnMoves(square) {
    var coordsStr
    var moves = []
    var direction = square.piece[0] === 'w' ? 1 : -1;
    var isValid = isValidIndex(square.coords.i + direction, square.coords.j)
    console.log(isValid)
    if (isValid) {
        coordsStr = square.coords.i + direction + '-' + square.coords.j
        if (game.board[coordsStr].piece === 'empty') {
            moves.push(coordsStr)
            coordsStr = square.coords.i + 2 * direction + '-' + square.coords.j
            isValid = isValidIndex(square.coords.i + 2 * direction, square.coords.j)
            if (isValid) {
                if (game.board[coordsStr].piece === 'empty') {
                    if (direction === 1 && square.coords.i === 1) moves.push(coordsStr)
                    else if (direction === -1 && square.coords.i === 6) moves.push(coordsStr)
                }
            }
        }
    }
    isValid = isValidIndex(square.coords.i + direction, square.coords.j + 1)
    if (isValid) {
        coordsStr = getCoordsStr({ i: square.coords.i + direction, j: square.coords.j + 1 })
        if (game.board[coordsStr].piece[0] !== square.piece[0] &&
            game.board[coordsStr].piece !== 'empty') moves.push(coordsStr)
    }
    isValid = isValidIndex(square.coords.i + direction, square.coords.j - 1)
    if (isValid) {
        coordsStr = getCoordsStr({ i: square.coords.i + direction, j: square.coords.j - 1 })
        if (game.board[coordsStr].piece[0] !== square.piece[0] &&
            game.board[coordsStr].piece !== 'empty') moves.push(coordsStr)
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
    var left = getDirectionMove(square, 0, -1)
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
        isValid = isValidIndex(square.coords.i + iModifier, square.coords.j + jModifier)
        if (isValid) {
            coordsStr = getCoordsStr({ i: square.coords.i + iModifier, j: square.coords.j + jModifier })
            if (game.board[coordsStr].piece[0] === square.piece[0]) {
                // console.log('adding move: ', coordsStr)
                isActive = false

            } else if (game.board[coordsStr].piece !== 'empty') {
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

function getKnightMoves(square){
    var moves = []
    // console.log('knight at i:',square.coords.i,'j:',square.coords.j)
    for (let i = square.coords.i - 2; i < square.coords.i + 3; i++) {
        for (let j = square.coords.j - 2; j < square.coords.j + 3; j++) {
            if (!isValidIndex(i,j)) continue;
            var coordsStr = getCoordsStr({i,j})
            // console.log(game.board[coordsStr].piece[0])
            if (game.board[coordsStr].piece[0] === square.piece[0]) continue
            var iDistance = Math.abs(square.coords.i - i)
            var jDistance = Math.abs(square.coords.j - j)
            if((iDistance  === 2 && jDistance === 1) ||
               (iDistance  === 1 && jDistance === 2)) moves.push(coordsStr)
            
        }
        
    }
    return moves
}

function getKingMoves(square){
    var moves = []
    for (let i = square.coords.i - 1; i < square.coords.i + 2; i++) {
        for (let j = square.coords.j - 1; j < square.coords.j + 2; j++) {
            if(!isValidIndex(i,j)) continue
            if(i === square.coords.i && j === square.coords.j) continue
            var coordsStr = getCoordsStr({i,j})
            if(square.piece[0] === game.board[coordsStr].piece[0]) continue
            moves.push(coordsStr)
            
        }
        
    }
    return moves
}

function moveTo(coordsStr) {
    var toRemove = game.selected
    var pieceToMove = game.board[toRemove].piece
    // console.log('to remove: ',toRemove)
    store.commit('setPiece', { piece: 'empty', coordsStr: toRemove })
    store.commit('setPiece', { piece: pieceToMove, coordsStr })
    store.commit('setSelected', null)
    store.commit('removeValidMoves')
    // store.commit('setPiece',pieceToMove,coordsStr)
}

// function getPieceVal(i,j){
//     var coordsStr = getCoordsStr({i,j})
//     return game.board[coordsStr].piece
// }

function getCoordsStr(coords) {
    return coords.i + '-' + coords.j
}

function changePlayerTurn() {
    var player = game.turn === 'white' ? 'black' : 'white'

    store.commit('setPlayerTurn', player)

}

function isValidIndex(i, j) {
    return (i >= 0 && i < 8 && j >= 0 && j < 8)

}

export default {
    getNewBoard,
    squareClicked
}

