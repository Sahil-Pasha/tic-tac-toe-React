import React, { useState, useEffect } from "react";
import Square from "./Square";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  useEffect(() => {
    const storedXScore = localStorage.getItem("xScore");
    const storedOScore = localStorage.getItem("oScore");
    if (storedXScore) setXScore(Number(storedXScore));
    if (storedOScore) setOScore(Number(storedOScore));
  }, []);

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let value of winnerLogic) {
      const [a, b, c] = value;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return false;
  };

  // I am writing globally when any state changes whole component rerenders
  const winner = checkWinner();

  const handleClick = (index) => {
    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "0";
    setState(copyState);
    setIsXTurn(!isXTurn);
  };
  const handleReset = () => {
    setState(Array(9).fill(null));
  };

  useEffect(() => {
    if (winner) {
      if (winner === "X") {
        const newXScore = xScore + 1;
        setXScore(newXScore);
        localStorage.setItem("xScore", newXScore);
      } else if (winner === "0") {
        const newOScore = oScore + 1;
        setOScore(newOScore);
        localStorage.setItem("oScore", newOScore);
      }
    }
  }, [winner]);

  return (
    <div className="board-container">
      <div className="score-board">
        <h4>X Score: {xScore}</h4>
        <h4>O Score: {oScore}</h4>
      </div>
      {winner ? (
        <div className="winner-conatiner">
          <h4>{winner} won the game</h4>
          <button className="play-again-button" onClick={handleReset}>
            Play Again
          </button>
        </div>
      ) : (
        <>
          <div className="board-row">
            <Square
              onClick={() => {
                handleClick(0);
              }}
              value={state[0]}
              color={state[0] === "X" ? "red" : "blue"}
            />
            <Square
              onClick={() => {
                handleClick(1);
              }}
              value={state[1]}
              color={state[1] === "X" ? "red" : "blue"}
            />
            <Square
              onClick={() => {
                handleClick(2);
              }}
              value={state[2]}
              color={state[2] === "X" ? "red" : "blue"}
            />
          </div>
          <div className="board-row">
            <Square
              onClick={() => {
                handleClick(3);
              }}
              value={state[3]}
              color={state[3] === "X" ? "red" : "blue"}
            />
            <Square
              onClick={() => {
                handleClick(4);
              }}
              value={state[4]}
              color={state[4] === "X" ? "red" : "blue"}
            />
            <Square
              onClick={() => {
                handleClick(5);
              }}
              value={state[5]}
              color={state[5] === "X" ? "red" : "blue"}
            />
          </div>
          <div className="board-row">
            <Square
              onClick={() => {
                handleClick(6);
              }}
              value={state[6]}
              color={state[6] === "X" ? "red" : "blue"}
            />
            <Square
              onClick={() => {
                handleClick(7);
              }}
              value={state[7]}
              color={state[7] === "X" ? "red" : "blue"}
            />
            <Square
              onClick={() => {
                handleClick(8);
              }}
              value={state[8]}
              color={state[8] === "X" ? "red" : "blue"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
