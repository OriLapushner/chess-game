
<template>
  <section>
    <button @click="startGame">start offline</button>
    <button @click="searchGameOnline">play online</button>
    <h1>{{msgToPlayer}}</h1>
    <div class="game-container">
      <chess-board class="chess-board"></chess-board>
      <div class="side-menu">
      <game-state class="game-state"></game-state>
      <chat-box class="chat-box" v-show="isOnline"></chat-box>
      </div>
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
  data() {
    return {};
  },
  created() {},
  computed: {
    isOnline() {
      // console.log(this.$store.state.game.isOnline)
      return this.$store.state.game.isOnline;
    },
    msgToPlayer() {
      return this.$store.state.game.msgToPlayer;
    }
  },
  methods: {
    startGame() {
      if (this.$store.state.game.turn === null)
        this.$store.commit("setPlayerTurn", "white");
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
.chat-box {
  height: 200px;
}
.game-state {
  height: 200px;
}
.game-container {
  display: flex;
}
.side-menu {
  height: 400px;
  flex-direction: column;
  display: flex;
  margin-left: 20px;
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



