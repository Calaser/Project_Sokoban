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

var mapIndex = 0;
var locationX = 1;
var locationY = 1;
var map = [
  [
    [1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1],
    [1,0,2,0,0,0,1],
    [1,0,0,0,4,0,1],
    [1,0,3,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1]
  ],
  [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,2,0,0,0,4,0,0,1],
    [1,0,2,0,3,0,4,0,0,1],
    [1,0,2,0,3,0,0,0,0,1],
    [1,0,2,0,3,0,4,0,0,1],
    [1,0,0,0,3,0,4,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
  ]
];
var currentMap = map[mapIndex];


document.querySelector('#decrementBtn').addEventListener("click", () => {
  if(map[mapIndex-1]){
    currentMap = map[--mapIndex];
    locationX = 1;
    locationY = 1;
    document.querySelector('#stageCounter').innerHTML = `Stage ${mapIndex+1}`;
    document.querySelector('#screen').innerHTML = printScreen(currentMap, locationX, locationY);
  }
})

document.querySelector('#incrementBtn').addEventListener("click", () => {
  if(map[mapIndex+1]){
    currentMap = map[++mapIndex];
    locationX = 1;
    locationY = 1;
    document.querySelector('#stageCounter').innerHTML = `Stage ${mapIndex+1}`;
    document.querySelector('#screen').innerHTML = printScreen(currentMap, locationX, locationY);
  }
})


document.querySelector('#desc').innerHTML = `當前位置為(${locationX},${locationY})`;
document.querySelector('#screen').innerHTML = printScreen(currentMap, locationX, locationY);
window.addEventListener("keydown", (e) => {
  switch(e.code){
    case "KeyW":
    case "ArrowUp":
    case "Numpad8":
      if(currentMap[locationY-1][locationX] === 0)
        locationY--;
      break;
    case "KeyS":
    case "ArrowDown":
    case "Numpad2":
      if(currentMap[locationY+1][locationX] === 0)
        locationY++;
      break;
    case "KeyA":
    case "ArrowLeft":
    case "Numpad4":
      if(currentMap[locationY][locationX-1] === 0)
        locationX--;
      break;
    case "KeyD":
    case "ArrowRight":
    case "Numpad6":
      if(currentMap[locationY][locationX+1] === 0)
        locationX++;
      break;
  }
  document.querySelector('#desc').innerHTML = `當前位置為(${locationX},${locationY})`;
  document.querySelector('#screen').innerHTML = printScreen(currentMap, locationX, locationY);
})

function printScreen(map, locationX, locationY) {
  var screen = "";
  var screenSize = 3;
  for(let i = -screenSize; i <= screenSize; i++){
    for(let j = -screenSize; j <= screenSize; j++){
      if(locationY+i >= 0 && locationX+j >= 0 && map[locationY+i] !== undefined && map[locationY+i][locationX+j] !== undefined)
        if(i === 0 && j === 0)
          screen += "X";
        else
          screen += map[locationY+i][locationX+j];
      else
        screen += "&nbsp;";

      if(j != screenSize)
        screen += "&nbsp;&nbsp;&nbsp";
      else
        screen += "<br>";
    }
  }
  return screen;
}