const BASE_URL = 'http://localhost:3003'
const USER_URL = BASE_URL + '/data/user'
const LOGIN_URL = BASE_URL + '/login'
const SIGNUP_URL = BASE_URL + '/signup'
import axios from 'axios'
import store from '../store/store.js'

function signup(userInfo) {
    console.log('signup req sent')
    return axios({
        method: 'post',
        url: SIGNUP_URL,
        data: userInfo
    })
        .catch(err => console.log('signup failed:', err))
}

function login(username, pass) {
    console.log('logging')
    return axios({
        method: 'post',
        url: LOGIN_URL,
        data: {
            username,
            pass
        }
    })
        .then(() => {
            store.commit('setUser', { username, pass })
        })
        .catch(err => console.log('login failed: ', err))
}

export default {
    signup,
    login
}