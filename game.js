// alert("test!");
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//функция генерации случайного числа
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);

  //Записываем в массим полученный случайный цвет
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  level++;
  $("h1").text("level " + level);
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
$(document).on("keydown", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
