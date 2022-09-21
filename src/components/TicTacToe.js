import React, {useState, useEffect} from 'react';
import './TicTacToe.css';
/*this is my project*/

let initialState = ['','','','','','','','',''];
let turn = 'X';

export default function TicTacToe() {
    const[gameState, setGameState] = useState(initialState);
    const[whosTurn, setWhosTurn] = useState(true);
    const[winner, setWinner] = useState('');


    const play = (index) => {
        turn = whosTurn ? 'O' : 'X';
        let tempArr = Array.from(gameState);
        if(tempArr[index] === '') 
        {
            tempArr[index] = whosTurn ? 'X' : 'O';
            setWhosTurn(!whosTurn);
            setGameState(tempArr);
            console.log(tempArr);
        } else {
            alert("already playd");
        }

    }

    useEffect(() => {
        let tempArr = Array.from (gameState);
        //console.log(tempArr);
        const arr = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        let clearReset;
        for(let i=0; i<arr.length; i++) {
            const[a, b, c] = arr[i];
            if(tempArr[a] && tempArr[a] === tempArr[b] && tempArr[b] === tempArr[c])
            {
                setWinner(tempArr[a]);
                clearReset = setTimeout(()=>{
                    reset();
                },3000);
                //console.log(i);
                //console.log(tempArr[a]);
            }
        }
        return () => {
            clearTimeout(clearReset);
        }
    }, [gameState])

    const reset = () => {
        setGameState(initialState);
        setWinner('');
    }

    return (
        <div>
            <h1 className="h1 app-name text-center m-2">Tic-Tac-Toe</h1>
            <h3 className="app-name text-center">winner is {winner}</h3>
            <h3 className="text-center"><button className="reset-button" onClick={reset}>Reset Game</button></h3>
            <h2 className="app-name text-center ">{`Player ${turn} Turn`}</h2>
            {/*<h2 className="app-name text-center">player X has Won</h2>*/}
            <div className="game-board">
                {
                    gameState.map((data, index)=>{  
                        return(
                            <button key={index} className="item" onClick={()=>{play(index)}}><span className="text">{data}</span></button>
                        )                      
                    })
                }
            </div>
        </div>
    )
}
