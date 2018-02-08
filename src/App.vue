<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="space-container">

      <router-view/>
    </div>
  </div>
</template>

<script>
import navBar from "./components/NavBar";
export default {
  name: "app",
  components: {
    navBar
  },
};
</script>

<style>
body{
  background: rgba(21, 24, 29, 0.733);

}
#app{
  height: 100%;
}
</style>

