<template>
  <section>
    <h1>Moves</h1>
      <piece-info class="piece-info" v-for="(piece, idx) in piecesInfo" :key="idx" :piece="piece"> </piece-info>
  </section>
</template>


<script>
import pieceInfo from '../components/PieceInfo'
import learnService from '../services/learnService'

export default {
  name:"MovesPage",
  components:{
    pieceInfo
  },
  data(){
    return {
      piecesInfo: learnService.piecesInfo
    }
  }
}
</script>

<style>
.piece-info {
  margin: auto;
  padding-right: 200px;
}
h1{
  text-align: center;
}
</style>
