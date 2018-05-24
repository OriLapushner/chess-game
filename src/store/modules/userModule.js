export default {
    state: {
        user:
        {
            username: '',
            pass: '',
        }
    },
           
    getters: {
        isLoggedIn(state){
            return (state.user.username !== '')
        },
        navSignupText(state){
            if(state.user.username === '') return 'Signup'
            else return 'My Account'
        },
        navSignupRoute(state){
            if(state.user.username === '') return '/signup'
            else return '/changepass'
        }
    },
    mutations: {
        setUser(state,user) {
            // console.log(user)
            state.user = user
        }
    },
    actions: {
        login({ commit }, userInfo) {
            console.log('commit', commit, 'user info:', userInfo)
                .then(res => commit({ type: 'setUser', user: res.data.user }))

        },
        signup({ commit }, userDetails) {
            console.log(userDetails)
            UserService.signup(userDetails).then(user => {
                commit({ type: 'setUser', user })
            })
        },
    }
}
