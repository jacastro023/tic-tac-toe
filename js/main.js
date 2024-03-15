// create constatnts for players
const players={
    '1': 'red',
    '-1': 'blue',
    'null': 'white'
};

// create winning conditions
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// create apps variables

let board, turn, winner;

//  get elements
const squares = document.querySelectorAll('td div');
const message = document.querySelector('h1');

// event listeners
document.querySelector('table').addEventListener('click',handleMove);
document.querySelector('button').addEventListener('click',initialize);

// create functions
initialize();

function handleMove(evt){
    // obtain square index
    const idx = parseInt(evt.target.id.replace('box',''));
    // check if box is available
    if (board[idx] || winner) return;
    // update state
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
}

// create get winner function
function getWinner(){
    for (let i = 0; i < winningCombos.length; i++){
        if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
    }
    if (board.includes(null)) return null;
    return 'T';
}

function render(){
    board.forEach(function(sq, idx){
        squares[idx].style.background = players[sq];
    });
    if (winner === 'T'){
        message.innerHTML = `It's a tie`;
    } else if (winner){
        message.innerHTML = `congrats ${players[winner].toUpperCase()}!`;
    } else {
        message.innerHTML = `${players[turn].toUpperCase()}'s Turn`;
    }
}

function initialize(){
    board = [null, null, null, null, null, null, null, null, null]
    turn = 1 ;
    winner = null;
    render();
}