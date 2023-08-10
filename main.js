import './style.css'

document.querySelector('#app').innerHTML = `
<div>
  <div class="header">
    <button id="decrementBtn">Previos Stage</button>
    <p id="stageCounter">Stage 1</p>
    <button id="incrementBtn">Next Stage</button>
  </div>
  <div class="card">
    <p id="screen">Loading...</button>
    <p id="desc">Loading...</button>
  </div>
</div>
`;

let mapIndex = 0;
let locationX;
let locationY;
let checkIfFinish = false;
const map = [
  [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1],
    [1, 3, 9, 2, 0, 0, 1, 1],
    [1, 1, 1, 0, 2, 3, 1, 1],
    [1, 3, 1, 1, 2, 0, 1, 1],
    [1, 0, 1, 0, 3, 0, 1, 1],
    [1, 2, 0, 4, 2, 2, 3, 1],
    [1, 0, 0, 0, 3, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 2, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 1],
    [1, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 9, 1, 1, 1, 1, 0, 0, 3, 3, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 3, 3, 0, 0, 1, 0, 2, 0, 0, 2, 0, 0, 1],
    [1, 3, 3, 0, 0, 1, 2, 1, 1, 1, 1, 0, 0, 1],
    [1, 3, 3, 0, 0, 0, 0, 9, 0, 1, 1, 0, 0, 1],
    [1, 3, 3, 0, 0, 1, 0, 1, 0, 0, 2, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 0, 2, 0, 1],
    [1, 1, 1, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
];

let currentMap = JSON.parse(JSON.stringify(map[mapIndex]));

for (var i = 0; i < currentMap.length; i++) {
  for (var j = 0; j < currentMap[i].length; j++) {
    if (currentMap[i][j] === 9) {
      locationX = j;
      locationY = i;
      currentMap[i][j] = 0;
    }
  }
  checkIfFinish = false;
}

document.querySelector('#decrementBtn').addEventListener("click", () => {
  if (map[mapIndex - 1]) {
    currentMap = JSON.parse(JSON.stringify(map[--mapIndex]));
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
    document.querySelector('#stageCounter').innerHTML = `Stage ${mapIndex + 1}`;
    document.querySelector('#screen').innerHTML = printScreen(currentMap, locationX, locationY);
  }
})

document.querySelector('#incrementBtn').addEventListener("click", () => {
  if (map[mapIndex + 1]) {
    currentMap = JSON.parse(JSON.stringify(map[++mapIndex]));
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
    document.querySelector('#stageCounter').innerHTML = `Stage ${mapIndex + 1}`;
    document.querySelector('#screen').innerHTML = printScreen(currentMap, locationX, locationY);
  }
})


document.querySelector('#desc').innerHTML = `當前位置為(${locationX},${locationY})`;
document.querySelector('#screen').innerHTML = printScreen(currentMap, locationX, locationY);
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
  }
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
})

function move(x, y) {
  if (currentMap[locationY + y][locationX + x] === 0 || currentMap[locationY + y][locationX + x] === 3) {
    if (x){
      locationX+= x;
      locationY+= y;
    }
    if (y){
      locationX+= x;
      locationY+= y;
    }
  }
  else if (currentMap[locationY + y][locationX + x] === 2) {
    if (currentMap[locationY + 2 * y][locationX + 2 * x] === 0) {
      currentMap[locationY + y][locationX + x] = 0;
      currentMap[locationY + 2 * y][locationX + 2 * x] = 2;
        locationX+= x;
        locationY+= y;
    }
    else if (currentMap[locationY + 2 * y][locationX + 2 * x] === 3) {
      currentMap[locationY + y][locationX + x] = 0;
      currentMap[locationY + 2 * y][locationX + 2 * x] = 4;
      locationX+= x;
      locationY+= y;
    }
  }
  else if (currentMap[locationY + y][locationX + x] === 4) {
    if (currentMap[locationY + 2 * y][locationX + 2 * x] === 0) {
      currentMap[locationY + y][locationX + x] = 3;
      currentMap[locationY + 2 * y][locationX + 2 * x] = 2;
      locationX+= x;
      locationY+= y;
    }
    else if (currentMap[locationY + 2 * y][locationX + 2 * x] === 3) {
      currentMap[locationY + y][locationX + x] = 3;
      currentMap[locationY + 2 * y][locationX + 2 * x] = 4;
      locationX+= x;
      locationY+= y;
    }
  }
}

function printScreen(map, locationX, locationY) {
  var screen = "";
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (i >= 0 && j >= 0 && map[i] !== undefined && map[i][j] !== undefined)
        if (i === locationY && j === locationX)
          screen += "我";
        else if (map[i][j] === 0)
          screen += "&emsp;";
        else if (map[i][j] === 1)
          screen += "牆";
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

      if (j != map[i].length - 1)
        screen += "&ensp;";
      else
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