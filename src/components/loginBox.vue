<template>
<div class="container">
  <h1>Login</h1>

  <form action="/">
      <hr>
      <div>
        <div class="icon"><i class="icon-user"></i></div>
          <input type="text" placeholder="Username" v-model="username" required/>
      </div>
      <div>
        <div class="icon"><i class="icon-envelope"></i></div>
          <input type="password" placeholder="Password" required v-model="pass"/>
      </div>
      <router-link to="/home" class="button" @click="login">Login</router-link>
    </form>
    </div>
</template>

<script>
import userService from "../services/userService.js";
import selectMenu from "./SelectMenu";
export default {
  data() {
    return {
      username: "",
      pass: "",
      email: ""
    };
  },
  components: {
    selectMenu
  },
  methods: {
    login() {
      userService.login(this.username, this.pass);
    }
  }
};
</script>


<style scoped>
.select-menu {
  margin: auto;
  margin-top: 25px;
}

:focus {
  outline: none;
}

body,
input,
textarea,
select {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  color: #4c4c4c;
}

p {
  font-size: 14px;
  width: 150px;
  display: inline-block;
  margin-left: 18px;
}

.email {
  padding-right: 25px;
}

h1 {
  font-size: 32px;
  font-weight: 300;
  color: #4c4c4c;
  text-align: center;
  padding-top: 10px;
  margin-bottom: 10px;
}

html {
  background-color: #ffffff;
}

.container {
  margin: 20px auto;
  width: 343px;
  height: 324px;
  border-radius: 8px/7px;
  background-color: #ebebeb;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.31);
  border: solid 1px #cbc9c9;
}

form {
  margin: 0 30px;
}

hr {
  color: #a9a9a9;
  opacity: 0.3;
}

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
}

.button {
  display: block;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: white;
  padding: 6px 25px 0px 20px;
  margin: 40px auto;
  text-decoration: none;
  width: 50px;
  height: 27px;
  border-radius: 5px;
  background-color: #3a57af;
  box-shadow: 0 3px rgba(58, 87, 175, 0.75);
  transition: all 0.1s linear 0s;
  top: 0px;
  position: relative;
}

.button:hover {
  top: 3px;
  background-color: #2e458b;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
</style>
