document.addEventListener('DOMContentLoaded',() => {            //All HTML files will be loaded before js code is read
const grid = document.querySelector('.grid')
let height = 10;
let width = 10;
let bombAmount = 20;
let squares = [];
let isGameOver = false;
let flag = 0;

//create Board
function createBoard() {  
    //get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width*height - bombAmount).fill('valid')
//console.log(bombsArray)
//console.log(emptyArray)
const gameArray = emptyArray.concat(bombsArray)
//console.log(gameArray)
const shuffledArray = gameArray.sort(() => Math.random()-0.5)
//console.log(shuffledArray)

                                                        //forloop to loop over a block of code  100 times                                       
for (let i = 0; i < width*height; i++) {                 //loop is repeating itself from 0 to 99 going up by 1 each time
const square = document.createElement('div')
square.setAttribute('id', i)                                        //my string and my loop for i(0-99)
square.classList.add(shuffledArray[i])
grid.appendChild(square)
squares.push(square)                                    //pushing square into my squares array

//normal click
square.addEventListener('click',function (e) {
    click(square, i);
   // console.log('click')
})
square.addEventListener('oncontextmenu', e => { 
    e.preventDefault()
    addFlag(square)
})
}
//add Numbers 
for (let i = 0; i < squares.length; i++){
    let total = 0
   const isLeftEdge = (i % width === 0)
   const isRightEdge = (i % width === width -1)
//
   if (squares[i].classList.contains('valid')){
   if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++
   if (i > 9 && !isRightEdge && squares [i +1 -width].classList.contains('bomb')) total ++
   if (i > 10 && squares[i - width].classList.contains('bomb')) total ++
   if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total ++
   if (i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb')) total ++
   if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total ++
   if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total ++
   if (i < 89 && squares[i +width].classList.contains('bomb')) total ++
   
   //console.log(total)
   squares[i].setAttribute('data', total);
   //console.log(squares[i])
  }
 }
}
  createBoard()
//flags on right click

function addFlag(square){
    if ('isGameover') return 
    if (!square.classList.contains('checked') && (flag < bombAmount)) {
        if (!square.classList.contains('flag')) {
            square.classList.add('flag')
            square.innerHTML = '🚩'
            flag ++
        } else {
            square.classList.remove('flag')
            flag --
        }

    }

}

//click on square actions
function click(square, currentId) {
    if (isGameOver) return;
    if (square.classList.contains('checked') || square.classList.contains('flag')) return
    if(square.classList.contains('bomb')){
        alert('Game Over');
        isGameOver = true;
      // console.log('Game Over')

    } else {
        let total = square.getAttribute('data')
        if (total != null) {
            square.classList.add('checked')
            //console.log(total)
            square.innerHTML = total;
            return
        }
        checkSquare(square,currentId)
    }
        square.classList.add('checked')
}

// check neighboring squares once square is clicked

function checkSquare(square, currentId) {
    const width = 10;
    const isLeftEdge = (currentId % width === 0);
    const isRightEdge = (currentId % width === width -1);
  
   if (currentId > 0 && !isLeftEdge) {
    let newId = squares[parseInt(currentId) -1].id
    let newSquare = document.getElementById(newId)
    click(newSquare)
   }
   if (currentId > 9 && !isRightEdge) {
    const newId = squares[parseInt(currentId) +1 - width].id
    const newSquare = document.getElementById(newId)
    click(newSquare)
}
   if ( currentId > 10 ) {
    const newId = squares[parseInt(currentId) -width].id
    const newSquare = document.getElementById(newId)
    click(newSquare)
}
if (currentId > 11 && !isLeftEdge) {
    const newId = squares [parseInt(currentId) -1 -width].id
    const newSquare = document.getElementById(newId)
    click(newSquare)
}
if (currentId < 98 && !isRightEdge) {
    const newId = squares[parseInt(currentId) +1].id
    const newSquare = docuemnt.getElementById(newId)
    click(newSquare)
}
if (currentId < 90 && !isLeftEdge) {
    const newId = squares[pareseInt(currentId) -1 +width].id
    const newSquare = document.getElementById(newId)
    click(newSquare)
}
if (currentId < 88 && !isRightEdge) { 
    const newId = squares[parseInt(currentId) +1 +width].id
    const newSquare = document.getElementById(newId)
    click(newSquare)
}
if (currentId < 89) {
    const newId = squares[parseInt(currentId) +width].id
    const newSquare = document.getElementById(newId)
    click(newSquare)
}
}
// 
function gameOver(square){
    console.log('BOOM!')
    isGameover = true

    squares.forEach(square => {
        if (square.classList.contain('bomb'))
        square.innerHTML = '💣'
    })
}

})