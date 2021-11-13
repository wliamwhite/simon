var simonList = [0];
var userList = [0];
var level = 0;

$("h6").on("click", onStartUp);

function onStartUp() {
  $("h6").text("initiating...");
  $(".tile-set button").on("mousedown", userInteractionClick);
  $(".tile-set button").on("mouseup", userInteractionClickUp);
  $(document).on("keydown", userInteractionKey);
  $(document).on("keyup", userInteractionKeyUp);
  $("h6").off()
  setTimeout(generateGame, 1000);
}

function userInteractionClick(e) {
  console.log(e);
  var userNum = setCharToNum(this.innerHTML);
  userList.push(userNum);

  userPressed(userNum);

  console.log("userList: " + userList);

  compareRecent(userList.length-1);
}

function userInteractionClickUp() {
  var userNum = setCharToNum(this.innerHTML);

  userRelease(userNum);
}

function userInteractionKey(key) {
  var userNum = setCharToNum(key.key.toLowerCase());

  console.log("userList: " + userList);
  if (userNum !== 4) {
    userList.push(userNum);
    userPressed(userNum);
    compareRecent(userList.length-1);
  }
}

function userInteractionKeyUp(key) {
  var userNum = setCharToNum(key.key.toLowerCase());

  userRelease(userNum);
}


function generateGame() {
  $("h6").text("game on");
  var randomNum = Math.floor(Math.random() * 4);
  simonList.push(randomNum)
  console.log("simonList: " + simonList);
  setTimeout(simonSelector(randomNum), 5000);
}

function compareRecent(currentLevel) {
  if (simonList[currentLevel] === userList[currentLevel]) {
    if (simonList.length === userList.length) {
      userList = [0];
      level++;
      $(".level").text("level " + level);
      setTimeout(generateGame, 1000);
    }
  } else {
    level = 0;
    $(".level").text("");
    $("h6").text("loser :/");
    userRelease(userList[currentLevel]);
    $(document).off();
    $(".tile-set button").off();
    setTimeout(startOver, 2000);
  }
}

function simonSelector(randomNum) {
  switch(randomNum) {
    case 0:
      $("button.red").addClass("red-selected tile-selected");
      setTimeout(() => {$("button.red-selected").removeClass("red-selected tile-selected")}, 500);
    break;
    case 1:
      $("button.blue").addClass("blue-selected tile-selected");
      setTimeout(() => {$("button.blue-selected").removeClass("blue-selected tile-selected")}, 500);
    break;
    case 2:
      $("button.green").addClass("green-selected tile-selected");
      setTimeout(() => {$("button.green-selected").removeClass("green-selected tile-selected")}, 500);
    break;
    case 3:
      $("button.yellow").addClass("yellow-selected tile-selected");
      setTimeout(() => {$("button.yellow-selected").removeClass("yellow-selected tile-selected")}, 500);
    break;
    default:
      console.log("generateGame() default triggered");
    break;
  }
}

function userPressed(userNum) {
  switch(userNum) {
    case 0:
      $("button.red").addClass("red-pressed");
    break;
    case 1:
      $("button.blue").addClass("blue-pressed");
    break;
    case 2:
      $("button.green").addClass("green-pressed");
    break;
    case 3:
      $("button.yellow").addClass("yellow-pressed");
    break;
    default:
      console.log("generateGame() default triggered");
    break;
  }
}

function userRelease(userNum) {
  switch(userNum) {
    case 0:
      $("button.red").removeClass("red-pressed");
    break;
    case 1:
      $("button.blue").removeClass("blue-pressed");
    break;
    case 2:
      $("button.green").removeClass("green-pressed");
    break;
    case 3:
      $("button.yellow").removeClass("yellow-pressed");
    break;
    default:
      console.log("generateGame() default triggered");
    break;
  }
}

function setCharToNum(c) {
  var userNum;
  if (c === "q"){
    userNum = 0;
  } else if (c === "w") {
    userNum = 1;
  } else if (c === "a") {
    userNum = 2;
  } else if (c === "s") {
    userNum = 3;
  } else {
    userNum = 4;
  }
  return userNum;
}

function startOver() {
  $("h6").text("click here to begin again");
  simonList = [0];
  userList = [0];
  $("h6").on("click", onStartUp);
}
