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
  function isValidIndex(i, j) {
    return i >= 0 && i < 8 && j >= 0 && j < 8;
  }

  function getCoordsStr(coords) {
    return coords.i + "-" + coords.j;
  }

  export default {
      getBishopMoves,
      getKingMoves,
      getKnightMoves,
      getPawnMoves,
      getQueenMoves,
      getRookMoves,
      getCoordsStr

  }