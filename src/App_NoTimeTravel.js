// To use this version, rename the current Time Travel Version to another name, and then rename this app to App.js

import { useState } from "react";

function Square({value, onSquareClick}){
  return( 
      <button className="square" onClick={onSquareClick}>
      {value}
      </button>
  );

}
// Main Board
export default function Board() {
  // state variable declaration of quares defaulting to 9 nulls
  const [squares, setSquares] = useState(Array(9).fill(null));
  //useState Hook allows us to track state in a function component.
  //State generally refers to data or properties that need to be tracking in an application.
  //squares is a state. setSquares is a method
  const [xIsNext, setXIsNext] = useState(true);
  // xIsNext (a boolean) will be flipped to determine which player goes next and the game’s state will be saved.

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
    setSquares(nextSquares); //sets the squares=nextSquares
    setXIsNext(!xIsNext); // sets the next player (O) to move
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

// Helper function - Declare game winner
function calculateWinner(squares){
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],[0,3,6], [1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ];
  for (let i=0; i<lines.length; i++){
    const [a,b,c]=lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

// Time Travel
// export default function Game(){
//   const [squares, setSquares] = useState(Array(9).fill(null));
//   const [xIsNext, setXIsNext] = useState(true);
//   const currentSquares = history[history.length-1]

//   function handlePlay(){
//   TODO
//   }

//   return(
//     <div className="game">
//       <div className="game-board">
//         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
//       </div>
//       <div className="game-info">
//         <ol>{/*TODO*/}</ol>
//       </div>
//     </div>
//   )
// }