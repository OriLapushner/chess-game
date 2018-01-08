
<template>
<section>
<h1>HOME PAGE!!!</h1>
<chess-board></chess-board>
    </section>
</template>

<script>
"use strict";
import chessBoard from '../components/chessBoard'
export default {
  name: "HomePage",
  data() {
    return {

        };
  },
  created() {      
  },
  computed:{
    // isLogged(){
    //   // return this.$store.state.user.isLogged
      
    // }
  },
  methods: {
    // logout(){
    //   this.$store.commit('setUser',{user: null})
    // }
  },
  components: {
    chessBoard

  }
};
</script>



