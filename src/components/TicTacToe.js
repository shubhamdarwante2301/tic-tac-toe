import React, { useState, useEffect } from "react";
import "./TicTacToe.css";

let initialState = ["", "", "", "", "", "", "", "", ""];
let turn = "X";

export default function TicTacToe() {
  const [gameState, setGameState] = useState(initialState);
  const [whosTurn, setWhosTurn] = useState(true);
  const [winner, setWinner] = useState("");

  const play = (index) => {
    turn = whosTurn ? "O" : "X";
    let tempArr = Array.from(gameState);
    if (tempArr[index] === "") {
      tempArr[index] = whosTurn ? "X" : "O";
      setWhosTurn(!whosTurn);
      setGameState(tempArr);
    } else {
      alert("already played");
    }
  };

  useEffect(() => {
      const modal = document.querySelector('#modal');
      const resetBtn = document.querySelector('.reset-button');
      if(winner !== "") {
        modal.setAttribute('open',"open");
        resetBtn.addEventListener('click', ()=>{
            modal.close();
            reset();
        })
      }
  }, [winner])

  useEffect(() => {
    let tempArr = Array.from(gameState);

    const arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < arr.length; i++) {
      const [a, b, c] = arr[i];
      if (
        tempArr[a] &&
        tempArr[a] === tempArr[b] &&
        tempArr[b] === tempArr[c]
      ) {
        setWinner(`Player ${tempArr[a]} has won`);
      }
    }

    let count = 0;
    for(let i=0; i < tempArr.length; i++) {
        if(tempArr[i] !== "")
        {
            count++;
        }
    }
    if(count === tempArr.length)
    {
        setWinner("Game Tie");
    }

  }, [gameState]);

  const reset = () => {
    setGameState(initialState);
    setWinner("");
  };

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <h2>{`Player ${turn} Turn`}</h2>
      <dialog id="modal">
        <h2>{winner}</h2>
        <button className="reset-button">
          Reset Game
        </button>
      </dialog>
      <div className="main-container">
        <div className="containers">
          {gameState.map((data, index) => {
            return (
              <button
                key={index}
                className="item"
                onClick={() => {
                  play(index);
                }}
              >
                <span className="text">{data}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
