import store from "../store/store.js";
import piecesMoves from "./MovesService.js";
import connectSocket from "./socketService.js";
var socket = null;
const game = store.state.game;
function getNewBoard() {
  var board = {};
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      var piece = getPieceLoc(i, j);
      var color = (i + j) % 2 ? "black" : "white";
      var square = {
        isValidMove: false,
        color,
        piece,
        coords: {
          i,
          j
        }
      };
      board[i + "-" + j] = square;
    }
  }
  return board;
}
// var deaultLocations = {
//     [0,7] : 'white-rook',
//     [0,6] : 'white-knigt'
// }
function getPieceLoc(i, j) {
  var piece;
  if (i === 0) {
    switch (j) {
      case 0:
      case 7:
        piece = "white-rook";
        break;
      case 1:
      case 6:
        piece = "white-knight";
        break;
      case 2:
      case 5:
        piece = "white-bishop";
        break;
      case 3:
        piece = "white-queen";
        break;
      case 4:
        piece = "white-king";
        break;

      default:
        break;
    }
  } else if (i === 1) {
    piece = "white-pawn";
  } else if (i === 7) {
    switch (j) {
      case 0:
      case 7:
        piece = "black-rook";
        break;
      case 1:
      case 6:
        piece = "black-knight";
        break;
      case 2:
      case 5:
        piece = "black-bishop";
        break;
      case 3:
        piece = "black-queen";
        break;
      case 4:
        piece = "black-king";
        break;

      default:
        break;
    }
  } else if (i === 6) piece = "black-pawn";
  else piece = "empty";

  return piece;
}

function squareClicked(square) {
  var coordsStr = piecesMoves.getCoordsStr(square.coords);
  // console.log('clicked square: ', coordsStr)
  // console.log('game.turn: ', game.turn)
  if (game.isOnline) {
    // return if game.turn != game.palyerColor
    if (
      game.selected === null &&
      game.turn[0] === square.piece[0] &&
      game.turn === game.playerColor
    )
      setSelected(square);
    else {
      var isValid = isValidMove(coordsStr);
      if (isValid) {
        // console.log('selected: ', game.selected, 'coords str', coordsStr)
        sendServerMove(game.selected, coordsStr);
        moveFromTo(game.selected, coordsStr);
      } else {
        store.commit("setSelected", null);
        store.commit("removeValidMoves");
      }
    }
  } else if (game.selected === null && game.turn[0] === square.piece[0])
    setSelected(square);
  else {
    var isValid = isValidMove(coordsStr);
    if (isValid) {
      moveFromTo(game.selected, coordsStr);
    }
    store.commit("setSelected", null);
    store.commit("removeValidMoves");
  }
}

function isValidMove(coordsStr) {
  var moveIdx = game.validMoves.indexOf(coordsStr, 0);
  return moveIdx !== -1;
}

function getPossibleMoves(square, board) {
  var moves = [];
  if (square.piece === "white-pawn" || square.piece === "black-pawn") {
    moves = piecesMoves.getPawnMoves(square, board);
  } else if (square.piece === "black-rook" || square.piece === "white-rook") {
    moves = piecesMoves.getRookMoves(square, board);
  } else if (
    square.piece === "black-bishop" ||
    square.piece === "white-bishop"
  ) {
    moves = piecesMoves.getBishopMoves(square, board);
  } else if (square.piece === "black-queen" || square.piece === "white-queen") {
    moves = piecesMoves.getQueenMoves(square, board);
  } else if (
    square.piece === "black-knight" ||
    square.piece === "white-knight"
  ) {
    moves = piecesMoves.getKnightMoves(square, board);
  } else if (square.piece === "black-king" || square.piece === "white-king") {
    moves = piecesMoves.getKingMoves(square, board, game.castling);
  }
  return moves;
}

function simulateMove(board, from, to) {
  var newBoard = JSON.parse(JSON.stringify(board));
  newBoard[to].piece = newBoard[from].piece;
  newBoard[from].piece = "empty";
  // console.log(newBoard)
  return newBoard;
  // console.log('normal board from: ', board[from].piece, 'simulated board from: ', newBoard[from].piece)
}

function removeMateMoves(moves, board, pieceCoords, playerThreatend) {
  var newMoves = [];
  for (let i = 0; i < moves.length; i++) {
    var simulatedBoard = simulateMove(board, pieceCoords, moves[i]);
    var isMate = mateVerification(simulatedBoard, playerThreatend);
    if (!isMate) newMoves.push(moves[i]);
  }
  return newMoves;
}

function mateVerification(board, colorThreatened) {
  var moves = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      var coords = i + "-" + j;
      moves = getPossibleMoves(board[coords], board);
      for (let g = 0; g < moves.length; g++) {
        // console.log(colorThreatened)
        if (board[moves[g]].piece === colorThreatened + "-king") {
          // console.log("piece threatening: ", board[coords].piece);
          return true;
        }
      }
    }
  }
  return false;
}

function setSelected(square) {
  var coordsStr = piecesMoves.getCoordsStr(square.coords);
  store.commit("setSelected", coordsStr);
  var moves = getPossibleMoves(square, game.board);
  moves = removeMateMoves(moves, game.board, game.selected, game.turn);
  // console.log(moves);
  store.commit("setValidMoves", moves);
}

function addToEaten(coordsStr) {
  var piece = game.board[coordsStr].piece;
  // console.log('eaten piece added: ', piece, 'at ', coordsStr)
  if (piece !== "empty") {
    var imgUrl = getImgUrl(piece);
    store.commit("addEaten", { name: piece, imgUrl });
  }
}

function getImgUrl(piece) {
  return "src/imgs/pieces/" + piece + ".png";
}

function moveFromTo(moveFrom, moveTo) {
  addToEaten(moveTo);
  //check if online or offline
  // console.log('moveFrom: ', moveFrom)
  var pieceToMove = game.board[moveFrom].piece;
  // console.log('to remove: ',toRemove)
  // console.log('piece to move:', pieceToMove)
  store.commit("setPiece", { piece: pieceToMove, coordsStr: moveTo });
  store.commit("setPiece", { piece: "empty", coordsStr: moveFrom });
  store.commit("setSelected", null);
  store.commit("removeValidMoves");
  castlingHandler(moveFrom, moveTo, pieceToMove);
  playMoveSound();
  changePlayerTurn();
  setGameWinnerHandler();
  updateCastlingState(moveFrom, moveTo);
}

function castlingHandler(moveFrom, moveTo, pieceToMove) {
  if (pieceToMove === "white-king" && moveFrom === "0-4" ) {
    if (moveTo === "0-2") {
      store.commit("setPiece", { piece: "white-rook", coordsStr: "0-3" });
      store.commit("setPiece", { piece: "empty", coordsStr: "0-0" });
    }
    else if(moveTo === '0-6'){
      store.commit("setPiece", { piece: "white-rook", coordsStr: "0-5" });
      store.commit("setPiece", { piece: "empty", coordsStr: "0-7" });
    }
  }
  else if(pieceToMove === 'black-king' && moveFrom === '7-4'){
    if (moveTo === "7-2") {
      store.commit("setPiece", { piece: "black-rook", coordsStr: "7-3" });
      store.commit("setPiece", { piece: "empty", coordsStr: "7-0" });
    }
    else if(moveTo === '7-6'){
      store.commit("setPiece", { piece: "black-rook", coordsStr: "7-5" });
      store.commit("setPiece", { piece: "empty", coordsStr: "7-7" });
    }
  }
}
function updateCastlingState(moveFrom, moveTo) {
  var color, type, value;
  if (moveFrom === "0-4" && game.castling.white.king)
    store.commit("setCastling", { color: "white", type: "king", value: false });
  if (moveFrom === "0-0" && game.castling.white.long)
    store.commit("setCastling", { color: "white", type: "long", value: false });
  else if (moveFrom === "0-7" && game.castling.white.short)
    store.commit("setCastling", {
      color: "white",
      type: "short",
      value: false
    });
  else if (moveFrom === "7-4" && game.castling.white)
    store.commit("setCastling", { color: "black", type: "king", value: false });
  else if (moveFrom === "7-0" && game.castling.black.long)
    store.commit("setCastling", { color: "black", type: "long", value: false });
  else if (moveFrom === "7-7" && game.castling.black.short)
    store.commit("setCastling", {
      color: "black",
      type: "short",
      value: false
    });

  // console.log("move from:", moveFrom, "move to", moveTo);
}
var moveSound = new Audio();
moveSound.src ="assets/move-piece.wav";
function playMoveSound() {
  // moveSound.src = "src/sound/move-piece.wav";
  moveSound.play();
}
function setGameWinnerHandler(){
  var isGameWon = checkGameWon();
  var winner = game.turn === 'black' ? 'white' : 'black'
  if (isGameWon) store.commit("setWinner",winner)
}
function checkGameWon() {
  // var colorToCheckFor = (game.turn === 'white' ? 'white' : 'black')
  var isMate = mateVerification(game.board, game.turn);
  if (isMate) {
    // console.log('check game won verification true')
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        var coords = i + "-" + j;
        if (game.board[coords].piece[0] !== game.turn[0]) continue;
        var moves = getPossibleMoves(game.board[coords], game.board);
        moves = removeMateMoves(moves, game.board, coords, game.turn);
        // console.log('checking coords', coords, 'moves:', moves)
        if (moves.length !== 0) return false;
      }
    }
    return true;
  }
}

function changePlayerTurn() {
  var currTurn = game.turn === "white" ? "black" : "white";
  store.commit("setPlayerTurn", currTurn);
}

function sendServerMove(moveFrom, moveTo) {
  var moveInfo = {
    moveFrom,
    moveTo,
    gameId: game.gameId
  };
  // console.log(moveInfo)
  socket.emit("movePiece", moveInfo);
}

function sendMsg(text) {
  var msgInfo = {
    text,
    gameId: game.gameId,
    playerColor: game.playerColor
    // playerColor: "white"
  };
  // console.log(msgInfo)
  // store.commit("addMsg", msgInfo)
  socket.emit("sendMsg", msgInfo);
}

function searchGameOnline() {
  if (!socket) {
  socket = connectSocket();
  socket.emit("searchGame");
  }
}

export default {
  getNewBoard,
  squareClicked,
  searchGameOnline,
  sendMsg,
  moveFromTo
};
