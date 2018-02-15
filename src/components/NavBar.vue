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
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Signup</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
  // computed: {
  //   username() {
  //     var user = this.$store.state.user.user;
  //     if (user === null) return "Guest";
  //     return user.username;
  //   },
  //   userId() {
  //     return this.$store.state.user.user._id;
  //   },
  //   user() {
  //     return this.$store.state.user.user;
  //   }
  // },
  methods: {}
};
</script>

<style scoped>
/* nav{
  display:flex;
  width:100%;
  justify-content: space-around;
} */
.navbar {
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  background-color: #333;
  font-family: Arial;
}

/* Links inside the navbar */
.navbar a {
  float: left;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* The dropdown container */
.dropdown {
  float: left;
  overflow: hidden;
}

/* Dropdown button */
.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
}

/* Add a red background color to navbar links on hover */
.navbar a:hover,
.dropdown:hover .dropbtn {
  background-color: red;
}

/* Dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

/* Add a grey background color to dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
