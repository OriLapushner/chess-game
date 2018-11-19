<template>
  <div :class="classes" @click="squareClicked">
    <img v-if="square.piece !== 'empty'" :src="pieceImgUrl" class="pieceImg"/>
  </div>
</template>



<script>
import chessService from "../services/chessService.js";
export default {
  name: "BoardSquare",
  props: ["square","pieceImgUrl"],
  computed: {
    isSelected() {
      if (!this.square) return false;
      var strCoords = this.square.coords.i + "-" + this.square.coords.j;
      return strCoords === this.$store.state.game.selected;
    },
    classes() {
      return {
        [this.square.color]: true,
        //[this.square.piece]: true,
        selected: this.isSelected,
        "valid-move": this.square.isValidMove
      };
    }
  },
  methods: {
    squareClicked() {
      chessService.squareClicked(this.square);
    }
  }
};
</script>

<style scoped>
.pieceImg{
  width: 100%;
  height: 100%;
}
.white {
  background: rgb(233, 208, 184);
}
.black {
  background: rgb(105, 167, 102);
}
.valid-move {
  opacity: 0.5;
}
.selected {
  background: black;
}
</style>


