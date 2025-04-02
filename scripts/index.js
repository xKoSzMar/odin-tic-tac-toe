const ticTacToe = (function () {
  // Board creation
  const createBoard = () => {
    const board = [];

    for (let i = 0; i < 3; i++) {
      board[i] = [];

      for (let j = 0; j < 3; j++) {
        board[i][j] = "";
      }
    }

    return board;
  };

  // Reset board
  const resetBoard = () => {
    board = createBoard();
    moveCounter = 0;
  };

  // Round finisher
  const finishRound = (getName, mark, getScore, addScore) => {
    addScore();
    resetBoard();
    return `Player ${getName()} with ${mark} mark has won! Total score of ${getScore()} points.`;
  };

  // Win conditions
  const checkWinConditions = ({ getName, getMark, getScore, addScore }) => {
    const mark = getMark();
    console.log(moveCounter);

    if (board[1][1] === mark) {
      if (
        (board[0][1] === mark && board[2][1] === mark) ||
        (board[0][2] === mark && board[2][0] === mark) ||
        (board[1][0] === mark && board[1][2] === mark) ||
        (board[0][0] === mark && board[2][2] === mark)
      ) {
        console.log(finishRound(getName, mark, getScore, addScore));
      }
    } else if (board[0][0] === mark) {
      if (
        (board[0][1] === mark && board[0][2] === mark) ||
        (board[1][0] === mark && board[2][0] === mark)
      ) {
        console.log(finishRound(getName, mark, getScore, addScore));
      }
    } else if (board[2][2] === mark) {
      if (
        (board[2][0] === mark && board[2][1] === mark) ||
        (board[0][2] === mark && board[1][2] === mark)
      ) {
        console.log(finishRound(getName, mark, getScore, addScore));
      }
    }

    if (moveCounter === 9) {
      console.log(`Tie!`);
      resetBoard();
    }
  };

  // PLayer object private factory
  const playerCreator = () => {
    let score = 0;

    return (name, mark) => {
      const getName = () => name;
      const getMark = () => mark;
      const getScore = () => score;
      const addScore = () => score++;

      return { getName, getMark, getScore, addScore };
    };
  };

  // Add player to an array
  const addPlayer = (player) => {
    if (players.length < 2) {
      players.push(player);
    } else {
      console.log("You can't add more than two players!");
    }
  };

  // Add player to the game
  const createPlayer = (name, mark) => {
    if (players.length > 0) {
      if (players[0].getMark() === mark) {
        console.log(`The "${mark}" is already in usage`);
        return;
      } else if (players[0].getName() === name) {
        console.log(`The "${name}" is already in usage`);
        return;
      }
    }

    if (mark === "x" || mark === "o") {
      const player = playerCreator();
      addPlayer(player(name, mark));
    } else {
      console.log("Please enter right mark!");
    }
  };

  // Play round
  const playRound = (row, column) => {
    if (players.length === 2) {
      if (
        typeof row === "number" &&
        typeof column === "number" &&
        row >= 0 &&
        row < 3 &&
        column >= 0 &&
        column < 3
      ) {
        if (board[row][column] === "") {
          board[row][column] = players[currentPlayerIndex].getMark();
          console.log(board);
          moveCounter++;
          checkWinConditions(players[currentPlayerIndex]);

          if (currentPlayerIndex === 0) {
            currentPlayerIndex = 1;
          } else {
            currentPlayerIndex = 0;
          }
        } else {
          console.log("There is already a mark here!");
        }
      } else {
        console.log("Wrong input! Please enter two numbers:[row],[column]");
      }
    } else {
      console.log("There must me two players to play the game!");
    }
  };

  // Game data
  let board = createBoard();
  const getBoard = () => board;
  const players = [];
  let currentPlayerIndex = 0;
  let moveCounter = 0;
  const getPlayers = () => {
    for (let i = 0; i < players.length; i++) {
      console.log({
        name: players[i].getName(),
        mark: players[i].getMark(),
        score: players[i].getScore(),
      });
    }
  };

  return { getBoard, getPlayers, createPlayer, playRound };
})();
