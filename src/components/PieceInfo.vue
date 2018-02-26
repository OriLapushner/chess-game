<template>
  <section>
    <div class="name-img-container">
      <h3>{{piece.name}}</h3>
      <img :src="piece.pieceImgUrl" class="piece-img">
    </div>
    <div class="text">
    <span>{{piece.text}}</span>
    </div>
    <img :src="piece.movesImgUrl" class="move-img">
  </section>
</template>

<script>
export default {
  name: "PieceInfo",
  props: ["piece"]
};
</script>

<style scoped>

section{
  min-height: 250px;  
  max-width: 700px;
  border-bottom: 1px solid rgb(184, 191, 211);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.name-img-container{
  align-self: center;
  padding-bottom: 50px;
  text-align: center;
  min-width:100px;
  display: inline-block;
}
.piece-img{
  width: 50px;
  height: 50px;
}
section .move-img{
   width: 160px;
   height: 160px;
   margin: auto;
}
.text{
  max-width: 300px;
  margin: auto;
  text-align: center;
}

.text-img-container{
  display: flex;
  justify-content:space-between;
}
</style>
