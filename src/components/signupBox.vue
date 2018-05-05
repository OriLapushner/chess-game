<template>
<div class="container">
  <h1>Signup</h1>

  <form class="form" action="javascript:void(0);" :method="signup">
      <hr>
      <input-field v-for="inputInfo in signupInfo" :inputInfo="inputInfo"></input-field>
      <select-menu class="select-menu"></select-menu>
      <button class="button" @click="signup"><router-link to="/" class="link">Signup</router-link></button>
    </form>
    </div>

</template>

<script>
import inputField from "./InputField";
import selectMenu from "./SelectMenu";
export default {
  props: ["signupInfo", "signup"],
  components: {
    selectMenu,
    inputField
  }
};
</script>


<style scoped>
.link {
  height: 100%;
  width: 100%;
  background: inherit;
  color: inherit;
  text-decoration: inherit;
}
.select-menu {
  margin: auto;
  margin-top: 25px;
}

:focus {
  outline: none;
}

input {
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
  height: 464px;
  border-radius: 8px/7px;
  background-color: #ebebeb;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.31);
  border: solid 1px #cbc9c9;
}

.form {
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
  border: none;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin: 30px auto 0px auto;
  display: block;
  padding-bottom: 3px;
  text-decoration: none;
  width: 80px;
  height: 32px;
  border-radius: 5px;
  background-color: #3a57af;
  transition: all 0.1s linear 0s;
  top: 0px;
  position: relative;
}

button:hover {
  background-color: #2e458b;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
</style>
