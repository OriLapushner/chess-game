<template>
<section class="game-state-container">
  <div class="players-state-container">
  <div class="player-state white">
    <span>white Eaten:</span>
    <div class="white-eaten">
      <img v-for="(piece,idx) in whiteEaten" :src="piece.imgUrl" :key="idx" >
      </div>
    </div>
    <div class="player-state black">
      <span>black Eaten:</span>
      <div class="black-eaten">
        <img v-for="(piece,idx) in blackEaten" :src="piece.imgUrl" :key="idx">
      </div>
    </div>
    </div>
    <p>{{gameMsg}}</p>
  </section>
</template>


<script>
export default {
  computed: {
    whiteEaten() {
      return this.$store.state.game.whiteEaten;
    },
    blackEaten() {
      return this.$store.state.game.blackEaten;
    },
    gameMsg() {
      if(this.$store.state.game.isQued) return 'qued for game'
      else if(this.$store.state.game.winner) return this.$store.state.game.winner + ' has won'
      else if (this.$store.state.game.turn === null) return "";
      else if (this.$store.state.game.playerColor) {
        if (this.$store.state.game.turn === this.$store.state.game.playerColor)
          return "your turn";
        else return "enemy turn";
      } else if (this.$store.state.game.turn === "white")
        return "white player turn";
      else return "black player turn";
    }
  }
};
</script>


<style scoped>
.white {
    border-radius: 10px 0px 0px 10px;
  /* border-bottom-right-radius: 10px; */
}
.black {
  border-radius: 0px 10px 10px 0px;
}
.players-state-container {
  margin: 30px;
  display: flex;
  justify-content: center;
}
.player-state {
  max-width: 300px;
  background: rgb(192, 178, 194);
  width: 50%;
  justify-content: space-around;
  height: 60px;
}
.game-state-container {
  width: 100%;
  height: 150px;
  text-align: center;
}
hr {
  border: none;
  height: 1px;
  background: rgba(114, 110, 110, 0.521);
}
img {
  width: 30px;
}
p {
  font-size: 1.3em;
}
</style>
