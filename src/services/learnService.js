var piecesInfo = {
    pawn: {
        name: 'pawn',
        text: `The pawn can move forward to the unoccupied square immediately in front
              of it on the same file, or on its first move it can advance two squares along the
              same file, provided both squares are unoccupied (black dots in the diagram) or
              the pawn can capture an opponent's piece on a square diagonally in front of
              it on an adjacent file, by moving to that square (black "x"s).`,
        pieceImgUrl: 'src/imgs/pieces/w-pawn.png',
        movesImgUrl: `src/imgs/moves/pawn-moves.png`
    },
    rook: {
        name: 'rook',
        text: `The rook can move any number of squares along a rank or file, but cannot leap over other pieces. Along with the king, a rook is involved during the king's castling move.`,
        pieceImgUrl: 'src/imgs/pieces/w-queen.png',
        movesImgUrl: `src/imgs/moves/rook-moves.png`



    },
    knight: {
        name: 'knight',
        text: `The knight moves to any of the closest squares that are not on the same rank,
            file, or diagonal, thus the move forms an "L"-shape: two squares vertically and one
            square horizontally, or two squares horizontally and one square vertically.
            The knight is the only piece that can leap over other pieces.`,
        pieceImgUrl: 'src/imgs/pieces/w-knight.png',
        movesImgUrl: `src/imgs/moves/knight-moves.png`
    },
    bishop: {
        name: 'bishop',
        text: `The bishop can move any number of squares diagonally, but cannot
         leap over other pieces`,
        pieceImgUrl: 'src/imgs/pieces/w-bishop.png',
        movesImgUrl: `src/imgs/moves/bishop-moves.png`
    },
    queen: {
        name: 'queen',
        text: `The queen combines the power of a rook and bishop and can move any
         number of squares along a rank, file, or diagonal, but cannot leap over other pieces.`,
        pieceImgUrl: 'src/imgs/pieces/w-queen.png',
        movesImgUrl: `src/imgs/moves/queen-moves.png`



    },
    king: {
        name: 'king',
        text: `The king moves one square in any direction.
        The king also has a special move called castling that involves also moving a rook.`,
        pieceImgUrl: 'src/imgs/pieces/w-queen.png',
        movesImgUrl: `src/imgs/moves/king-moves.png`



    }


}


export default {
    piecesInfo
}