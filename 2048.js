const tileContainer = document.querySelector(".tileContainer");
const gridContainer = document.querySelector(".gridContainer");



//define grid
const grid = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];

console.table(grid);
// console.log(grid[0][2]);
// console.log(grid[2][1]);


//spawn 2 tiles
createTile();
createTile();

const button = document.querySelector('button');

document.addEventListener('keyup',(e)=>{
  switch(e.key){
    case 'ArrowRight':
      moveRight();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowUp':
      moveUp();
      break;
    case 'ArrowDown':
      moveDown();
      break;
  }
});

//controls

//swipe left

function moveLeft(){

  let moveC;

  for(let i=0; i <= 3 ; i++){ // from top to bottom
    for (let j=0; j<=3 ;j++){ // left top right

      //iterate through 3 next cells
      for(let g = 3 ; g > 0 ; g--){
        
        if (grid[i] && grid[i][j]!== 0 && grid[i][j-g] === 0){

          // move cells
          grid[i][j-g] = grid[i][j];

          let tile = document.querySelector(`.top${i}.left${j}`);
          tile.classList.add(`left${j-g}`);
          tile.classList.remove(`left${j}`);
          grid[i][j]=0;

          if(grid[i][j-g] === grid[i][j-g-1]){

            grid[i][j-g-1] = grid[i][j-g] * 2;
            let color = document.querySelector(`.top${i}.left${j-g-1}`);
            color.innerText = grid[i][j-g-1];
            color.classList.add(`c${grid[i][j-g-1]}`);
            color.classList.remove(`c${grid[i][j-g]}`);
            grid[i][j-g] = 0;
            document.querySelector(`.top${i}.left${j-g}`).remove();
          }

          moveC=1;
          

        }

      }

      if(grid[i][j] !== 0 && grid[i][j] === grid[i][j-1]){
        grid[i][j-1] = grid[i][j] * 2;
        let color = document.querySelector(`.top${i}.left${j-1}`);
            color.innerText = grid[i][j-1];
            color.classList.add(`c${grid[i][j-1]}`);
            color.classList.remove(`c${grid[i][j]}`);
        grid[i][j] = 0;
        document.querySelector(`.top${i}.left${j}`).remove();

        moveC=1;
      }
    }
  }

  moveC ===1? createTile() :"";
}

//swipe right

function moveRight(){

  let moveC;

  for(let i=0; i <= 3 ; i++){ // from top to bottom
    for (let j=3; j>=0 ;j--){ // right to left

      //iterate through 3 next cells
      for(let g = 3 ; g > 0 ; g--){
        
        if (grid[i] && grid[i][j]!== 0 && grid[i][j+g] === 0){

          // move cells
          grid[i][j+g] = grid[i][j];

          let tile = document.querySelector(`.top${i}.left${j}`);
          tile.classList.add(`left${j+g}`);
          tile.classList.remove(`left${j}`);
          grid[i][j]=0;

          if(grid[i][j+g] === grid[i][j+g+1]){

            grid[i][j+g+1] = grid[i][j+g] * 2;
            let color = document.querySelector(`.top${i}.left${j+g+1}`);
            color.innerText = grid[i][j+g+1];
            color.classList.add(`c${grid[i][j+g+1]}`);
            color.classList.remove(`c${grid[i][j+g]}`);
            grid[i][j+g] = 0;
            document.querySelector(`.top${i}.left${j+g}`).remove();
          }

          moveC=1;
          

        }

      }

      if(grid[i][j] !== 0 && grid[i][j] === grid[i][j+1]){
        grid[i][j+1] = grid[i][j] * 2;
        let color = document.querySelector(`.top${i}.left${j+1}`);
        color.innerText = grid[i][j+1];
        color.classList.add(`c${grid[i][j+1]}`);
        color.classList.remove(`c${grid[i][j]}`);
        grid[i][j] = 0;
        document.querySelector(`.top${i}.left${j}`).remove();

        moveC=1;
      }
    }
  }

  moveC ===1? createTile() :"";
}

//swipe up
function moveUp(){

  let moveC;

  for(let i=0; i <= 3 ; i++){ // from top to bottom
    for (let j=0; j<=3 ;j++){ // left to right

      //iterate through 3 next cells
      for(let g = 3 ; g > 0 ; g--){
        
        if (grid[i-g] && grid[i][j]!== 0 && grid[i-g][j] === 0){

          // move cells
          grid[i-g][j] = grid[i][j];

          let tile = document.querySelector(`.top${i}.left${j}`);
          tile.classList.add(`top${i-g}`);
          tile.classList.remove(`top${i}`);
          grid[i][j]=0;

          if(grid[i-g-1] && grid[i-g][j] === grid[i-g-1][j]){

            grid[i-g-1][j] = grid[i-g][j] * 2;
            let color = document.querySelector(`.top${i-g-1}.left${j}`);
            color.innerText = grid[i-g-1][j];
            color.classList.add(`c${grid[i-g-1][j]}`);
            color.classList.remove(`c${grid[i-g][j]}`);
            grid[i-g][j] = 0;
            document.querySelector(`.top${i-g}.left${j}`).remove();
          }

          moveC=1;
          

        }

      }

      if(grid[i][j] !== 0 && grid[i-1] && grid[i][j]=== grid[i-1][j]){
        grid[i-1][j] = grid[i][j] * 2;
        let color = document.querySelector(`.top${i-1}.left${j}`);
        color.innerText = grid[i-1][j];
        color.classList.add(`c${grid[i-1][j]}`);
        color.classList.remove(`c${grid[i][j]}`);
        grid[i][j] = 0;
        document.querySelector(`.top${i}.left${j}`).remove();

        moveC=1;
      }
    }
  }

  moveC ===1? createTile() :"";
}

//swipe down

function moveDown(){

  console.log("hji");

  let moveC;

  for(let i=3; i >= 0 ; i--){ // from bottom to top
    for (let j=0; j<=3 ;j++){ // left to right

      //iterate through 3 next cells
      for(let g = 3 ; g > 0 ; g--){
        
        if (grid[i+g] && grid[i][j]!== 0 && grid[i+g][j] === 0){

          // move cells
          grid[i+g][j] = grid[i][j];

          let tile = document.querySelector(`.top${i}.left${j}`);
          tile.classList.add(`top${i+g}`);
          tile.classList.remove(`top${i}`);
          grid[i][j]=0;

          if(grid[i+g+1] && grid[i+g][j] === grid[i+g+1][j]){

            grid[i+g+1][j] = grid[i+g][j] * 2;
            let color = document.querySelector(`.top${i+g+1}.left${j}`);
            color.innerText = grid[i+g+1][j];
            color.classList.add(`c${grid[i+g+1][j]}`);
            color.classList.remove(`c${grid[i+g][j]}`);
            grid[i+g][j] = 0;
            document.querySelector(`.top${i+g}.left${j}`).remove();
          }

          moveC=1;

        }

      }

      if(grid[i][j] !== 0 && grid[i+1] && grid[i][j]=== grid[i+1][j]){
        grid[i+1][j] = grid[i][j] * 2;
        let color = document.querySelector(`.top${i+1}.left${j}`);
        color.innerText = grid[i+1][j];
        color.classList.add(`c${grid[i+1][j]}`);
        color.classList.remove(`c${grid[i][j]}`);
        grid[i][j] = 0;
        document.querySelector(`.top${i}.left${j}`).remove();

        moveC=1;
      }
    }
  }

  moveC ===1? createTile() :"";
}


button.addEventListener('click', ()=>{
  createTile();
})

//position switch

function posSwitch(gridTop, gridRight){

  let top;
  let left;

    switch(gridTop){
      case 0 : 
        top = "0";
        break;
      case 1 : 
        top = "25%";
        break;
      case 2 : 
        top = "50%";
        break;
      case 3 : 
        top = "75%";
        break;
    }

    switch(gridRight){
      case 0 : 
        left = "0";
        break;
      case 1 : 
        left = "25%";
        break;
      case 2 : 
        left = "50%";
        break;
      case 3 : 
        left = "75%";
        break;
    }

    return {top,left};
}

//createTile

function createTile(){
  let vacants = [];

  //search for 0s

  for(let i=0; i < 4; i++){
    for(let j = 0; j<4; j++){
      if (grid[i][j]===0){
        vacants.push([i,j]);
      }
    }
  }

  //random vacant place
  let random = Math.floor(Math.random() * vacants.length);

  // change vacant value
  grid[vacants[random][0]][vacants[random][1]] =2;
  console.table(grid);

  // define top an left location
  
  let pos = posSwitch(vacants[random][0], vacants[random][1]);

  //create element
  const div = document.createElement("div");
  div.innerText= grid[vacants[random][0]][vacants[random][1]] ;
  div.classList.add(`top${vacants[random][0]}`,  `left${vacants[random][1]}`);
  tileContainer.appendChild(div);
}