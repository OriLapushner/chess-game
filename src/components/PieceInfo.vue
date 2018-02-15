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
  max-width: 700px;
  border-bottom: 1px solid rgb(124, 146, 207);
  display: flex;
  justify-content: space-between;
}
.name-img-container{
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
   margin-bottom: 10px;
   align-self: center
}
.text{
  max-width: 300px;
  margin: 30px 20px 0px 0px;
  text-align: center;
}
</style>
