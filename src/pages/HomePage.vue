
<template>
  <section>
    <div class="button-container">
    <button @click="startGame">play offline</button>
    <button @click="searchGameOnline">play online</button>
    </div>
      <game-state class="game-state"></game-state>
    <div class="game-container">
      <chess-board class="chess-board"></chess-board>
      <chat-box class="chat-box" v-show="true"></chat-box>
    </div>
  </section>
</template>

<script>
"use strict";
import chessBoard from "../components/ChessBoard";
import chessService from "../services/chessService";
import gameState from "../components/GameState";
import chatBox from "../components/ChatBox";
export default {
  name: "HomePage",
  computed: {
    isOnline() {
      return this.$store.state.game.isOnline;
    }
  },
  methods: {
    startGame() {
      if (this.$store.state.game.turn === null)
        this.$store.commit("setPlayerTurn", "white");
        this.$store.commit('setQue',false)
    },
    searchGameOnline() {
      chessService.searchGameOnline();
    }
  },
  components: {
    chessBoard,
    gameState,
    chatBox
  }
};
</script>

<style scoped>
.button-container{
  width: 330px;
  margin: 20px auto 0 auto;
  display: flex;
  justify-content: space-between;
}
hr{
  border: none;
  background: rgba(114, 110, 110, 0.521);
  height: 1px;
  width: 100%;
}
.chat-box {
  background: rgb(176, 190, 211);
  margin-left: 20px;
}
.game-container {
  padding-bottom:30px;
  margin: auto;
  max-width: 690px;
  display: flex;
  flex-wrap: wrap;
}
.chess-board {
  display: inline-block;
}
button {
  background: #3d94f6;
  border-radius: 20px;
  color: #ffffff;
  font-size: 24px;
  padding: 18px;
  box-shadow: 1px 1px 20px 0px #000000;
  text-shadow: 1px 1px 20px #000000;
  border: solid #337fed 1px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}
button:hover {
  background: #1b27d0;
  text-decoration: none;
}
</style>



