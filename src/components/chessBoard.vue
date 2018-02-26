<template>
  <section>
    <div class="board-container">
            <div class=left-board-side>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <span>7</span>
      <span>8</span>
      </div>
    <div class="squares-container">
            <board-square v-for="(square,idx) in board" class="board-square"
             :square="square" :key="idx">
            </board-square>
            </div>
                  <div class="bottom-board-side">
      <span>a</span>
      <span>b</span>
      <span>c</span>
      <span>d</span>
      <span>e</span>
      <span>f</span>
      <span>g</span>
      <span>h</span>
      </div>
      </div>
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
.span {
  font-size:80%
}
.bottom-board-side {
  display: flex;
  justify-content: space-around;
  position: relative;
  top:95%;
  right: 95%;
  height: 5%;
  width: 95%;
  min-width:95%;
}

.left-board-side {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-width: 5%;
  height: 95%;
  text-align: center;
}
.board-square {
  margin: 0;
  border: none;
  overflow: hidden;
  width: 12.5%;
  height: 12.5%;
}
.squares-container {
  border-radius: 8px;
  flex-wrap: wrap;
  align-items: flex-start;
  min-height: 95%;
  display: flex;
  min-width: 95%;
  max-width: 95%;
  max-height: 95%;
}
.board-container {
  width: 420px;
  height: 420px;
  display: flex;
}
@media (max-width: 440px){
  .board-container {
    width: 350px;
    height: 350px;
    margin-bottom:20px;
  }
}
@media(max-width: 370px){
  .board-container{
width: 300px;
height: 300px;
  }
}
</style>

