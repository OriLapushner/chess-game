function getNewBoard(){
    var board = {};
    var lettersPull = ['a','b','c','d','e','f','g','h']
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            var index = (i + 1) + '-'+ lettersPull[j]
            var color  = (i + j) % 2 ? 'black' : 'white';
            board[index] = {
                color
            }
            
        }
        
    }

   return board
}
export default {
    getNewBoard
}