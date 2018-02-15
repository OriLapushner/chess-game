<template>
    <section class="box-container">
        <input type="text" placeholder="Your Message" @keydown="sendMsg" v-model="msg">
        <div class="messages-container">
        <div class="msg-container" v-for="(msg,idx) in messages" :key="idx">
         <span class="sender">{{msg.playerColor}}:</span> <span>{{msg.text}}</span>
         </div>
            </div>
    </section>
</template>



<script>
import chessService from "../services/chessService";
export default {
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    sendMsg(event) {
      if (event.key === "Enter") {
        chessService.sendMsg(this.msg);
        this.msg = "";
      }
    }
  },
  computed: {
    messages() {
      return this.$store.state.game.messages;
    }
  }
};
</script>


<style scoped>
.messages-container {
  overflow-y: scroll;
}
.msg-container {
  margin-bottom: 5px;
}
.sender {
  color: rgb(185, 171, 171);
}
input {
  margin: 0 auto;
  border-left: 10px solid white;
  border-radius: 10px;
  height: 25px;
  width: 70%;
}

.box-container {
  display: flex;
  flex-direction: column-reverse;
  /* align-items: flex-end; */
}
section {
  background: rgb(176, 190, 211);
}
</style>
