import React, { useState, useEffect } from 'react';

function GamePage() {

    const color_gradiant = {
        9: 'rgb(0, 0, 0)',
        8: 'rgb(3, 5, 11)',
        7: 'rgb(6, 13, 24)',
        6: 'rgb(8, 21, 40)',
        5: 'rgb(14, 31, 61)',
        4: 'rgb(18, 39, 76)',
        3: 'rgb(23, 49, 97)',
        2: 'rgb(36, 78, 133)',
        1: 'rgb(33, 173, 181)',
        0: 'rgb(0, 250, 250)',
    }
    const [data, setData] = useState({
        rows: 5,
        cols: 5,
        boards: [],
        lifes: [],
        colors: []
    })
    const [rows, setRows] = useState('');
    const [cols, setCols] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [isAutoplay, setIsAutoplay] = useState(false);


    useEffect(() => {
        let intervalId;

        if (isAutoplay) {
            intervalId = setInterval(handleNextStep, 100);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isAutoplay]);


    const toggleAutoplay = () => {
        setIsAutoplay(!isAutoplay);
    };

    const handleRowsChange = (event) => {
        const value = event.target.value;
        setRows(value);
    };

    const handleColsChange = (event) => {
        const value = event.target.value;
        setCols(value);
    };

    const renderGrid = () => {
        const grid = [];
        for (let i = 0; i < data.boards.length; i++) {
            const row = [];
            for (let j = 0; j < data.boards[i].length; j++) {
                if (data.boards[i][j] == 1) {
                    row.push(<div key={`${i}-${j}`} style={{ width: '20px', height: '20px', backgroundColor: 'white', border: '1px solid black', display: 'inline-block', margin: 0, padding: 0 }} onClick={() => handleCellClick(i, j)}></div>);
                }
                else {
                    row.push(<div key={`${i}-${j}`} style={{ width: '20px', height: '20px', backgroundColor: color_gradiant[data.lifes[i][j]], border: '1px solid black', display: 'inline-block', margin: 0, padding: 0 }} onClick={() => handleCellClick(i, j)}></div>);
                }
            }
            grid.push(<div key={i} style={{ marginBottom: '0px', margin: 0, padding: 0 }}>{row}</div>);
        }
        return grid;
    };

    const handleStartGame = () => {
        if (rows >= 3 && rows <= 40) {
            setErrorMessage('');
        } else {
            setErrorMessage('Input should be in range 3 - 40');
            return;
        }
        if (cols >= 3 && cols <= 40) {
            setErrorMessage('');
        } else {
            setErrorMessage('Input should be in range 3 - 40');
            return;
        }
        data.rows = rows;
        data.cols = cols;
        data.boards = []
        data.lifes = []
        data.colors = []
        for (let i = 0; i < data.rows; i++) {
            data.boards.push([])
            data.lifes.push([])
            data.colors.push([])
            for (let j = 0; j < data.cols; j++) {
                const randomValue = Math.random();
                data.boards[i].push(randomValue >= 0.5 ? 1 : 0)
                data.lifes[i].push(0)
                data.colors[i].push(get_color(i, j))
            }
        }
        setData({
            ...data
        })
    };

    function getNeighourAlive(r, c) {
        let cnt = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0)
                    continue;
                let rr = r + i;
                let cc = c + j;
                if (rr >= 0 && rr < data.boards.length && cc >= 0 && cc < data.boards[0].length) {
                    if (data.boards[rr][cc] == 1) {
                        cnt += 1;
                    }
                }
            }
        }
        return cnt;
    }

    const handleNextStep = () => {
        let new_board = []
        for (let i = 0; i < data.boards.length; i++) {
            new_board.push([])
            for (let j = 0; j < data.boards[i].length; j++) {
                new_board[i].push(data.boards[i][j])
            }
        }

        for (let i = 0; i < data.boards.length; i++) {
            for (let j = 0; j < data.boards[i].length; j++) {
                let nb = getNeighourAlive(i, j);
                if (data.boards[i][j] == 1) {
                    if (nb < 2) {
                        new_board[i][j] = 0;
                    }
                    else if (nb == 2 || nb == 3) {
                        new_board[i][j] = 1;
                    }
                    else if (nb > 3) {
                        new_board[i][j] = 0;
                    }
                }
                else {
                    if (nb == 3) {
                        new_board[i][j] = 1;
                    }
                }
            }
        }


        for (let i = 0; i < data.boards.length; i++) {
            for (let j = 0; j < data.boards[i].length; j++) {
                if (new_board[i][j] == 0 && data.boards[i][j] == 0) {
                    data.lifes[i][j]++;
                    if (data.lifes[i][j] >= 9) {
                        data.lifes[i][j] = 9;
                    }
                }
                else if (new_board[i][j] == 0 && data.boards[i][j] == 1) {
                    data.lifes[i][j] = 0;
                }
                else if (new_board[i][j] == 1) {
                    data.lifes[i][j] = 0;
                }
            }
        }

        for (let i = 0; i < data.boards.length; i++) {
            for (let j = 0; j < data.boards[i].length; j++) {
                data.boards[i][j] = new_board[i][j];
                data.colors[i][j] = get_color(i, j);
            }
        }
        setData({
            ...data
        })
    };

    function get_color(r, c) {
        if (data.boards[r][c] == 0) {
            return color_gradiant[data.lifes[r][c]];
        }
        else {
            return 'rgb(255, 255, 255)';
        }
    }



    const handleCellClick = (rowIndex, colIndex) => {
        if (data.boards[rowIndex][colIndex] == 1) {
            data.boards[rowIndex][colIndex] = 0;
            data.lifes[rowIndex][colIndex] = 0;
            data.colors[rowIndex][colIndex] = 0;
        }
        else {
            data.boards[rowIndex][colIndex] = 1;
            data.lifes[rowIndex][colIndex] = 0;
            data.colors[rowIndex][colIndex] = 0;
        }
        setData({
            ...data
        })
    };

    return (
        <>
            <div style={{ marginTop: `0px)`, margin: 0, padding: 0 }}>
                {renderGrid()}
            </div>
            <div>
                <label htmlFor="rowsInput">Rows: </label>
                <input
                    type="number"
                    id="rowsInput"
                    min="3"
                    max="40"
                    value={rows}
                    onChange={handleRowsChange}
                />
            </div>
            <div>
                <label htmlFor="colsInput">Cols   :  </label>
                <input
                    type="number"
                    id="colsInput"
                    min="3"
                    max="40"
                    value={cols}
                    onChange={handleColsChange}
                />
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button onClick={handleStartGame}>Begin</button>
            <button onClick={handleNextStep}>Step</button>
            <button onClick={toggleAutoplay}>
                {isAutoplay ? 'Stop Autoplay' : 'Start Autoplay'}
            </button>
        </>
    )
}
export default GamePage;
