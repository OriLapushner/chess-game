import store from "../store/store.js";
import io from "socket.io-client";
import { eventBus } from "./eventBus.js";
import piecesMoves from './MovesService.js'
const socket = io("http://localhost:3003/");

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
    moves = piecesMoves.getKingMoves(square, board);
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
          console.log(colorThreatened, " being threatened");
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
  playMoveSound()
  changePlayerTurn();
  var isGameWon = checkGameWon();
  if (isGameWon) console.log("congrats,", game.turn, "has lost");
}

function playMoveSound() {
  var moveSound = new Audio
  moveSound.src = "/src/sound/move-piece.wav"
  moveSound.play()
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
  socket.emit('sendMsg', msgInfo)
}

function searchGameOnline() {
  socket.emit("searchGame");
}

socket.on("gameFound", gameData => {
  // console.log('game has been found', gameData)
  store.commit("joinGame", gameData);

  socket.on("updateBoard", moveInfo => {
    // console.log('enemy player move info:', moveInfo)
    moveFromTo(moveInfo.moveFrom, moveInfo.moveTo);
  });

  socket.on("forwardMsg", msgInfo => {
    // console.log('messege received:', msgInfo)
    store.commit("addMsg", msgInfo);
    eventBus.$emit("scrollBottom");
  });
});

export default {
  getNewBoard,
  squareClicked,
  searchGameOnline,
  sendMsg,
};
