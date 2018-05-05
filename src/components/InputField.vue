<template>
        <div>
        <div class="icon"><i :class="inputInfo.iconClass"></i></div>
          <input type="text" :placeholder="inputInfo.placeholder" v-model="inputInfo.inputValue" required/>
      </div>
</template>

<script>
export default {
  props: ["inputInfo"]
};
</script>

<style scoped>
.icon-user {
  position: relative;
  left: 3px;
}
.icon-shield {
  position: relative;
  left: 2px;
}
.icon {
  display: inline-block;
  color: #3e515c;
  margin-right: 15px;
  width: 16px;
  position: relative;
}
input[type="text"],
input[type="password"] {
  width: 200px;
  height: 35px;
  border-radius: 0px 4px 4px 0px/5px 5px 4px 4px;
  background-color: #fff;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.09);
  border: solid 1px #cbc9c9;
  margin-left: -5px;
  margin-top: 13px;
  padding-left: 10px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  color: #4c4c4c;
}
</style>
