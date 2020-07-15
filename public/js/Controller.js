import { Game } from "./Game.js"

export class Controller {
   constructor(winner, squares, history_list, restart_button, user_count, system_count) {
      this.winner = winner;                 //победитель игры (для запуска первого хода компьютера)
      this.squares = squares;               //узлы клеток игрового поля
      this.history_list = history_list;     //узел истории игр 
      this.restart_button = restart_button; //узел кнопки перехода к следующему раунду
      this.user_count = 0;                  //итоговый счет игрока
      this.user_countNode = user_count;     //узел итогового счета игрока
      this.system_count = 0;                //итоговый счет компьютера
      this.system_countNode = system_count; //узел итогового счета компьютера

      this.currentGame = new Game();       //текущая игра
      this.init();
   }

   init() {
      if (this.winner === "system") {
         //this.makeSystemMove();                 //запуск первого хода компьютера
         setTimeout(() => {
            this.makeSystemMove();  //запуск первого хода компьютера
         }, 300);
      }
   }

   makeMove = (index) => {
      //кликнутая клетка не занята
      if (this.currentGame.isSquareFree(index)) {

         this.currentGame.fillSquare(index, "X"); //задать элементу массива клеток игры значения
         this.fillNode(index, "X");   //задать значение узла (index.html)

         let winnerAfterMove = this.currentGame.calculateWinner(); //определить есть ли победитель после сделанного хода

         if (winnerAfterMove) {                       //если есть
            this.addHistoryEntry(winnerAfterMove);    //добавить запись в историю игр
            this.showRestartButton();                 //отобразить кнопку запуска следующего раунда
         }
         else  //нет победителя и все игровые клетки заполнены
            if (!this.currentGame.areNotAllSquaresFilled()) {
               this.addHistoryEntry("tie");     //добавить запись о ничье
               this.showRestartButton();        //отобразить кнопку запуска следующего раунда
            }
            else {
               setTimeout(() => {
                  this.makeSystemMove();  //запустить ход компьютера
               }, 700);
            }
      }
   };

   makeSystemMove = () => {
      let index = this.currentGame.getRandomSquareIndex();  //получить случайный индекс для хода

      this.currentGame.fillSquare(index, "O");              //задать элементу массива клеток игры значения
      this.fillNode(index, "O");                            //задать значение узла (index.html)  

      let winnerAfterMove = this.currentGame.calculateWinner();   //определить есть ли победитель после сделанного хода

      if (winnerAfterMove) {                                //если есть
         this.addHistoryEntry(winnerAfterMove);             //добавить запись в историю игр
         this.showRestartButton();                          //отобразить кнопку запуска следующего раунда
      }
      else //нет победителя и все игровые клетки заполнены
         if (!this.currentGame.areNotAllSquaresFilled()) {
            this.addHistoryEntry("tie");        //добавить запись о ничье
            this.showRestartButton();           //отобразить кнопку запуска следующего раунда
         }
   }

   showRestartButton() {
      this.restart_button.style.display = "block";   //сделать видимой кнопку запуска следующего раунда
   }

   hideRestartButton() {
      this.restart_button.style.display = "none";     //скрыть кнопку запуска следующего раунда
   }

   fillNode(index, value) {
      this.squares[index].innerHTML = value;          //задать значение узла (index.html)          
   }

   cleanSquareNodes() {                               //очистить узлы клеток игрового поля (index.html)  
      for (let i = 0; i < 9; i++) {
         this.squares[i].innerHTML = "";
      }
   }

   addHistoryEntry = (winner) => {
      let li = document.createElement('li');

      if (winner === "tie") {
         li.innerHTML = "Ничья";                     //содержимое записи в истории игр
         this.winner = "system";                     //чтобы после ничьи ходил компьютер
      }
      if (winner === "X") {                         //победитель компьютер (ходит крестиком)
         li.innerHTML = "Ваша победа";              //содержимое записи в истории игр
         this.user_count = this.user_count + 1;
         this.user_countNode.innerHTML = this.user_count;  //увеличение значения итогового счета игрока
         this.winner = "user";                             //чтобы первым ходил пользователь
      }
      if (winner === "O") {                         //победитель компьютер (ходит ноликом)
         li.innerHTML = "Победа компьютера";        //содержимое записи в истории игр
         this.system_count = this.system_count + 1;
         this.system_countNode.innerHTML = this.system_count;  //увеличение значения итогового счета компьютера
         this.winner = "system";                    //чтобы первым ходил пользователь
      }
      this.history_list.appendChild(li);           //добавление записи результата игры в историю игр
   }

   restartGame = () => {
      this.currentGame = new Game();               //новая игра
      this.cleanSquareNodes();                     //очистка клеток игрового поля
      this.hideRestartButton();                    //сокрыть кнопку перехода к следующему раунду
      this.init();                                 //запуск первого хода компьютера, если ничья или проигрыш пользователя
   }
}