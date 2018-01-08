<template>
  <div id="app">
    <nav-bar></nav-bar>
    <h1> APP PAGE!!!</h1>
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

</style>
