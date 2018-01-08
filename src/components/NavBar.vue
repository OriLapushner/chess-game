<template>
  <nav>
      <router-link to="/">home</router-link>
      <router-link to="/signup">signup</router-link>
      <router-link to="/Rules">Rules</router-link>
      <router-link to="/login">login</router-link>
      <router-link to="/moves">moves</router-link>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data(){
    return {
      
    }
  },
  // computed: {
  //   username() {
  //     var user = this.$store.state.user.user;
  //     if (user === null) return "Guest";
  //     return user.username;
  //   },
  //   userId() {
  //     return this.$store.state.user.user._id;
  //   },
  //   user() {
  //     return this.$store.state.user.user;
  //   }
  // },
  methods: {
  
}
}
</script>

<style scoped>
nav{
  display:flex;
  width:100%;
  justify-content: space-around;
}

</style>
