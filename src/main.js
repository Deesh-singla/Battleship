import './main.css';
import { player } from './player.js';

const createBattleshipGame = () => {
    const state = {
        playerName: localStorage.getItem('name'),
        userPlayer: player('player'),
        computerPlayer: player('computer'),
        playerArena: document.querySelector('#playerAreena'),
        computerArena: document.querySelector('#compAreena')
    };
    const userBoardState = state.userPlayer.board.getCoordinates();
    const computerBoardState = state.computerPlayer.board.getCoordinates();

    const addPlayerName = () => {
        document.querySelector('span').textContent = `${state.playerName}'s`;
    }

    const renderGameBoard = (boardState, arena) => {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const div = document.createElement('div');
                div.classList.add('box');
                div.id = `[${i},${j}]`;
                if (boardState[i][j] !== '-' && boardState[i][j] !== 'O') {
                    div.textContent = 'X';
                }
                arena.appendChild(div);
            }
        }
    };

    const generateRandomCoordinates = () => [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
    ];

    const isCoordinateAttacked = (missedAttacks, coordinates) => {
        let flag = false;

        for (let i = 0; i < missedAttacks.length; i++) {
            if (missedAttacks[i][0] === coordinates[0] && missedAttacks[i][1] === coordinates[1]) {
                flag = true;
                break;
            }
        }

        return flag;
    }


    const isValidTarget = (coordinates, boardState) => {
        const [x, y] = coordinates;
        const cell = boardState[x][y];
        return cell !== '-' && cell !== 'O' && cell !== 'M';
    };

    const markHit = (cell) => {
        cell.classList.add('attack');
        cell.textContent = '✓';
        cell.style.color = 'red';
    };

    const markMiss = (cell) => {
        cell.classList.add('missed');
        cell.textContent = 'X';
        cell.style.color = 'rgb(237, 196, 115)';
    };

    const handleComputerMove = () => {
        let coordinates;
        do {
            coordinates = generateRandomCoordinates();
        } while (isCoordinateAttacked(state.userPlayer.board.missedArr, coordinates));

        state.userPlayer.board.receiveAttack(coordinates);
        const targetCell = document.querySelector(
            `#playerAreena div[id="[${coordinates[0]},${coordinates[1]}]"]`
        );

        if (userBoardState[coordinates[0]][coordinates[1]] == '-' || userBoardState[coordinates[0]][coordinates[1]] == 'O' || userBoardState[coordinates[0]][coordinates[1]] == 'M') {
            markMiss(targetCell);
        } else {
            markHit(targetCell);
        }

        if (state.userPlayer.board.isAllShipSunk()) {
            alert('Computer wins!');
        }
    };

    const setupComputerBoardListeners = () => {
        const cells = document.querySelectorAll('#compAreena div');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const coordinates = JSON.parse(cell.id);
                state.computerPlayer.board.receiveAttack(coordinates);

                if (cell.textContent === 'X') {
                    markHit(cell);
                } else {
                    markMiss(cell);
                }

                if (state.computerPlayer.board.isAllShipSunk()) {
                    alert(`${state.playerName} wins!`);
                    return;
                }

                handleComputerMove();
            }, { once: true });
        });
    };

    const initialize = () => {
        renderGameBoard(computerBoardState, state.computerArena);
        renderGameBoard(userBoardState, state.playerArena);
        setupComputerBoardListeners();
        addPlayerName();
    };

    return {
        initialize
    };
};

window.onload = () => {
    const game = createBattleshipGame();
    game.initialize();
};