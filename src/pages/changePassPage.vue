<template>
  <section>
      <change-pass-box v-if="isLoggedIn" :inputsInfo="changePassInputs" :func="changePass"></change-pass-box>
      <p v-else>not logged in</p>
  </section>
</template>

<script>
import changePassBox from "../components/changePassBox";
import userService from "../services/userService";
export default {
  data() {
    return {
      changePassInputs: {
        oldPass: {
          iconClass: "icon-shield",
          placeholder: "Old Password",
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
    changePassBox
  },
  methods: {
    changePass() {
      userService.changePass(
        this.$store.state.user.user.username,
        this.changePassInputs.oldPass.inputValue,
        this.changePassInputs.newPass.inputValue
      );
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>