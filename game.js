// alert("test!");
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//функция генерации случайного числа
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Записываем в массим полученный случайный цвет
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

//Играем звук при клике
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

//Функция воспроизведения нужного звука
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play().catch(function (err) {
    console.error("Ошибка проигрывания звука:", err);
  });
}

//Анимация кнопок
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Ожидание нажатие кнопка А.
$(document).on("keyDown", function (e) {
  var keyP = "a";
  if (e.key === keyP) {
    nextSequence();
  }
});
