import store from "../store/store.js";
import io from "socket.io-client";
import { eventBus } from "./eventBus.js";
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
  var coordsStr = getCoordsStr(square.coords);
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
    moves = getPawnMoves(square, board);
  } else if (square.piece === "black-rook" || square.piece === "white-rook") {
    moves = getRookMoves(square, board);
  } else if (
    square.piece === "black-bishop" ||
    square.piece === "white-bishop"
  ) {
    moves = getBishopMoves(square, board);
  } else if (square.piece === "black-queen" || square.piece === "white-queen") {
    moves = getQueenMoves(square, board);
  } else if (
    square.piece === "black-knight" ||
    square.piece === "white-knight"
  ) {
    moves = getKnightMoves(square, board);
  } else if (square.piece === "black-king" || square.piece === "white-king") {
    moves = getKingMoves(square, board);
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
  var coordsStr = getCoordsStr(square.coords);
  store.commit("setSelected", coordsStr);
  var moves = getPossibleMoves(square, game.board);
  moves = removeMateMoves(moves, game.board, game.selected, game.turn);
  store.commit("setValidMoves", moves);
}

function getPawnMoves(square, board) {
  var coordsStr;
  var moves = [];
  var direction = square.piece[0] === "w" ? 1 : -1;
  var isValid = isValidIndex(square.coords.i + direction, square.coords.j);
  // console.log(isValid)
  if (isValid) {
    coordsStr = square.coords.i + direction + "-" + square.coords.j;
    if (board[coordsStr].piece === "empty") {
      moves.push(coordsStr);
      coordsStr = square.coords.i + 2 * direction + "-" + square.coords.j;
      isValid = isValidIndex(square.coords.i + 2 * direction, square.coords.j);
      if (isValid) {
        if (board[coordsStr].piece === "empty") {
          if (direction === 1 && square.coords.i === 1) moves.push(coordsStr);
          else if (direction === -1 && square.coords.i === 6)
            moves.push(coordsStr);
        }
      }
    }
  }
  isValid = isValidIndex(square.coords.i + direction, square.coords.j + 1);
  if (isValid) {
    coordsStr = getCoordsStr({
      i: square.coords.i + direction,
      j: square.coords.j + 1
    });
    if (
      board[coordsStr].piece[0] !== square.piece[0] &&
      board[coordsStr].piece !== "empty"
    )
      moves.push(coordsStr);
  }
  isValid = isValidIndex(square.coords.i + direction, square.coords.j - 1);
  if (isValid) {
    coordsStr = getCoordsStr({
      i: square.coords.i + direction,
      j: square.coords.j - 1
    });
    if (
      board[coordsStr].piece[0] !== square.piece[0] &&
      board[coordsStr].piece !== "empty"
    )
      moves.push(coordsStr);
  }
  return moves;
}

function getRookMoves(square, board) {
  var moves = [];
  var top = getDirectionMove(square, 1, 0, board);
  moves.push(...top);
  var bot = getDirectionMove(square, -1, 0, board);
  moves.push(...bot);
  var right = getDirectionMove(square, 0, 1, board);
  moves.push(...right);
  var left = getDirectionMove(square, 0, -1, board);
  moves.push(...left);
  return moves;
}
function getBishopMoves(square, board) {
  var moves = [];
  var topLeft = getDirectionMove(square, -1, -1, board);
  moves.push(...topLeft);
  var topRight = getDirectionMove(square, -1, 1, board);
  moves.push(...topRight);
  var botRight = getDirectionMove(square, 1, 1, board);
  moves.push(...botRight);
  var botLeft = getDirectionMove(square, 1, -1, board);
  moves.push(...botLeft);
  return moves;
}

function getDirectionMove(square, iModifier, jModifier, board) {
  var moves = [];
  var isActive = true;
  var coordsStr;
  var isValid;
  while (isActive) {
    isValid = isValidIndex(
      square.coords.i + iModifier,
      square.coords.j + jModifier
    );
    if (isValid) {
      coordsStr = getCoordsStr({
        i: square.coords.i + iModifier,
        j: square.coords.j + jModifier
      });
      if (board[coordsStr].piece[0] === square.piece[0]) {
        // console.log('adding move: ', coordsStr)
        isActive = false;
      } else if (board[coordsStr].piece !== "empty") {
        isActive = false;
        moves.push(coordsStr);
        // console.log('stopped due to encounter')
      } else moves.push(coordsStr);
    } else isActive = false;

    if (iModifier < 0) iModifier--;
    else if (iModifier > 0) iModifier++;
    if (jModifier < 0) jModifier--;
    else if (jModifier > 0) jModifier++;
  }
  return moves;
}

function getKnightMoves(square, board) {
  var moves = [];
  // console.log('knight at i:',square.coords.i,'j:',square.coords.j)
  for (let i = square.coords.i - 2; i < square.coords.i + 3; i++) {
    for (let j = square.coords.j - 2; j < square.coords.j + 3; j++) {
      if (!isValidIndex(i, j)) continue;
      var coordsStr = getCoordsStr({ i, j });
      // console.log(board[coordsStr].piece[0])
      if (board[coordsStr].piece[0] === square.piece[0]) continue;
      var iDistance = Math.abs(square.coords.i - i);
      var jDistance = Math.abs(square.coords.j - j);
      if (
        (iDistance === 2 && jDistance === 1) ||
        (iDistance === 1 && jDistance === 2)
      )
        moves.push(coordsStr);
    }
  }
  return moves;
}

function getQueenMoves(square, board) {
  var moves = [];
  moves.push(...getBishopMoves(square, board), ...getRookMoves(square, board));
  return moves;
}
function getKingMoves(square, board) {
  var moves = [];
  for (let i = square.coords.i - 1; i < square.coords.i + 2; i++) {
    for (let j = square.coords.j - 1; j < square.coords.j + 2; j++) {
      if (!isValidIndex(i, j)) continue;
      if (i === square.coords.i && j === square.coords.j) continue;
      var coordsStr = getCoordsStr({ i, j });
      if (square.piece[0] === board[coordsStr].piece[0]) continue;
      moves.push(coordsStr);
    }
  }
  return moves;
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
  console.log('trying to play sound')
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

function getCoordsStr(coords) {
  return coords.i + "-" + coords.j;
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

function isValidIndex(i, j) {
  return i >= 0 && i < 8 && j >= 0 && j < 8;
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
  sendMsg
};
