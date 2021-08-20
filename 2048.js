const tileContainer = document.querySelector(".tileContainer");
const gridContainer = document.querySelector(".gridContainer");
const scoreDiv = document.querySelector(".score");
const startModal = document.querySelector(".startGame");
const startButton = document.querySelector(".start");
const restartModal = document.querySelector(".restartGame");
const restartButton = document.querySelector(".restart");
const restartButton1 = document.querySelector(".restart1");


//define grid
let grid = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];

//marked array
let marked =[];

//score
let score = 0;
scoreDiv.innerText = score;

//number of cells

let cells = 0;

//start game

let start = false;

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
restartButton1.addEventListener('click', startGame);

function startGame(){
  clearBoard();

  startModal.style.visibility="hidden";
  restartModal.style.visibility="hidden";
  start = true;
  
  //spawn 2 tiles
  createTile();
  createTile();
}

function clearBoard(){

  document.querySelectorAll(".tile").forEach(tile=>{
    tile.remove();
  });

  grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
}



//animation event 

let animating = false;

//controls

document.addEventListener('keyup',(e)=>{
  if(start===false) return;

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

//swipe left

function moveLeft(){

  if (animating === true) return;

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

          if(grid[i][j-g] === grid[i][j-g-1] && !marked.includes(`${i},${j-g}`)&& !marked.includes(`${i},${j-g-1}`)){ // if cells are equal and both cells havent been merged

            grid[i][j-g-1] = grid[i][j-g] * 2;  
            marked.push(`${i},${j-g-1}`); // mark the remaining cell
            console.log(marked);

            //update score
            score+=grid[i][j-g-1];
            scoreDiv.innerText = score;

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

      if(grid[i][j] !== 0 && grid[i][j] === grid[i][j-1] && !marked.includes(`${i},${j-1}`) && !marked.includes(`${i},${j}`)){

        grid[i][j-1] = grid[i][j] * 2;
        marked.push(`${i},${j-1}`);
        console.log(marked);

        //update score
        score+=grid[i][j-1];
        scoreDiv.innerText = score;


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
  marked = [];
}

//swipe right

function moveRight(){

  if (animating === true) return;

  let moveC;

  for(let i=0; i <= 3 ; i++){ // from top to bottom
    for (let j=3; j>=0 ;j--){ // right to left

      //iterate through 3 next cells
      for(let g = 3 ; g > 0 ; g--){
        
        if (grid[i] && grid[i][j]!== 0 && grid[i][j+g] === 0 ){

          // move cells
          grid[i][j+g] = grid[i][j];


          let tile = document.querySelector(`.top${i}.left${j}`);
          tile.classList.add(`left${j+g}`);
          tile.classList.remove(`left${j}`);
          grid[i][j]=0;

          if(grid[i][j+g] === grid[i][j+g+1] && !marked.includes(`${i},${j+g}`) && !marked.includes(`${i},${j+g+1}`)){

            grid[i][j+g+1] = grid[i][j+g] * 2;
            marked.push(`${i},${j+g+1}`);
            console.log(marked);

            //update score
            score+=grid[i][j+g+1];
            scoreDiv.innerText = score;

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

      if(grid[i][j] !== 0 && grid[i][j] === grid[i][j+1] && !marked.includes(`${i},${j+1}`) && !marked.includes(`${i},${j}`)){

        grid[i][j+1] = grid[i][j] * 2;
        marked.push(`${i},${j+1}`);
        console.log(marked);

        //update score
        score+=grid[i][j+1];
        scoreDiv.innerText = score;

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
  marked=[];
}

//swipe up
function moveUp(){

  if (animating === true) return;

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

          if(grid[i-g-1] && grid[i-g][j] === grid[i-g-1][j] && !marked.includes(`${i-g-1},${j}`) && !marked.includes(`${i-g},${j}`)){

            grid[i-g-1][j] = grid[i-g][j] * 2;
            marked.push(`${i-g-1},${j}`);
            console.log(marked);

            //update score
            score+=grid[i-g-1][j];
            scoreDiv.innerText = score;

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

      if(grid[i][j] !== 0 && grid[i-1] && grid[i][j]=== grid[i-1][j] && !marked.includes(`${i-1},${j}`) && !marked.includes(`${i},${j}`)){
        grid[i-1][j] = grid[i][j] * 2;
        marked.push(`${i-1},${j}`);
        console.log(marked);

        //update score
        score+=grid[i-1][j];
        scoreDiv.innerText = score;

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
  marked=[];
}

//swipe down

function moveDown(){

  if (animating === true) return;

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

          if(grid[i+g+1] && grid[i+g][j] === grid[i+g+1][j] && !marked.includes(`${i+g+1},${j}`) && !marked.includes(`${i+g},${j}`)){

            grid[i+g+1][j] = grid[i+g][j] * 2;
            marked.push(`${i+g+1},${j}`);
            console.log(marked);

            //update score
            score+=grid[i+g+1][j];
            scoreDiv.innerText = score;


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

      if(grid[i][j] !== 0 && grid[i+1] && grid[i][j]=== grid[i+1][j] && !marked.includes(`${i+1},${j}`) && !marked.includes(`${i},${j}`)){
        grid[i+1][j] = grid[i][j] * 2;
        marked.push(`${i+1},${j}`);
        console.log(marked);

        //update score
        score+=grid[i+1][j];
        scoreDiv.innerText = score;


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
  marked=[];
}

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
  setTimeout(()=>{
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
  let number = Math.random();



  // change vacant value
  console.log(number);
  number <= 0.75 ? grid[vacants[random][0]][vacants[random][1]] = 2: grid[vacants[random][0]][vacants[random][1]] = 4;

  // define top an left location
  let pos = posSwitch(vacants[random][0], vacants[random][1]);

  //create element
  const div = document.createElement("div");
  div.innerText= grid[vacants[random][0]][vacants[random][1]] ;
  div.classList.add(`top${vacants[random][0]}`,  `left${vacants[random][1]}` , `tile`, `c${grid[vacants[random][0]][vacants[random][1]]}`);

  div.addEventListener('transitionend',()=>{
    animating=false;
  });

  div.addEventListener('transitionstart',()=>{
    animating=true;
  });

  tileContainer.appendChild(div);
  cells++;  

  if( vacants.length-1 ===  0){
    for(let i = 0; i < 4; i++){
      for(let j =0; j < 4; j++){
          if (i < 3 && grid[i][j] === grid[i+1][j] || i >0 && grid[i][j] === grid[i-1][j] || j < 3 && grid[i][j] === grid[i][j+1] || j>0 && grid[i][j] === grid[i][j-1]){
            return;
          }
      }
    }
    start=false;
    restartModal.style.visibility= "visible";
  }

},100)
};