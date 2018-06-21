import io from "socket.io-client"
import store from "../store/store"
import chessService from './chessService'
import eventBus from './eventBus'
// window.location.origin
// "http://localhost:3003/"
const connectSocket = () => {
  const socket = io(window.location.origin);
  socket.on("gameFound", gameData => {
    // console.log('game has been found', gameData)
    store.commit("joinGame", gameData);
    store.commit('setQue',false)
    socket.on("updateBoard", moveInfo => {
      // console.log('enemy player move info:', moveInfo)
      chessService.moveFromTo(moveInfo.moveFrom, moveInfo.moveTo);
    });

    socket.on("forwardMsg", msgInfo => {
      // console.log('messege received:', msgInfo)
      store.commit("addMsg", msgInfo);
      eventBus.$emit("scrollBottom");
    });
  });
  return socket
}

export default connectSocket

