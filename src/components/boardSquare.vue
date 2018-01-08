<template>
  <div :class="classes">
  </div>
</template>



<script>
export default {
  name: "boardSquare",
  props: ["square"],
  data() {
    return {
      classes: {
                [this.square.color]: true
      }
  }
}
}
</script>

<style scoped>
.white {
  background:rgb(233, 208, 184)
}
.black {
  background: rgb(105, 167, 102)
}
div {
  background-image: url("/imgs/wp.webp");
  text-align: center;
}
</style>


