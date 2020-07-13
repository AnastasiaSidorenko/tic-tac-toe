//import { Array_Generator } from "./Game.js"
import { Game } from "./Game.js"

class Controller {
   constructor(gameNumber, winner) {
      this.gameNumber = gameNumber;
      this.winner = winner;
      this.currentGame = new Game(this.gameNumber + 1, winner)
   }

   makeMove(index) {
      // console.log("node", evt.currentTarget);
      console.log("index", index);
      console.log("square", squares[index].nodeValue);
      squares[index].innerHTML = index;
      this.currentGame.fillSquare(index);

      console.log("available Squares", this.currentGame.getAvailableSquares());
      /*console.log("i square", i);
      console.log("target value i:", i, event.target.value);*/
   };

   makeSystemMove() {

   }

   startGame() {
      let game = new Game(this.gameNumber + 1);

   }
}

let body = document.body;

var squares = document.getElementsByClassName("square");
console.log("squares", squares)

let Games = new Controller(0, "user") //to start the first game

for (let i = 0; i < squares.length; i++) {
   squares[i].addEventListener("click", function () { Games.makeMove(i); }, false);
}
