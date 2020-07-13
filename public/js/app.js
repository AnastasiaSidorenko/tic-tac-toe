//import { Array_Generator } from "./Game.js"
import { Game } from "./Game.js"

class Controller {
   constructor(gameNumber, winner, squares, history_list, restart_button) {
      this.gameNumber = gameNumber;
      this.winner = winner;
      this.squares = squares;
      this.history_list = history_list;
      this.restart_button = restart_button;

      this.currentGame = new Game();
      this.init();
   }

   init() {
      if (this.winner === "system") {
         this.makeSystemMove();
      }
   }

   makeMove(index) {
      //console.log("calculate Winner", this.calculateWinner(this.currentGame.getSquares()));

      let currentWinner = this.currentGame.calculateWinner();

      if (!currentWinner && this.currentGame.areNotAllSquaresFilled()) {

         console.log("index", index);
         console.log("square", squares[index].nodeValue);

         //squares[index].innerHTML = index;
         this.currentGame.fillSquare(index, "X");
         this.fillNode(index, "X");

         setTimeout(() => {
            this.makeSystemMove();  //запустить ход компьютера
         }, 700);
      }
      // console.log("node", evt.currentTarget);
      else {

         if (!currentWinner) this.addHistoryEntry("tie");
         else this.addHistoryEntry(currentWinner);

         this.showRestartButton();
      }
   };

   makeSystemMove() {
      //console.log("calculate Winner", this.calculateWinner(this.currentGame.getSquares()));
      //let winner = calculateWinner(this.currentGame.getSquares());
      let currentWinner = this.currentGame.calculateWinner();

      if (!currentWinner && this.currentGame.areNotAllSquaresFilled()) {

         let index = this.currentGame.getRandomSquareIndex();
         this.currentGame.fillSquare(index, "O");
         this.fillNode(index, "O");

         console.log("getSquares", this.currentGame.getSquares());
         console.log("calculate Winner", this.currentGame.calculateWinner());
      }

      else {

         if (!currentWinner) this.addHistoryEntry("tie");
         else this.addHistoryEntry(currentWinner);

         this.showRestartButton();
      }

   }

   showRestartButton() {
      this.restart_button.style.display = "block";
   }

   hideRestartButton() {
      this.restart_button.style.display = "none";
   }

   fillNode(index, value) {
      this.squares[index].innerHTML = value;
   }

   addHistoryEntry(winner) {
      let li = document.createElement('li');
      if ("tie") li.nodeValue = "Ничья";
      if ("X") {
         li.nodeValue = "Ваша победа";
         user_count.nodeValue = user_count.nodeValue + 1;
         this.winner = "user";
      }
      if ("O") {
         li.nodeValue = "Победа компьютера";
         system_count.nodeValue = system_count.nodeValue + 1;
         this.winner = "system";
      }
      this.history_list.appendChild(li);
   }

   restartGame = () {
      //this.currentGame = new Game(this.gameNumber + 1, winner, restart_button);
      console.log("pass restart_button", this.restart_button);
      this.currentGame = new Game(this.restart_button);
      this.hideRestartButton();
      this.init();
   }

   /*calculateWinner(squares) {
      const lines = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],
         [0, 4, 8],
         [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
         const [a, b, c] = lines[i];
         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
         }
      }
      return null;
   }*/

}

let body = document.body;

let squares = document.getElementsByClassName("square");
console.log("squares", squares);
let restart_button = document.querySelector("#restart_button");

let history_list = document.querySelector("#history__list");
console.log("history_list app.js", history_list);

let user_count = document.querySelector("#user_count");
let system_count = document.querySelector("#user_count");

let Games = new Controller(0, "user", squares, history_list, restart_button) //to start the first game
restart_button.addEventListener("click", Games.restartGame, false);

for (let i = 0; i < squares.length; i++) {
   squares[i].addEventListener("click", function () { Games.makeMove(i); }, false);
}
