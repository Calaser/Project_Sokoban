import './style.css';
import mapData from '/map.js';


document.querySelector('#app').innerHTML = `
  <div id="nav">
    <button id="decrementBtn">Previous Stage (Q)<br>&#10094;</button>
    <button id="restartBtn">Reset Stage (R)<br>&#8634;</button>
    <button id="incrementBtn">Next Stage (E)<br>&#10095;</button>
  </div>
  <div id="main">
    <p id="screen">Loading...</p>
    <div id="completeMsg">Congratulations! You just finish this stage.<br>Click stage select button to play other stage.</div>
    <div id="resetAllStageMsg">
      <p>Do you really want to reset all record?</p>
      <button id="resetYes">Yes</button>
      <button id="resetNo">No</button>
    </div>
  </div>
  <div id="navBottom">
    <p id="stageCounter">Loading Stage</p>
    <button id="menuBtn">Select Stage Menu (M)</button>
    <button id="resetAllStageBtn">Reset All Stage</button>
    <p id="desc">Loading...</p>
  </div>
  <div id="virtualKeyboard">
    <button id="upBtn"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-up-square" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/> </svg></button>
    <button id="downBtn"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-down-square" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/> </svg></button>
    <button id="leftBtn"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/> </svg></button>
    <button id="rightBtn"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/> </svg></button>
  </div>
  <div id="stageMenuWrapper">
  <button id="closeBtn">✖</button>
  <h1>Stage Select</h1>
    <div id="stageMenu">
    </div>
  </div>
`;

const map = mapData;

let mapIndex = 0;
let currentMap = JSON.parse(JSON.stringify(map[mapIndex])); //simple deep copy for known data
let locationX;
let locationY;
let checkIfFinish;
let mapClearStatus = [];

//check local storage for past map clean status
if (localStorage.getItem('mapClearStatus'))
  mapClearStatus = JSON.parse(localStorage.getItem('mapClearStatus'));
else
  for (let i = 0; map[i]; i++) {
    mapClearStatus.push(0);
  }

//create menu button according to map data
buildMenu(map);

// window function for buttons
document.querySelector('#menuBtn').addEventListener("click", () => {
  if (document.querySelector('#stageMenuWrapper').style.display !== "block")
    document.querySelector('#stageMenuWrapper').style.display = "block";
  else
    document.querySelector('#stageMenuWrapper').style.display = "none";
})

document.querySelector('#closeBtn').addEventListener("click", () => {
  document.querySelector('#stageMenuWrapper').style.display = "none";
})

document.querySelector('#resetAllStageBtn').addEventListener("click", () => {
  if (document.querySelector('#resetAllStageMsg').style.display !== "block")
    document.querySelector('#resetAllStageMsg').style.display = "block";
  else
    document.querySelector('#resetAllStageMsg').style.display = "none";
})

document.querySelector('#resetYes').addEventListener("click", () => {
  document.querySelector('#resetAllStageMsg').style.display = "none";
  //clean data and local storage
  mapClearStatus = [];
  for (let i = 0; map[i]; i++) {
    mapClearStatus[i] = 0;
    document.querySelector(`#stageBtn${i}`).style.backgroundColor = "#63a9af";
  }
  localStorage.setItem('mapClearStatus', JSON.stringify(mapClearStatus));
  mapInitialize(0);
})

document.querySelector('#resetNo').addEventListener("click", () => {
  document.querySelector('#resetAllStageMsg').style.display = "none";
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

//virtual keyboard function
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

// keyboard function
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
      if (document.querySelector('#stageMenuWrapper').style.display !== "block")
        document.querySelector('#stageMenuWrapper').style.display = "block";
      else
        document.querySelector('#stageMenuWrapper').style.display = "none";
      break;
  }
  refreshGameInfo();
})

//create menu button according to map data
function buildMenu(map) {
  for (var i = 0; map[i]; i++) {
    var button = document.createElement('button');
    button.id = `stageBtn${i}`;
    button.textContent = `${i + 1}`;
    if (mapClearStatus[i])
      button.style.backgroundColor = "#cce70f";
    button.addEventListener("click", (function (index) {
      return function () {
        mapInitialize(1000 + index);
        document.querySelector('#stageMenuWrapper').style.display = "none";
      }
    })(i));
    document.querySelector('#stageMenu').appendChild(button);
  }
}

//initialize map according to argument
//normally argument will be different between new map and current map  ex: -1=previous map  0=no map change  1=next map
//this function can also go to specified map if argument >= 1000, format = 1000 + stage
function mapInitialize(indexDiff) {
  if (indexDiff >= 1000) {
    mapIndex = indexDiff - 1000;
    indexDiff = 0;
  }
  if (map[mapIndex + indexDiff]) {
    mapIndex += indexDiff;
    currentMap = JSON.parse(JSON.stringify(map[mapIndex])); // copy map from data
    for (let i = 0; i < currentMap.length; i++) {
      for (let j = 0; j < currentMap[i].length; j++) {
        if (currentMap[i][j] === 9) { //check and record starting location
          locationX = j;
          locationY = i;
          currentMap[i][j] = 0;
        }
      }
    }
    checkIfFinish = false;
    document.querySelector("#completeMsg").style.display = "none";
    document.querySelector('#desc').innerHTML = `當前位置為(${locationX},${locationY})`;
    if (mapClearStatus[mapIndex]) {
      document.querySelector('#stageCounter').innerHTML = `<svg style="color: #f3da35; transform: translate(-5px, 15px);" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12 6.44772 12.4477 6 13 6H35C35.5523 6 36 6.44772 36 7V8H41C41.5523 8 42 8.44772 42 9V15C42 17.7614 39.7614 20 37 20H35.3172C33.8847 24.0529 30.3367 27.1065 26 27.8341V34H32C32.5523 34 33 34.4477 33 35V41C33 41.5523 32.5523 42 32 42H16C15.4477 42 15 41.5523 15 41V35C15 34.4477 15.4477 34 16 34H22V27.8341C17.6633 27.1065 14.1153 24.0529 12.6828 20H11C8.23858 20 6 17.7614 6 15V9C6 8.44772 6.44772 8 7 8H12V7ZM36 16V10H40V15C40 16.6569 38.6569 18 37 18H36V16ZM12 10H8V15C8 16.6569 9.34315 18 11 18H12V16V10Z" fill="#f3da35"></path> </svg>`;
    } else
      document.querySelector('#stageCounter').innerHTML = '';
    document.querySelector('#stageCounter').innerHTML += `Stage ${mapIndex + 1}`;

    document.querySelector('#screen').innerHTML = printScreen(currentMap, locationX, locationY);
  }
}

// 0:空 1:牆 2:箱 3:終點 4:箱子on終點
//argument x=正往右負往左 y=正往下負往上
function move(x, y) {
  //空地的場合
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
  //推箱子的場合 判定箱子後面空/終點才會推
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
  //推箱子on終點 判定同箱子 後面空/終點才會推
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

//render function
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

// in-game information refresh
// call after player move
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
    if (!mapClearStatus[mapIndex]) {
      document.getElementById(`stageBtn${mapIndex}`).style.backgroundColor = "#f3da35";
      mapClearStatus[mapIndex] = 1;
      localStorage.setItem('mapClearStatus', JSON.stringify(mapClearStatus));
    }
  }
}