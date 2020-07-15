export class Game {
   constructor() {
      this.squares = Array(9).fill(null);   //игровые клетки
   }

   isSquareFree(index) {   //проверка не занята ли клетка
      return !this.squares[index] ? true : false;
   }

   fillSquare(index, value) {
      this.squares[index] = value; //задать значение клетке
   }

   getAvailableSquares() {    //получить индексы незанятых клеток
      let availableSquares = [];
      this.squares.map((square, index) => {
         if (!square) {
            availableSquares.push(index);    //запись индекса клетки диапазона 0-9 как значение в массив незанятых клетов
         }
      });
      return availableSquares;
   }

   getRandomSquareIndex() {   //получить случайный индексы для хода компьютера из незанятых клеток
      let availableSquares = this.getAvailableSquares();
      //получить случайный индекс клетки в поле 3х3, получив случайный индекс массива незанятых клеток
      let randomSquareIndex = availableSquares[this.getRandomNumber(availableSquares.length - 1)];
      return randomSquareIndex;
   }

   getRandomNumber(n) {  //получить случайное число, n - максимальное необходимое значение
      return Math.floor(Math.random() * (n + 1));
   };

   areNotAllSquaresFilled() {    //есть ли незанятые клетки
      for (let i = 0; i < 9; i++) {
         if (!this.squares[i]) { //если есть хоть одна незанятая, выйти из функции со значением истина
            return true;
         }
      }
      return false;              //не нашлось ни одной свободной клетки
   }

   calculateWinner() {  //определить победителя
      const lines = [   //комбинации выигрыша
         [0, 1, 2],     //1 строка клеток
         [3, 4, 5],     //2 строка клеток
         [6, 7, 8],     //3 строка клеток
         [0, 3, 6],     //1 колонка клеток
         [1, 4, 7],     //2 колонка клеток
         [2, 5, 8],     //3 колонка клеток
         [0, 4, 8],     //диагональ слева направо
         [2, 4, 6]      //диагональ справа
      ];
      for (let i = 0; i < lines.length; i++) {
         const [a, b, c] = lines[i];
         if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
            return this.squares[a];  //возвратить значение победителя (X или O)
         }
      }
      return null;      //победителя нет
   }
}