<template>
  <section class="chess-board">
            <board-square v-for="(square,idx) in board" class="board-square"
             :square="square" :key="idx">

            </board-square>

      
  </section>
</template>

<script>
import chessService from "../services/chessService.js";
import boardSquare from "./BoardSquare";
export default {
  name: "ChessBoard",
  components: {
    boardSquare
  },
  created() {
    var board = chessService.getNewBoard();
    this.$store.commit("setBoard", board);
  },
  computed: {
    board() {
      return this.$store.state.game.board;
    }
  },
  methods: {
    printBoard() {
      console.log(this.board);
    }
  }
};
</script>

<style scoped>
.board-square {
  margin: 0;
  border: none;
  margin: auto;
  width: 12.5%;
  height: 12.5%;
}
.chess-board {
  flex-wrap: wrap;
  align-items: flex-start;
  height: 400px;
  display: flex;
  width: 400px;
  margin: auto;
}
</style>

