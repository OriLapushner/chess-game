var moves = { 
getKnightMoves(square, board){
    var moves = [];
    // console.log('knight at i:',square.coords.i,'j:',square.coords.j)
    for (let i = square.coords.i - 2; i < square.coords.i + 3; i++) {
      for (let j = square.coords.j - 2; j < square.coords.j + 3; j++) {
        if (!this.isValidIndex(i, j)) continue;
        var coordsStr = this.getCoordsStr({ i, j });
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
  },
  
  getQueenMoves(square, board){
    var moves = [];
    moves.push(...this.getBishopMoves(square, board), ...this.getRookMoves(square, board));
    return moves;
  },
  getKingMoves(square, board,castling){
    var moves = [];
    var castlingMoves = [];
    for (let i = square.coords.i - 1; i < square.coords.i + 2; i++) {
      for (let j = square.coords.j - 1; j < square.coords.j + 2; j++) {
        if (!this.isValidIndex(i, j)) continue;
        if (i === square.coords.i && j === square.coords.j) continue;
        var coordsStr = this.getCoordsStr({ i, j });
        if (square.piece[0] === board[coordsStr].piece[0]) continue;
        moves.push(coordsStr);
      }
    }
    castlingMoves = this.getCastlingMoves(square,board,castling)
    moves.push(...castlingMoves)
    return moves;
  },
  getCastlingMoves(square,board,castling){
    var moves = [];
      if(square.piece[0] === 'w'){
      if(castling.white.king){
        if(castling.white.long && board['0-1'].piece === 'empty' && board['0-2'].piece === 'empty'
          && board['0-3'].piece === 'empty')moves.push('0-2')

        if(castling.white.short && board['0-5'].piece === 'empty' &&
         board['0-6'].piece === 'empty')moves.push('0-6')
      }
    }
    else if(castling.black.king){
      if(castling.black.long && board['7-1'].piece === 'empty' && board['7-2'].piece === 'empty'
      && board['7-3'].piece === 'empty') moves.push('7-2')

    if(castling.white.short && board['7-5'].piece === 'empty' 
    && board['7-6'].piece === 'empty') moves.push('7-6')

    }
    return moves
  },
  getRookMoves(square, board) {
    var moves = [];
    var top = this.getDirectionMove(square, 1, 0, board);
    moves.push(...top);
    var bot = this.getDirectionMove(square, -1, 0, board);
    moves.push(...bot);
    var right = this.getDirectionMove(square, 0, 1, board);
    moves.push(...right);
    var left = this.getDirectionMove(square, 0, -1, board);
    moves.push(...left);
    return moves;
  },
  getBishopMoves(square, board) {
    var moves = [];
    var topLeft = this.getDirectionMove(square, -1, -1, board);
    moves.push(...topLeft);
    var topRight = this.getDirectionMove(square, -1, 1, board);
    moves.push(...topRight);
    var botRight = this.getDirectionMove(square, 1, 1, board);
    moves.push(...botRight);
    var botLeft =this.getDirectionMove(square, 1, -1, board);
    moves.push(...botLeft);
    return moves;
  },

  getDirectionMove(square, iModifier, jModifier, board) {
    var moves = [];
    var isActive = true;
    var coordsStr;
    var isValid;
    while (isActive) {
      isValid = this.isValidIndex(
        square.coords.i + iModifier,
        square.coords.j + jModifier
      );
      if (isValid) {
        coordsStr = this.getCoordsStr({
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
  },

  getPawnMoves(square, board) {
    var coordsStr;
    var moves = [];
    var direction = square.piece[0] === "w" ? 1 : -1;
    var isValid = this.isValidIndex(square.coords.i + direction, square.coords.j);
    // console.log(isValid)
    if (isValid) {
      coordsStr = square.coords.i + direction + "-" + square.coords.j;
      if (board[coordsStr].piece === "empty") {
        moves.push(coordsStr);
        coordsStr = square.coords.i + 2 * direction + "-" + square.coords.j;
        isValid = this.isValidIndex(square.coords.i + 2 * direction, square.coords.j);
        if (isValid) {
          if (board[coordsStr].piece === "empty") {
            if (direction === 1 && square.coords.i === 1) moves.push(coordsStr);
            else if (direction === -1 && square.coords.i === 6)
              moves.push(coordsStr);
          }
        }
      }
    }
    isValid = this.isValidIndex(square.coords.i + direction, square.coords.j + 1);
    if (isValid) {
      coordsStr = this.getCoordsStr({
        i: square.coords.i + direction,
        j: square.coords.j + 1
      });
      if (
        board[coordsStr].piece[0] !== square.piece[0] &&
        board[coordsStr].piece !== "empty"
      )
        moves.push(coordsStr);
    }
    isValid = this.isValidIndex(square.coords.i + direction, square.coords.j - 1);
    if (isValid) {
      coordsStr = this.getCoordsStr({
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
  },
   isValidIndex(i, j) {
    return i >= 0 && i < 8 && j >= 0 && j < 8;
  },

   getCoordsStr(coords) {
    return coords.i + "-" + coords.j;
  }
}
  export default moves