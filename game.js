// alert("test!");
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//Флаг для проверки началась игра или нет, если началась. Для вызова функции nextSequence() только при
//первом нажатии клавиши.
var started = false;

//Уровень
var level = 0;

//Ожидание нажатие кнопка А.
$(document).keydown(function () {
  if (!started) {
    //проверяем запущена ли игра, смотрим на флаг.

    //Меняем надпись когда была начата игра и нажата клавиша.
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

//Играем звук при клике
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id"); //получаем значение цвета из выбраной нажатой кнопки
  userClickedPattern.push(userChosenColour); //записываем в массив.

  playSound(userChosenColour); //играем соответствующий файл
  animatePress(userChosenColour); //анимация кнопки при нажатии

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game-Over, нажмите любую клавишу для рестарта.");
    startOver();
  }
}

//функция генерации случайного числа
function nextSequence() {
  userClickedPattern = [];
  //переключаем уровень
  level++;

  //меняем заголовок
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4); //генерим случайное число
  var randomChosenColour = buttonColours[randomNumber]; //получаем из случайного числа, случайный цвет.
  gamePattern.push(randomChosenColour); //записываем его в массив

  //Воспроизводим анимацию для кнопки
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  //играем соответствующий звук
  playSound(randomChosenColour);
}
//Функция воспроизведения нужного звука
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

//Анимация кнопок
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
