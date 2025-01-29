import { ship } from "./ship.js";

export const gameBoard = () => {
    let missedArr = [];
    let board = Array.from(Array(10), () => new Array(10).fill('-'));
    let carrier = ship(5, 'carrier');
    let battleship = ship(4, 'battleship');
    let cruiser = ship(3, 'cruiser');
    let submarine = ship(3, 'submarine');
    let destroyer = ship(2, 'destroyer');
    let destroyer2 = ship(2, 'destroyer2');
    let ships = [carrier, battleship, cruiser, submarine, destroyer, destroyer2];

    let randomCoordinate = () => [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];

    let isValidMove = (x, y) => (x >= 0 && x <= 9) && (y >= 0 && y <= 9);

    let placeShip = (len, x, y, direction, parent) => {
        for (let i = 0; i < len; i++) {
            board[x][y] = parent;
            if (direction === 'X+') x++;
            else if (direction === 'Y-') y--;
            else if (direction === 'X-') x--;
            else if (direction === 'Y+') y++;
        }
    };

    let marking = (arr) => {
        arr.forEach(([a, b]) => {
            if (isValidMove(a + 1, b) && board[a + 1][b] !== 'X') board[a + 1][b] = 'O';
            if (isValidMove(a - 1, b) && board[a - 1][b] !== 'X') board[a - 1][b] = 'O';
            if (isValidMove(a, b - 1) && board[a][b - 1] !== 'X') board[a][b - 1] = 'O';
            if (isValidMove(a, b + 1) && board[a][b + 1] !== 'X') board[a][b + 1] = 'O';
        });
    };

    let isPathClear = (len, x, y, direction) => {
        for (let i = 0; i < len; i++) {
            if (!isValidMove(x, y) || board[x][y] !== '-') return false;
            if (direction === 'X+') x++;
            else if (direction === 'Y-') y--;
            else if (direction === 'X-') x--;
            else if (direction === 'Y+') y++;
        }
        return true;
    };

    let generateCoordinates = (x, y, len, direction) => {
        let newArr = [];
        for (let i = 0; i < len; i++) {
            if (direction === 'X+') newArr.push([x + i, y]);
            else if (direction === 'Y-') newArr.push([x, y - i]);
            else if (direction === 'X-') newArr.push([x - i, y]);
            else if (direction === 'Y+') newArr.push([x, y + i]);
        }
        return newArr;
    };

    let getCoordinates = () => {
        let i = 0;
        while (i !== ships.length) {
            let arr = randomCoordinate();
            if (isValidMove(arr[0] + ships[i].length - 1, arr[1]) && isPathClear(ships[i].length, arr[0], arr[1], 'X+', ships)) {
                let newArr = generateCoordinates(arr[0], arr[1], ships[i].length, 'X+');
                marking(newArr);
                placeShip(ships[i].length, arr[0], arr[1], 'X+', ships[i]);
                i++;
            } else if (isValidMove(arr[0], arr[1] - ships[i].length + 1) && isPathClear(ships[i].length, arr[0], arr[1], 'Y-')) {
                let newArr = generateCoordinates(arr[0], arr[1], ships[i].length, 'Y-');
                marking(newArr);
                placeShip(ships[i].length, arr[0], arr[1], 'Y-', ships[i]);
                i++;
            } else if (isValidMove(arr[0] - ships[i].length + 1, arr[1]) && isPathClear(ships[i].length, arr[0], arr[1], 'X-')) {
                let newArr = generateCoordinates(arr[0], arr[1], ships[i].length, 'X-');
                marking(newArr);
                placeShip(ships[i].length, arr[0], arr[1], 'X-', ships[i]);
                i++;
            } else if (isValidMove(arr[0], arr[1] + ships[i].length - 1) && isPathClear(ships[i].length, arr[0], arr[1], 'Y+')) {
                let newArr = generateCoordinates(arr[0], arr[1], ships[i].length, 'Y+');
                marking(newArr);
                placeShip(ships[i].length, arr[0], arr[1], 'Y+', ships[i]);
                i++;
            }
        }
        return board;
    };

    let receiveAttack = (arr) => {
        if (board[arr[0]][arr[1]] != '-' && board[arr[0]][arr[1]] != 'O') board[arr[0]][arr[1]].hit();
        else {
            missedArr.push(arr);
            board[arr[0]][arr[1]] = 'M';
        }
        // console.log(board)
    };
    let isAllShipSunk = () => {
        let flag = 0;
        ships.forEach(x => {
            if (!x.isSunk()) flag = 1;
        })
        return (flag == 1) ? false : true;
    }

    return { getCoordinates, receiveAttack, isAllShipSunk, missedArr };
};
