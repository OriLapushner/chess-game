export default {
    state: {
        user: null
    },
           
    getters: {

    },
    mutations: {
        setUser(state, { user }) {
            console.log(user)
            state.user = user
        }

    },
    actions: {
    //     login({ commit }, userInfo) {
    //         console.log('commit', commit, 'user info:', userInfo)
    //         UserService.login(userInfo.username, userInfo.pass)
    //             .then(res => commit({ type: 'setUser', user: res.data.user }))

    //     },
    //     signup({ commit }, userDetails) {
    //         console.log(userDetails)
    //         UserService.signup(userDetails).then(user => {
    //             commit({ type: 'setUser', user })
    //         })
    //     },
    // }
    }
}