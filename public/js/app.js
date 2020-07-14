//import { Array_Generator } from "./Game.js"
import { Game } from "./Game.js"

class Controller {
   constructor(gameNumber, winner, squares, history_list, restart_button, user_count, system_count) {
      this.gameNumber = gameNumber;
      this.winner = winner;
      this.squares = squares;
      this.history_list = history_list;
      this.restart_button = restart_button;
      this.user_count = 0;
      this.user_countNode = user_count;
      this.system_count = 0;
      this.system_countNode = system_count;

      this.currentGame = new Game();
      this.init();
   }

   init() {
      if (this.winner === "system") {
         this.makeSystemMove();
         console.log("ХОДИТ КОМПЬЮТЕР");
      }
   }

   makeMove = (index) => {
      //console.log("calculate Winner", this.calculateWinner(this.currentGame.getSquares()));

      /* let currentWinner = this.currentGame.calculateWinner();
 
       if (!currentWinner && this.currentGame.areNotAllSquaresFilled()) {
 
          console.log("index", index);
          console.log("square", squares[index].nodeValue);
 
          //squares[index].innerHTML = index;
          this.currentGame.fillSquare(index, "X");
          this.fillNode(index, "X");
 
          let winnerAfterMove = this.currentGame.calculateWinner();
          if (winnerAfterMove) {
             this.addHistoryEntry(winnerAfterMove);
             this.showRestartButton();
          }
 
          else {
             setTimeout(() => {
                this.makeSystemMove();  //запустить ход компьютера
             }, 700);
          }
 
          /*setTimeout(() => {
             this.makeSystemMove();  //запустить ход компьютера
          }, 700);
       }
       // console.log("node", evt.currentTarget);
       else {
 
          if (!currentWinner) this.addHistoryEntry("tie");
          else this.addHistoryEntry(currentWinner);
 
          console.log("winner", currentWinner);
 
          this.showRestartButton();
       }*/

      //let currentWinner = this.currentGame.calculateWinner();

      if (this.currentGame.areNotAllSquaresFilled()) {

         console.log("index", index);
         console.log("square", squares[index].nodeValue);

         //squares[index].innerHTML = index;
         this.currentGame.fillSquare(index, "X");
         this.fillNode(index, "X");

         let winnerAfterMove = this.currentGame.calculateWinner();
         if (winnerAfterMove) {
            this.addHistoryEntry(winnerAfterMove);
            this.showRestartButton();
         }
         else
            if (!this.currentGame.areNotAllSquaresFilled()) {
               this.addHistoryEntry("tie");
               console.log("НИЧЬЯ 87");
               this.showRestartButton();
            }
            else {
               setTimeout(() => {
                  this.makeSystemMove();  //запустить ход компьютера
               }, 700);
            }

         /*setTimeout(() => {
            this.makeSystemMove();  //запустить ход компьютера
         }, 700);*/
      }
      // console.log("node", evt.currentTarget);
      else {

         this.addHistoryEntry("tie");
         //else this.addHistoryEntry(currentWinner);
         this.showRestartButton();

      }
   };

   makeSystemMove = () => {
      //console.log("calculate Winner", this.calculateWinner(this.currentGame.getSquares()));
      //let winner = calculateWinner(this.currentGame.getSquares());
      /*let currentWinner = this.currentGame.calculateWinner();

      if (!currentWinner && this.currentGame.areNotAllSquaresFilled()) {

         let index = this.currentGame.getRandomSquareIndex();
         this.currentGame.fillSquare(index, "O");
         this.fillNode(index, "O");

         console.log("getSquares", this.currentGame.getSquares());
         console.log("calculate Winner", this.currentGame.calculateWinner());

         let winnerAfterMove = this.currentGame.calculateWinner();
         if (winnerAfterMove) {
            this.addHistoryEntry(winnerAfterMove);
            this.showRestartButton();
         }

      }

      else {

         if (!currentWinner) this.addHistoryEntry("tie");
         else this.addHistoryEntry(currentWinner);

         console.log("winner", currentWinner);

         this.showRestartButton();
      }*/

      if (this.currentGame.areNotAllSquaresFilled()) {

         let index = this.currentGame.getRandomSquareIndex();
         this.currentGame.fillSquare(index, "O");
         this.fillNode(index, "O");

         console.log("getSquares", this.currentGame.getSquares());
         console.log("calculate Winner", this.currentGame.calculateWinner());

         let winnerAfterMove = this.currentGame.calculateWinner();
         if (winnerAfterMove) {
            this.addHistoryEntry(winnerAfterMove);
            this.showRestartButton();
         }
         else
            if (!this.currentGame.areNotAllSquaresFilled()) {
               this.addHistoryEntry("tie");
               console.log("НИЧЬЯ 158");
               this.showRestartButton();
            }
      }

      else {

         this.addHistoryEntry("tie");
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

   cleanSquareNodes() {
      for (let i = 0; i < 9; i++) {
         this.squares[i].innerHTML = "";
      }
   }

   addHistoryEntry = (winner) => {
      let li = document.createElement('li');
      if (winner === "tie") { li.innerHTML = "Ничья"; this.winner = "user"; }
      if (winner === "X") {
         li.innerHTML = "Ваша победа";
         this.user_count = this.user_count + 1;
         this.user_countNode.innerHTML = this.user_count;
         this.winner = "user";
      }
      if (winner === "O") {
         li.innerHTML = "Победа компьютера";
         this.system_count = this.system_count + 1;
         this.system_countNode.innerHTML = this.system_count;
         this.winner = "system";
      }
      console.log(li);
      this.history_list.appendChild(li);
   }

   restartGame = () => {
      this.currentGame = new Game();
      this.cleanSquareNodes();
      this.hideRestartButton();
      this.init();
   }
}

let body = document.body;

let squares = document.getElementsByClassName("square");
console.log("squares", squares);
let restart_button = document.querySelector("#restart_button");

let history_list = document.querySelector("#history__list");
console.log("history_list app.js", history_list);

let user_count = document.querySelector("#user_count");
let system_count = document.querySelector("#system_count");

let Games = new Controller(0, "system", squares, history_list, restart_button, user_count, system_count) //to start the first game
restart_button.addEventListener("click", Games.restartGame, false);

for (let i = 0; i < squares.length; i++) {
   squares[i].addEventListener("click", function () { Games.makeMove(i); }, false);
}
