//import { Game } from "./Game.js"
import { Controller } from "./Controller.js"

let squares = document.getElementsByClassName("square"); //узлы клеток игрового поля
let restart_button = document.querySelector("#restart_button"); //кнопка перехода к следующему раунду
let history_list = document.querySelector("#history__list"); //история игр

let user_count = document.querySelector("#user_count");  //узел итогового счета игрока
let system_count = document.querySelector("#system_count"); //узел итогового счета компьютера

let Games = new Controller("system", squares, history_list, restart_button, user_count, system_count) //запустить игру

restart_button.addEventListener("click", Games.restartGame, false);  //запуск новой игры по клику на "Сыграть еще"

for (let i = 0; i < squares.length; i++) {
   squares[i].addEventListener("click", function () { Games.makeMove(i); }, false);
}
