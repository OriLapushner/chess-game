
<template>
<section>
  <button @click="startGame">start offline</button>
  <button @click="searchGameOnline">play online</button>
<h1>{{msgToPlayer}}</h1>
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
    msgToPlayer(){
      return this.$store.state.game.msgToPlayer
    }

  },
  methods: {
    startGame(){
      if(this.$store.state.game.turn === null) this.$store.commit('setPlayerTurn','white')
    },
    searchGameOnline(){
      this.$socket.emit('searchGame')
    }
  },
  
  components: {
    chessBoard

  }
};
</script>

<style scoped>
button {
background: #3D94F6;
border-radius: 20px;
color: #FFFFFF;
font-size: 24px;
padding: 18px;
box-shadow: 1px 1px 20px 0px #000000;
text-shadow: 1px 1px 20px #000000;
border: solid #337FED 1px;
text-decoration: none;
display: inline-block;
cursor: pointer;
}

button:hover {
background: #1B27D0;
text-decoration: none;
}
h1{
  text-align: center;
}
</style>



