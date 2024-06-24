// This version applies the time travel

import { useState } from "react";

function Square({value, onSquareClick}){
  return( 
      <button className="square" onClick={onSquareClick}>
      {value}
      </button>
  );

}
// Main Board
function Board({xIsNext, squares, onPlay}) {
  function handleClick(i){
    if (squares[i] || calculateWinner(squares)){
      return;  //when a board is already filled, it exits the function
      // when a Winner is declared, it also exits the function
    }
    const nextSquares = squares.slice(); //create copy of squares
    if (xIsNext){
      nextSquares[i]="X";
    } else {
      nextSquares[i]="O";
    }
    onPlay(nextSquares);
  }

  const winner= calculateWinner(squares);
  let status;
  if(winner){
    status = "Winner: "+ winner;
  } else{
    status = "Next player: " + (xIsNext ? "X":"O")
  }

  return (
  <>
  <div className="status">{status}</div>
  <div className="board-row">
  <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
  <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
  <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
  </div>
  <div className="board-row">
  <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
  <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
  <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
  </div>
  <div className="board-row">
  <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
  <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
  <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
  </div>
  </>
  );
}

// All state management is handled by the board component
// Board passes props to the child Square components to be displayed right

//1) Clicking on the upper left square runs the function that the button received as its onClick prop from the Square. The Square component received that function as its onSquareClick prop from the Board. The Board component defined that function directly in the JSX. It calls handleClick with an argument of 0.
//2) handleClick uses the argument (0) to update the first element of the squares array from null to X.
//3) The squares state of the Board component was updated, so the Board and all of its children re-render. This causes the value prop of the Square component with index 0 to change from null to X.

//it’s conventional to use onSomething names for props which represent events and handleSomething for the function definitions which handle those events.

// Time Travel
export default function Game(){
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const xIsNext = currentMove%2==0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove+1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves=history.map((squares, move) => {
    let description;
    if (move>0){
      description='Go to move # ' + move;
    } else{
      description='Go to game start';
    }
    return(
      <li key={move}>
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    )
  });

  return(
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

//Note that you are removing the export default keywords before the function Board() { declaration and adding them before the function Game() { declaration. This tells your index.js file to use the Game component as the top-level component instead of your Board component. The additional divs returned by the Game component are making room for the game information you’ll add to the board later.

// Helper function - Declare game winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//Keys tell React about the identity of each component, which allows React to maintain state between re-renders. If a component’s key changes, the component will be destroyed and re-created with a new state.