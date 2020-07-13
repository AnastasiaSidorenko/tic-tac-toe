export class Game {
   constructor(number, initiator) {
      this.gameNumber = number;
      this.whoMakeFirstStep = initiator;
      this.squares = Array(9).fill(null);
   }

   getAvailableSquares() {
      return this.squares.map((square, index) => {
         if (square !== null) {
            return index;
         }
      });
   }

   fillSquare(index) {
      console.log("fillingSquare", index);
      this.squares[index] = true;
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