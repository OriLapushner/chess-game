export default {
    state: {
        board: [],
        turn: null,
        selected:null,
        avaibleMoves: []
    },
           
    getters: {

    },
    mutations: {
        setBoard(state, board) {
            state.board = board
        },
        setPlayerTurn(state,player){
            state.turn = player
        },
        setSelected(state, piece){
            console.log('updating selected to:',piece)
            state.selected = piece
        },
        setAvaibleMoves(state,moves){
            state.avaibleMoves.push(moves)
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