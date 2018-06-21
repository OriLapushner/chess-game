export default {
  state: {
    castling: {
      white: {
        king: true,
        short: true,
        long: true
      },
      black: {
        short: true,
        long: true,
        king: true
      }
    },
    board: [],
    gameId: null,
    turn: null,
    playerColor: null,
    selected: null,
    whiteEaten: [],
    blackEaten: [],
    validMoves: [],
    messages: [],
    isOnline: false,
    winner: null,
    isQued: false
  },

  getters: {},
  mutations: {
    setQue(state,isQued){
      state.isQued = isQued
    },
    setWinner(state,winner){
      state.winner = winner
    },
    setCastling(state, { color, type, value }) {
      // console.log('color: ',color,'type: ',type,'value: ',value)
      state.castling[color][type] = value;
    },
    setBoard(state, board) {
      state.board = board;
    },
    setPlayerTurn(state, currTurn) {
      state.turn = currTurn;
    },
    setSelected(state, piece) {
      state.selected = piece;
    },
    setValidMoves(state, moves) {
      for (let i = 0; i < moves.length; i++) {
        state.board[moves[i]].isValidMove = true;
      }
      state.validMoves.push(...moves);
    },
    setPiece(state, info) {
      state.board[info.coordsStr].piece = info.piece;
    },
    removeValidMoves(state) {
      state.validMoves.forEach(coordsStr => {
        state.board[coordsStr].isValidMove = false;
      });
      state.validMoves = [];
    },
    addEaten(state, eaten) {
      if (eaten.name[0] === "w") state.whiteEaten.push(eaten);
      else state.blackEaten.push(eaten);
    },
    joinGame(state, { color, gameId }) {
      // console.log('join game info:',gameInfo)
      state.playerColor = color;
      state.gameId = gameId;
      state.turn = "white";
      state.isOnline = true;
    },
    addMsg(state, msg) {
      state.messages.push(msg);
    }
  }
};
