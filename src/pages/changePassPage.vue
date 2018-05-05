<template>
  <section>
      <login-box :inputsInfo="changePass" :func="login"></login-box>
  </section>
</template>

<script>
import loginBox from "../components/loginBox";
import userService from "../services/userService";
export default {
  data() {
    return {
      changePass: {
        username: {
          iconClass: "icon-user",
          placeholder: "Username",
          inputValue: ""
        },
        pass: {
          iconClass: "icon-shield",
          placeholder: "Password",
          inputValue: ""
        },
        newPass: {
          iconClass: "icon-shield",
          placeholder: "New Password",
          inputValue: ""
        }
      }
    };
  },
  components: {
    loginBox
  },
  methods: {
    login() {
      console.log(this.loginInputs);
      userService.login(
        this.loginInputs.username.inputValue,
        this.loginInputs.pass.inputValue
      );
    }
  }
};
</script>