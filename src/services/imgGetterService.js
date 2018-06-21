import blackPawn from '../imgs/pieces/black-pawn.png'
import blackKnight from '../imgs/pieces/black-knight.png'
import blackBishop from '../imgs/pieces/black-bishop.png'
import blackQueen from '../imgs/pieces/black-queen.png'
import blackRook from '../imgs/pieces/black-rook.png'
import blackKing from '../imgs/pieces/black-king.png'
import whitePawn from '../imgs/pieces/white-pawn.png'
import whiteKnight from '../imgs/pieces/white-knight.png'
import whiteBishop from '../imgs/pieces/white-bishop.png'
import whiteQueen from '../imgs/pieces/white-queen.png'
import whiteRook from '../imgs/pieces/white-rook.png'
import whiteKing from '../imgs/pieces/white-king.png'
import pawnMoves from '../imgs/moves/pawn-moves.png'
import knightMoves from '../imgs/moves/knight-moves.png'
import bishopMoves from '../imgs/moves/bishop-moves.png'
import queenMoves from '../imgs/moves/queen-moves.png'
import rookMoves from '../imgs/moves/rook-moves.png'
import kingMoves from '../imgs/moves/king-moves.png'

var imgs = {
  'black-pawn': blackPawn,
  'black-knight':blackKnight,
  'black-bishop':blackBishop,
  'black-queen':blackQueen,
  'black-rook':blackRook,
  'black-king':blackKing,
  'white-pawn': whitePawn,
  'white-knight':whiteKnight,
  'white-bishop':whiteBishop,
  'white-queen':whiteQueen,
  'white-rook':whiteRook,
  'white-king':whiteKing,
  pawnMoves,
  knightMoves,
  bishopMoves,
  queenMoves,
  rookMoves,
  kingMoves
}

export default imgs



// require.context('../imgs', true, /\.*\.js$/);
// var cache = {};

// function importAll (r) {
//   r.keys().forEach(key => cache[key] = r(key));
// }

// importAll(require.context('../components/', true, /\.js$/));
// console.log(cache)
// export default cache
