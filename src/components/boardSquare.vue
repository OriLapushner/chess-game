<template>
  <div :class="classes" @click="squareClicked">

  </div>
</template>



<script>
import chessService from '../services/chessService.js'
export default {
  name: 'BoardSquare',
  props: ['square'],
computed: {
    isSelected(){
      if(!this.square) return false;
      var strCoords = this.square.coords.i + '-' + this.square.coords.j
    return strCoords === this.$store.state.game.selected
  },  
  classes(){
    return {
      [this.square.color]: true,
      [this.square.piece]: true,
      selected: this.isSelected,
      'valid-move': this.square.isValidMove
    }
  }
},
methods: {
  squareClicked(){
    chessService.squareClicked(this.square)
  }
}
}
</script>

<style scoped>
.white {
  background:rgb(233, 208, 184);
}
.black {
  background: rgb(105, 167, 102)
}
.valid-move{
  opacity: 0.5;
}
.selected {
          background:black;
}
.white-pawn{
background-image: url("../imgs/pieces/white-pawn.png")
}
.white-rook{
background-image: url("../imgs/pieces/white-rook.png")
}
.white-knight{
background-image: url("../imgs/pieces/white-knight.png")
}
.white-bishop{
background-image: url("../imgs/pieces/white-bishop.png")
}
.white-queen{
background-image: url("../imgs/pieces/white-queen.png")
}
.white-king{
background-image: url("../imgs/pieces/white-king.png")
}
.black-pawn{
background-image: url("../imgs/pieces/black-pawn.png")
}
.black-rook{
background-image: url("../imgs/pieces/black-rook.png")
}
.black-knight{
background-image: url("../imgs/pieces/black-knight.png")
}
.black-bishop{
background-image: url("../imgs/pieces/black-bishop.png")
}
.black-queen{
background-image: url("../imgs/pieces/black-queen.png")
}
.black-king{
background-image: url("../imgs/pieces/black-king.png")
}
</style>


