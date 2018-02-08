export default {
    state: {
        board: [],
        gameId: null,
        turn: null,
        playerColor: null,
        selected:null,
        validMoves:[],
        msgToPlayer: '',
        isOnline: false
    },
           
    getters: {

    },
    mutations: {
        setBoard(state, board) {
            state.board = board
        },
        setPlayerTurn(state,currTurn){
            state.turn = currTurn
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
        },
        joinGame(state,{color,gameId}){
            // console.log('join game info:',gameInfo)
            state.playerColor = color
            state.gameId = gameId
            state.msgToPlayer = 'white player turn'
            state.turn = 'white'
            state.isOnline = true
        },
        
    }
}