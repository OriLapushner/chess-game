<template>
<section class="input-container">
  <form>
  <input type="text" placeholder="User name/Email"  v-model="username" class="input"><br>
  <input type="text" placeholder="Password"  v-model="pass" class="input"><br>
  <button class="signin-button" @click.prevent="login">sign in</button>
    </form>
    <p>Don't have an account? <router-link to="/signup">signup now</router-link></p>
</section>
</template>

<script>
import userService from "../services/userService.js";
export default {
  data() {
    return {
      username: "",
      pass: ""
    };
  },
  methods:{
    login(){
      userService.login(this.username,this.pass)
    }
  }
};
</script>
<style scoped>
P{
  color:rgba(255, 255, 255, 0.815);
}
form {
  margin: auto;
}
.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
section {
  border: 2px solid black;
}
section .input {
  margin: 15px;
}
.signin-button {
  margin: auto;
  display: block;
  width: 100px;
  background: #3498db;
  background-image: linear-gradient(to bottom, #3498db, #2980b9);
  border-radius: 9px;
  font-family: Arial;
  color: #ffffff;
  font-size: 20px;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  border: 0px;
}

.signin-button:hover {
  background: #3cb0fd;
  background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
  text-decoration: none;
}
</style>


