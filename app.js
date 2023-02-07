document.addEventListener('DOMContentLoaded',() => {            //All HTML files will be loaded before js code is read
const grid = document.querySelector('.grid')
let width = 10
let bombAmount = 20
let squares = []

//create Board
function createBoard() {  
    //get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width*width - bombAmount).fill('valid')
console.log(bombsArray)
console.log(emptyArray)
const gameArray = emptyArray.concat(bombsArray)
console.log(gameArray)
const shuffledArray = gameArray.sort(() => Mathrandom())


                                                        //forloop to loop over a block of code  100 times                                       
for (let i = 0; i < width*width; i++) {                 //loop is repeating itself from 0 to 99 going up by 1 each time
const square = document.createElement('div')
square.setAttribute('id', i)                                        //my string and my loop for i(0-99)
grid.appendChild(square)
squares.push(square)                                             //pushing square into my squares array

}
}
createBoard()


})