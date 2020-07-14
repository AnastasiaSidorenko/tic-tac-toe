export class Game {
   //constructor(number, initiator, restart_button) {
   constructor() {
      //this.gameNumber = number;
      //this.whoMakeFirstStep = initiator;
      this.squares = Array(9).fill(null);
      // this.nodeSquares = document.getElementsByClassName("square");
   }

   getSquares() {
      return this.squares;
   }

   fillSquare(index, value) {
      console.log("fillingSquare", index);
      this.squares[index] = value;
   }

   getAvailableSquares() {
      let availableSquares = [];
      this.squares.map((square, index) => {
         if (!square) {
            availableSquares.push(index);
         }
      });
      console.log("availableSquares", availableSquares);
      return availableSquares;
   }

   getRandomSquareIndex() {
      let availableSquares = this.getAvailableSquares();
      console.log("available Squares", availableSquares);
      let randomSquareIndex = availableSquares[this.getRandomNumber(availableSquares.length - 1)];
      console.log(randomSquareIndex);
      return randomSquareIndex;
   }

   getRandomNumber(n) {  // n - максимальное необходимое значение
      return Math.floor(Math.random() * (n + 1));
   };

   areNotAllSquaresFilled() {
      for (let i = 0; i < 9; i++) {
         if (!this.squares[i]) {
            return true;
         }
      }
      return false;
   }

   calculateWinner() {
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
         if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
            return this.squares[a];
         }
      }
      return null;
   }

   /*sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   };

   async Sort(arr) {
      for (var i = 0, endI = arr.length - 1; i < endI; i++) {
         for (var j = 0, endJ = endI - i; j < endJ; j++) {
            if (arr[j] > arr[j + 1]) {
               let swap = arr[j];
               arr[j] = arr[j + 1];
               arr[j + 1] = swap;

               await this.sleep(1000);*/
}