<template>
<section class="gameState-container">
    <span>white Eaten:</span>
    <div class="white-eaten">
    <img v-for="(piece,idx) in whiteEaten" :src="piece.imgUrl" :key="idx" >
    </div>
    <hr>
    <p>{{turnState}}</p>
    <hr>
    <span>black Eaten:</span>
    <div class="black-eaten">
    <img v-for="(piece,idx) in blackEaten" :src="piece.imgUrl" :key="idx">
    </div>
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
    turnState() {
      if (this.$store.state.game.playerColor) {
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
.gameState-container {
  background: white;
  width: 300px; 
}
hr {
  border: none;
  height: 1px;
  background: rgba(211, 200, 200, 0.521);
}
img {
  width: 20px;
}
/* span,p {
    margin: 30px;
} */
</style>
