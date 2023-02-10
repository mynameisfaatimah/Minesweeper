document.addEventListener("DOMContentLoaded", () => {
    //All HTML files will be loaded before js code is read
    const grid = document.querySelector(".grid");
    const flagsLeft = document.querySelector("#flags-left");
    let height = 10;
    let width = 10;
    let bombAmount = 25;
    let squares = [];
    let isGameOver = false;
    let flags = 0;
    flagsLeft.innerHTML = bombAmount;
    //create Board
    function createBoard() {
        //array with random bombs
        const bombsArray = Array(bombAmount).fill("bomb");
        const emptyArray = Array(width * height - bombAmount).fill("solid");
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);


        //for loop to create html for squares
        for (let i = 0; i < width * height; i++) {
            //loop is repeating itself from 0 to 99 going up by 1 each time
            const square = document.createElement("div");
            square.setAttribute("id", i); //my string and my loop for i(0-99)
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square); //pushing square into my squares array

            //normal click
            square.addEventListener("click", function (e) {
                click(square, i);
            });
            square.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                console.log("flag");
                addFlag(square);
            });
        }

        //add Numbers
        for (let i = 0; i < squares.length; i++) {
            let total = 0;
            const isLeftEdge = i % width === 0;
            const isRightEdge = i % width === width - 1;
            //
            if (squares[i].classList.contains("solid")) {
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
                    total++;
                if (
                    i > 9 &&
                    !isRightEdge &&
                    squares[i + 1 - width].classList.contains("bomb")
                )
                    total++;
                if (i > 10 && squares[i - width].classList.contains("bomb")) total++;
                if (
                    i > 11 &&
                    !isLeftEdge &&
                    squares[i - 1 - width].classList.contains("bomb")
                )
                    total++;
                if (i < 98 && !isRightEdge && squares[i + 1].classList.contains("bomb"))
                    total++;
                if (
                    i < 90 &&
                    !isLeftEdge &&
                    squares[i - 1 + width].classList.contains("bomb")
                )
                    total++;
                if (
                    i < 88 &&
                    !isRightEdge &&
                    squares[i + 1 + width].classList.contains("bomb")
                )
                    total++;
                if (i < 89 && squares[i + width].classList.contains("bomb")) total++;

                //console.log(total)
                squares[i].setAttribute("data", total);
                //console.log(squares[i])
            }
        }
    }
    createBoard();
    //flags on right click

    function addFlag(square) {
        if (isGameOver) return;
        if (!square.classList.contains("checked") && flags < bombAmount) {
            if (!square.classList.contains("flag")) {
                square.classList.add("flag");
                square.innerHTML = "🚩";
                flags++;
                flagsLeft.innerHTML = bombAmount - flags;
            } else {
                square.classList.remove("flag");
                square.innerHTML = "";
                flags--;
                flagsLeft.innerHTML = bombAmount - flags;
            }
        }
        if (flags == 25){
            checkWin()
        }
    }

    //click on square actions

    function click(square, currentId) {
        if (isGameOver) return;
        if (square.classList.contains("checked") || square.classList.contains("flag")) {
            return;
        }

        if (square.classList.contains("bomb")) {
            gameOver(square);
        } else {
            let total = square.getAttribute("data");
            if (total != null) {
                square.classList.add("checked");
                square.innerHTML = total;
                checkSquare(square, currentId);
                return;
            }
            //checkSquare(square, currentId);
        }
        //square.classList.add('checked')
    }

    // check neighboring squares once square is clicked

    function checkSquare(square, currentId) {
        const width = 10;
        const isLeftEdge = currentId % width === 0;
        const isRightEdge = currentId % width === width - 1;

        if (currentId > 0 && !isLeftEdge) {
            newSquare(parseInt(currentId) - 1)
        }
        if (currentId > 9 && !isRightEdge) {
            newSquare(parseInt(currentId) + 1 - width)
        }
        if (currentId > 10) {
            newSquare(parseInt(currentId) - width)
        }
        if (currentId > 11 && !isLeftEdge) {
            newSquare(parseInt(currentId) - 1 - width);
        }
        if (currentId < 98 && !isRightEdge) {
            newSquare(parseInt(currentId) + 1);
        }
        if (currentId < 90 && !isLeftEdge) {
            newSquare(parseInt(currentId) - 1 + width)
        }
        if (currentId < 88 && !isRightEdge) {
            newSquare(parseInt(currentId) + 1 + width)
        }
        if (currentId < 89) {
            newSquare(parseInt(currentId) + width)
        }
    }

    function newSquare(index) {
        const newId = squares[index].id;
        const newSquare = document.getElementById(newId);
        let total = newSquare.getAttribute("data");
        if (newSquare.classList.contains('bomb') || total != 0 || newSquare.classList.contains("flag")){
            return
        }
        click(newSquare);
    }

    //
    function gameOver(square) {
        alert('BOOM!')
        isGameOver = true;

        squares.forEach((square) => {
            if (square.classList.contains("bomb")) square.innerHTML = "💣";
        });
    }

    function checkWin(){
        let flaggedBombs = 0
        squares.forEach((square) => {
            if (square.classList.contains("bomb") && square.classList.contains("flag") ){
                flaggedBombs++;
            } 
        });

        console.log(flaggedBombs)
        if(flaggedBombs == bombAmount) {
            alert('Minesweep!')
            isGameOver = true;
        }
    }
});
