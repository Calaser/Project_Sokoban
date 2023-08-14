import './style.css';
import mapData from '/map.js';


document.querySelector('#app').innerHTML = `
  <button id="decrementBtn">Previous Stage (Q)<br>&#10094;</button>
  <button id="restartBtn">Reset Stage (R)<br>&#8634;</button>
  <button id="incrementBtn">Next Stage (E)<br>&#10095;</button>
  <div class="main">
    <p id="screen">Loading...</p>
    <p id="completeMsg">Congratulations! You just finish this stage.<br>Click stage select button to play other stage.</p>
  </div>
  <div class="Stage Message">
    <p id="stageCounter">Loading Stage</p>
    <button id="menuBtn">Select Stage Menu (M)</button>
    <p id="desc">Loading...</p>
  </div>
  <div class="virtualKeyboard">
    <button id="upBtn"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-up-square" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/> </svg></button>
    <button id="downBtn"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-down-square" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/> </svg></button>
    <button id="leftBtn"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/> </svg></button>
    <button id="rightBtn"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/> </svg></button>
  </div>
  <div class="stageMenuWrapper">
  <button id="closeBtn">✖</button>
  <h1>Stage Select</h1>
    <div class="stageMenu">
    </div>
  </div>
`;

const map = mapData;

let mapIndex = 0;
let currentMap = JSON.parse(JSON.stringify(map[mapIndex]));
let locationX;
let locationY;
let checkIfFinish;

buildMenu(map);

document.querySelector('#menuBtn').addEventListener("click", () => {
  if (document.querySelector('.stageMenuWrapper').style.display === "none")
    document.querySelector('.stageMenuWrapper').style.display = "block";
  else
    document.querySelector('.stageMenuWrapper').style.display = "none";
})

document.querySelector('#closeBtn').addEventListener("click", () => {
  document.querySelector('.stageMenuWrapper').style.display = "none";
})

mapInitialize(0);

document.querySelector('#decrementBtn').addEventListener("click", () => {
  mapInitialize(-1);
})

document.querySelector('#restartBtn').addEventListener("click", () => {
  mapInitialize(0);
})

document.querySelector('#incrementBtn').addEventListener("click", () => {
  mapInitialize(1);
})

document.querySelector('#upBtn').addEventListener("click", () => {
  if (!checkIfFinish) {
    move(0, -1);
    refreshGameInfo();
  }
})

document.querySelector('#downBtn').addEventListener("click", () => {
  if (!checkIfFinish) {
    move(0, 1);
    refreshGameInfo();
  }
})

document.querySelector('#leftBtn').addEventListener("click", () => {
  if (!checkIfFinish) {
    move(-1, 0);
    refreshGameInfo();
  }

})

document.querySelector('#rightBtn').addEventListener("click", () => {
  if (!checkIfFinish) {
    move(1, 0);
    refreshGameInfo();
  }
})

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
    case "ArrowUp":
    case "Numpad8":
      if (checkIfFinish) break;
      move(0, -1);
      break;
    case "KeyS":
    case "ArrowDown":
    case "Numpad2":
      if (checkIfFinish) break;
      move(0, 1);
      break;
    case "KeyA":
    case "ArrowLeft":
    case "Numpad4":
      if (checkIfFinish) break;
      move(-1, 0);
      break;
    case "KeyD":
    case "ArrowRight":
    case "Numpad6":
      if (checkIfFinish) break;
      move(1, 0);
      break;
    case "KeyQ":
      mapInitialize(-1);
      break;
    case "KeyR":
      mapInitialize(0);
      break;
    case "KeyE":
      mapInitialize(1);
      break;
    case "KeyM":
      if (document.querySelector('.stageMenuWrapper').style.display === "none")
        document.querySelector('.stageMenuWrapper').style.display = "block";
      else
        document.querySelector('.stageMenuWrapper').style.display = "none";
      break;
  }
  refreshGameInfo();
})

function buildMenu(map) {
  for (var i = 0; map[i]; i++) {
    var button = document.createElement('button');
    button.id = `stageBtn${i}`;
    button.textContent = `${i + 1}`;
    //use IIFE to catch current i
    button.addEventListener("click", (function (index) {
      return function () {
        mapInitialize(1000 + index);
        document.querySelector('.stageMenuWrapper').style.display = "none";
      }
    })(i));
    document.querySelector('.stageMenu').appendChild(button);
  }
}

function mapInitialize(indexDiff) {
  if (indexDiff >= 1000) {
    mapIndex = indexDiff - 1000;
    indexDiff = 0;
  }
  if (map[mapIndex + indexDiff]) {
    mapIndex += indexDiff;
    currentMap = JSON.parse(JSON.stringify(map[mapIndex]));
    for (var i = 0; i < currentMap.length; i++) {
      for (var j = 0; j < currentMap[i].length; j++) {
        if (currentMap[i][j] === 9) {
          locationX = j;
          locationY = i;
          currentMap[i][j] = 0;
        }
      }
    }
    checkIfFinish = false;
    document.querySelector("#completeMsg").style.display = "none";
    document.querySelector('#desc').innerHTML = `當前位置為(${locationX},${locationY})`;
    document.querySelector('#stageCounter').innerHTML = `Stage ${mapIndex + 1}`;
    document.querySelector('#screen').innerHTML = printScreen(currentMap, locationX, locationY);
  }
}

function move(x, y) {
  if (currentMap[locationY + y][locationX + x] === 0 || currentMap[locationY + y][locationX + x] === 3) {
    if (x) {
      locationX += x;
      locationY += y;
    }
    if (y) {
      locationX += x;
      locationY += y;
    }
  }
  else if (currentMap[locationY + y][locationX + x] === 2) {
    if (currentMap[locationY + 2 * y][locationX + 2 * x] === 0) {
      currentMap[locationY + y][locationX + x] = 0;
      currentMap[locationY + 2 * y][locationX + 2 * x] = 2;
      locationX += x;
      locationY += y;
    }
    else if (currentMap[locationY + 2 * y][locationX + 2 * x] === 3) {
      currentMap[locationY + y][locationX + x] = 0;
      currentMap[locationY + 2 * y][locationX + 2 * x] = 4;
      locationX += x;
      locationY += y;
    }
  }
  else if (currentMap[locationY + y][locationX + x] === 4) {
    if (currentMap[locationY + 2 * y][locationX + 2 * x] === 0) {
      currentMap[locationY + y][locationX + x] = 3;
      currentMap[locationY + 2 * y][locationX + 2 * x] = 2;
      locationX += x;
      locationY += y;
    }
    else if (currentMap[locationY + 2 * y][locationX + 2 * x] === 3) {
      currentMap[locationY + y][locationX + x] = 3;
      currentMap[locationY + 2 * y][locationX + 2 * x] = 4;
      locationX += x;
      locationY += y;
    }
  }
}

function printScreen(map, locationX, locationY) {
  var screen = "";
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (i >= 0 && j >= 0 && map[i] !== undefined && map[i][j] !== undefined)
        if (i === locationY && j === locationX)
          screen += "<span id='me'>我</span>";
        else if (map[i][j] === 0)
          screen += "&emsp;";
        else if (map[i][j] === 1)
          screen += "壁";
        else if (map[i][j] === 2)
          screen += "口";
        else if (map[i][j] === 3)
          screen += "。";
        else if (map[i][j] === 4)
          screen += "回";
        else
          screen += map[i][j];
      else
        screen += "&emsp;";

      if (j === map[i].length - 1)
        screen += "<br>";
    }
  }

  //  center character with partially map print style, use this in rpg or something like that
  // 
  // var screen = "";
  // var screenSize = 4;
  // 
  // for(let i = -screenSize; i <= screenSize; i++){
  //   for(let j = -screenSize; j <= screenSize; j++){
  //     if(locationY+i >= 0 && locationX+j >= 0 && map[locationY+i] !== undefined && map[locationY+i][locationX+j] !== undefined)
  //       if(i === 0 && j === 0)
  //         screen += "。";
  //       else if(map[locationY+i][locationX+j]===1)
  //         screen += "牆";
  //       else if(map[locationY+i][locationX+j]===0)
  //       screen += "&emsp;";
  //       else
  //         screen += map[locationY+i][locationX+j];
  //     else
  //       screen += "&emsp;";

  //     if(j != screenSize)
  //       screen += "&emsp;";
  //     else
  //       screen += "<br>";
  //   }
  // }
  return screen;
}

function refreshGameInfo() {
  document.querySelector('#desc').innerHTML = `當前位置為(${locationX},${locationY})`;
  document.querySelector('#screen').innerHTML = printScreen(currentMap, locationX, locationY);
  checkIfFinish = true;
  for (var i = 0; i < currentMap.length; i++) {
    for (var j = 0; j < currentMap[i].length; j++) {
      if (currentMap[i][j] === 3) {
        checkIfFinish = false;
      }
    }
  }
  if (checkIfFinish) {
    document.getElementById("completeMsg").style.display = "block";
  }
}