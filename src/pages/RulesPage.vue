<template>
  <section>
    <h1>Rules of Chess</h1>
    <p>
Chess is a game, played by two players. One player plays with the white pieces,
and the other player plays with the black pieces. Each player has sixteen pieces in the beginning
of the game: one king, one queen, two rooks, two bishops, two knights, and eight pawns.
The game is played on a chessboard, consisting of 64 squares: eight rows and eight columns.
The squares are alternately light (white) and dark colored.
The board must be laid down such that there is a black square in the lower-left corner.
 To facilitate notation of moves, all squares are given a name. From the view of the white player,
  the rows are numbered 1, 2, 3, 4, 5, 6, 7, 8; the lowest row has number 1,
   and the upper row has number 8. The columns are named, from left to right, a, b, c, d, e, f, g, h.
    A square gets a name, consisting of the combination of its column-letter and row-number, e.g.,
     the square in the lower left corner (for white) is a1
     </p>
     <img src="http://www.chess-poster.com/english/learn_chess/notation/images/coordinates_2.gif">
     <p>
Alternately, the players make a move, starting with the white player (the player that plays with the white pieces.) A move consists of moving one of the pieces of the player to a different square, following the rules of movement for that piece - there is one special exception, named castling, where players move two pieces simultaneously.

A player can take a piece of the opponent by moving one of his own pieces to the square that contains a piece of the opponent. The opponents piece then is removed from the board, and out of play for the rest of the game. (Taking is not compulsory.)

At the start of the game, the position of the pieces is as follows.
     </p>
     <img src="data:image/png;base64,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">
    <h1>Castling</h1>
    <p>
    Under certain, special rules, a king and rook can move simultaneously in a castling move.
    The following conditions must be met:
    <ul>
      <li>The king that makes the castling move has not yet moved in the game.</li>
      <li>The rook that makes the castling move has not yet moved in the game.</li>
      <li>The king is not in check.</li>
      <li>The king does not move over a square that is attacked by an enemy piece during the castling move,
         i.e., when castling, there may not be an enemy piece that can move (in case of pawns: by diagonal movement)
          to a square that is moved over by the king.</li>
          <li>All squares between the rook and king before the castling move are empty.</li>
          <li>The King and rook must occupy the same rank (or row).</li>
    </ul>
 When castling, the king moves two squares towards the rook, and the rook moves
  over the king to the next square, i.e., black's king on e8 and rook on a8 move to:
   king c8, rook d8 (long castling),white's king on e1 and rook on h1 move to:
    king g1, rook f1 (short castling).
    </p>
    <h1>Check</h1>
    <p>
    When the king of a player can be taken by a piece of the opponent,
     one says that the king is in check. For instance, the white player moves his rook
      to a position such that it attacks the black king, i.e., if black doesn't do
       anything about it, the rook could take the black king in the next move:
        we say that the white rook gives check.
     It is considered good manners to say check when one checks ones opponent.
     It is not allowed to make a move, such that ones king is in check after the move.
     </p>
     <h1>Mate</h1>
     <p>
     When a player is in check, and he cannot make a move such that after the move, the king
      is not in check, then he is mated.The player that is mated lost the game,
       and the player that mated him won the game.
       </p>
       <h1>Stalemate</h1>
       <p>
         When a player cannot make any legal move, but he is not in check,
          then the player is said to be stalemated. In a case of a stalemate, the game is a draw.
       </p>
  </section>
</template>

<script>
"use strict";
export default {
  name: "RulesPage"
}
</script>

<style scoped>
li{
  text-align: left
}
img {
  width: 250px;
  display: block;
  margin: auto;
}
P {
  max-width: 800px;
  text-align: center;
  margin: auto;
  padding: 20px 30px;
}
h1 {
  text-align: center;
}
</style>
