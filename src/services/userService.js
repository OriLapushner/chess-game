const BASE_URL = window.location.origin;
const USER_URL = BASE_URL + "/data/user";
const LOGIN_URL = BASE_URL + "/login";
const SIGNUP_URL = BASE_URL + "/signup";
const CHANGEPASS_URL = BASE_URL + '/changepass'
import axios from "axios";
import store from "../store/store.js";
import router from '../router/index'

function signup(userInfo) {
  console.log("signup req sent");
  return axios({
    method: "post",
    url: SIGNUP_URL,
    data: userInfo
  }).catch(err => {
    console.log("signup failed:", err);
  });
}

function login(username, pass) {
  console.log("logging");
  return axios({
      method: "post",
      url: LOGIN_URL,
      data: {
        username,
        pass
      }
    })
    .then(user => {
      console.log("login success", user.data);
      store.commit("setUser", {
        username,
        pass
      });
      router.push('/')
    })
    .catch(err => {
      console.log(err);
    });
}

function changePass(username, oldPass, newPass) {
  console.log("changing pass",username);
  return axios({
      method: "post",
      url: CHANGEPASS_URL,
      data: {
        username,
        oldPass,
        newPass,
      }
    })
    .then(user => {
      console.log("change password success", user.data);
      router.push('/')
    })
    .catch(err => {
      console.log(err);
    });
}

export default {
  signup,
  login,
  changePass
};
