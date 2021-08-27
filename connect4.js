/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = (WIDTH, HEIGHT) => {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // QUESTION - Do i need to fill with Null vs undefined?
  for (let i = 0; i < HEIGHT; i++) {
    board.push(Array.from(Array(WIDTH)))
  }
  // board = (Array.from(Array(WIDTH), () => new Array(HEIGHT)))
}


/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  // gets "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");

  // Creates a "Column-top" row and adds an event listener it.
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // For the "Column-top" row, creates and appends data cells with the id=iteration number
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // For the specified height and width adds that many table-rows (tr) and within EACH tr adds data cells. All elelemnts with Ids
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    // This is where each row is appended to the board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // sets y to the largest value, then checks if board is occupied at that spot, and iterates DOWN if it is
  let y = HEIGHT - 1; 
  // Start at lowest point y = 5 in this case, then keep moving up if board[y][x] is true 
  for (y; y >= 0; y--) {
    if (!board[y][x]) {
      return y
    } 
  }
  // Outside the loop, return NULL if made it to top of column
  return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let div = document.createElement("div");
  div.classList.add("piece");
  if (currPlayer === 1) {
    div.classList.add("p1");  
  } else {
    div.classList.add("p2");
  } 

  // Add the piece to the correct column td
  let cell = document.getElementById(`${y}-${x}`)  
  cell.append(div)
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {

  
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // add line to update in-memory board - 
  // this never updates the board variable with the player #.
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // Checks every cell to see if it evaulates to true, if one is false (undefined) then it will not run endGame.
  if (board.every(row => row.every(spot => spot))) {

    return endGame("Tie! All cells are full.")
  }

  // switch players
  // switch currPlayer 1 <-> 2
  return currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // for every cell (x) in a specific row (y), checkes if _win() is statified in any direction Up, Down, Diag, or Diag2 

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard(WIDTH, HEIGHT);
makeHtmlBoard();
