
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// lets create a function to initialize the game
function initGame(){
  currentPlayer = "X";
  gameGrid = ["","","","","","","","",""];
  // UI pr bhi empty krna padega game ko
  boxes.forEach((box,index) =>{
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    // one more thing is missing, initialize box with css property again
    box.classList = `box box${index+1}`;

  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player -${currentPlayer}`;
}
initGame();

function swapTurn(){
  if(currentPlayer === "X"){
    currentPlayer = "O";
  }else{
    currentPlayer = "X";
  }
  // UI update
  gameInfo.innerText = `Current Player -${currentPlayer}`;
}

function checkGameOver(){
  let answer = "";
  winningPosition.forEach((position) =>{
    // all 3 boxes should be non-empty and exactly same in value
    if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
      // check if winner is X
      if(gameGrid[position[0]] === "X"){
        answer = "X";
      }else{
        answer = "O";  
      }
      // disable pointer event
      boxes.forEach((box) =>{
        box.style.pointerEvents = "none";
      })
      // now we know x and o is winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  // it means we have a winner
  if(answer !== ""){
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }
  // when there is no winner or tie
  let fillcnt = 0;
  gameGrid.forEach((box) =>{
    if(box !== ""){
      fillcnt++;
    } 
  });
  if(fillcnt == 9){
    gameInfo.innerText = "Game Tied Musquraiye";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index){
  if(gameGrid[index] === ""){
    boxes[index].innerText = currentPlayer; //changes in UI
    gameGrid[index] = currentPlayer; //changes usme krti hai jisko hmne banaya hai upar game grid
    // swap turn
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    // check koi jeet to nhi gya
    checkGameOver();
  }
}

boxes.forEach((box,index) =>{
  box.addEventListener("click",() =>{
    handleClick(index); //agar wo cell empty hai to use fill karega
  })
});

newGameBtn.addEventListener("click",initGame);