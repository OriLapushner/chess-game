
<template>
<section>
  <button @click="startGame">start game</button>
<h1>HOME PAGE!!!</h1>
<chess-board></chess-board>
    </section>
</template>

<script>
"use strict";
import chessBoard from '../components/ChessBoard'
export default {
  name: "HomePage",
  data() {
    return {

        };
  },
  created() {      
  },
  computed:{
  },
  methods: {
    startGame(){
      if(this.$store.state.game.turn === null) this.$store.commit('setPlayerTurn','white')
    }
  },
  components: {
    chessBoard

  }
};
</script>



