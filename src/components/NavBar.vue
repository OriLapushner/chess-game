<template>
  <nav>
    <div class="navbar">
      <router-link to="/">Play</router-link>

      <div class="dropdown">
        <button class="dropbtn">Learn 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
        <router-link to="/Rules">Rules</router-link>
        <router-link to="/moves">Moves</router-link>
        </div>
      </div> 
      <router-link :to="signupRoute">{{signupText}}</router-link>
      <router-link v-if="!isLoggedIn"  to="/login">Login</router-link>
      <p v-else class="item" @click="logout">Logout</p>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    signupText() {
      return this.$store.getters.navSignupText;
    },
    signupRoute() {
      return this.$store.getters.navSignupRoute;
    }
  },
  methods: {
    logout() {
      this.$store.commit("setUser", { username: "", pass: "" });
    }
  }
};
</script>

<style scoped>
p {
  margin: 0;
  cursor: pointer;
}
.navbar {
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  background-color: #333;
  font-family: Arial;
}

.navbar a,
p {
  float: left;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.dropdown {
  float: left;
  overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
}

.navbar a:hover,
.dropdown:hover .dropbtn,
.navbar p:hover {
  background-color: rgb(233, 52, 52);
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
