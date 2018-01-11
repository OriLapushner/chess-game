export default {
    state: {
        board: [],
        turn: null,
        selected:null,
        validMoves:[]
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
            state.selected = piece
        },
        setValidMoves(state,moves){
            for (let i = 0; i < moves.length; i++) {
                state.board[moves[i]].isValidMove = true
                
            }
            state.validMoves.push(...moves)
        },
        setPiece(state,info){
            state.board[info.coordsStr].piece = info.piece
        },
        removeValidMoves(state){
            state.validMoves.forEach(coordsStr => {
                state.board[coordsStr].isValidMove = false
            });
            state.validMoves = []
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