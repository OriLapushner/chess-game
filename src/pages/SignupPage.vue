<template>
  <section>
          <signup-box :signupInfo="signupInputs" :signup="signup"></signup-box>
  </section>
</template>

<script>
import signupBox from "../components/signupBox";
import userService from '../services/userService'
export default {
  name: "SignupPage",
  data() {
    return {
      signupInputs: {
        username: {
          iconClass: "icon-user",
          placeholder: "Username",
          inputValue: ""
        },
        pass:{
          iconClass: "icon-shield",
          placeholder: "Password",
          inputValue: ""
        },
        email:{
          iconClass: "icon-envelope",
          placeholder: "Email",
          inputValue: ""
        }
      }
    };
  },
  components: {
    signupBox
  },
  methods: {
    signup() {
      console.log("signup was fired");
      var signupInfo = {
        username: this.signupInputs.username.inputValue,
        pass: this.signupInputs.pass.inputValue,
        email: this.signupInputs.email.inputValue
      };
      console.log('signup info:',signupInfo)
      userService.signup(signupInfo);
    }
  }
};
</script> 

