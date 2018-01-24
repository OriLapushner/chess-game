<template>
  <section>
    <h1>Moves</h1>
      <piece-info v-for="(piece, idx) in piecesInfo" :key="idx" :piece="piece"></piece-info>
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
h1{
  margin: auto;
}
</style>
