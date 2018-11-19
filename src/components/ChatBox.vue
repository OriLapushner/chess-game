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
import eventBus from "../services/eventBus.js";
export default {
  created() {
    eventBus.$on("scrollBottom", () => {
      setTimeout(msgsContainer => {
        var msgsContainer = document.querySelector(".messages-container");
        //390 is calculated value of difference when it is fully scorlled bottom - design dependant value
        if (msgsContainer.scrollHeight - msgsContainer.scrollTop > 390) return;
        msgsContainer.scrollTop = msgsContainer.scrollHeight;
      }, 0);
    });
  },
  data() {
    name: "ChatBox";
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
    },
    scrollDown() {}
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
  overflow-x: hidden;
  margin-top: 4px;
  overflow-y: scroll;
  scroll-behavior: auto;
}
.messages-container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

.messages-container::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

.messages-container::-webkit-scrollbar-thumb {
  background-color: #0ae;
}

.msg-container {
  margin-bottom: 5px;
}
.sender {
  padding: 0px 0px 0px 3px;
  margin-left: 2px;
  color: rgb(232, 230, 238);
  background: rgb(118, 154, 207);
  border-radius: 3px;
}
input {
  font-family: sans-serif;
  font-size: 14px;
  margin: 0 auto;
  border-left: 10px solid white;
  border-radius: 10px;
  min-height: 30px;
  width: 100%;
  box-sizing: border-box;
}

.box-container {
  border-radius: 8px;
  height: 400px;
  font-size: 14px;
  display: flex;
  flex-direction: column-reverse;
  width: 250px;
}
@media (max-width: 370px) {
  .box-container {
    width: 220px;
    height: 200px;
  }
}
</style>
