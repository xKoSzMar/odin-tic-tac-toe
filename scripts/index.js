const ticTacToe = (function () {
  // Board creation
  const createBoard = () => {
    const board = [];

    for (let i = 0; i < 3; i++) {
      board[i] = [];

      for (let j = 0; j < 3; j++) {
        const div = document.createElement("div");
        div.className = "empty-cell";
        board[i][j] = div;
      }
    }

    return board;
  };

  // Reset board
  const resetBoard = () => {
    board = createBoard();
    refDOM.resetBoard();
    refDOM.addBoard();
    refDOM.displayPlayers();
    moveCounter = 0;
  };

  // Round finisher
  const finishRound = (getName, addScore) => {
    addScore();
    alert(`Player ${getName()} has won this round!`);
    resetBoard();
  };

  // Win conditions
  const checkWinConditions = ({ getName, addScore }, mark) => {
    if (board[1][1].className === mark) {
      if (
        (board[0][1].className === mark && board[2][1].className === mark) ||
        (board[0][2].className === mark && board[2][0].className === mark) ||
        (board[1][0].className === mark && board[1][2].className === mark) ||
        (board[0][0].className === mark && board[2][2].className === mark)
      ) {
        finishRound(getName, addScore);
      }
    } else if (board[0][0].className === mark) {
      if (
        (board[0][1].className === mark && board[0][2].className === mark) ||
        (board[1][0].className === mark && board[2][0].className === mark)
      ) {
        finishRound(getName, addScore);
      }
    } else if (board[2][2].className === mark) {
      if (
        (board[2][0].className === mark && board[2][1].className === mark) ||
        (board[0][2].className === mark && board[1][2].className === mark)
      ) {
        finishRound(getName, addScore);
      }
    }

    if (moveCounter === 9) {
      alert(`Tie!`);
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

  // Add player to the game
  const createPlayer = (name, mark) => {
    const player = playerCreator();

    players.push(player(name, mark));
  };

  // Play round
  const playRound = (mark) => {
    requestAnimationFrame(() => {
      moveCounter++;
      checkWinConditions(players[currentPlayerIndex], mark);

      currentPlayerIndex === 0
        ? (currentPlayerIndex = 1)
        : (currentPlayerIndex = 0);
    });
  };

  // Game data
  let board = createBoard();
  const players = [];
  let currentPlayerIndex = 0;
  let moveCounter = 0;

  const getBoard = () => board;

  const getPlayer = (n) => {
    return players[n];
  };

  const getCurrentPlayerIndex = () => currentPlayerIndex;

  return {
    getBoard,
    createPlayer,
    getPlayer,
    playRound,
    getCurrentPlayerIndex,
  };
})();

const refDOM = (function () {
  const formRefs = {
    formContainer: document.querySelector("#form-container"),
    from: document.querySelector("form"),
    p1Name: document.querySelector("#p1-name"),
    p1Mark: document.querySelector("#p1-mark"),
    p2Name: document.querySelector("#p2-name"),
    p2Mark: document.querySelector("#p2-mark"),
    button: document.querySelector("#play-btn"),
  };

  const mainRefs = {
    mainContainer: document.querySelector("#main"),
    playerNameDisplays: document.querySelectorAll(".player-name"),
    playerScoreDisplays: document.querySelectorAll(".player-score"),
    playerMarkDisplays: document.querySelectorAll(".player-mark"),
    boardContainer: document.querySelector("#board"),
  };

  const formValidation = () => {
    if (
      formRefs.p1Name.value !== "" &&
      formRefs.p2Name.value !== "" &&
      formRefs.p1Mark.value !== formRefs.p2Mark.value &&
      formRefs.button.hasAttribute("disabled")
    ) {
      formRefs.button.removeAttribute("disabled");
    } else {
      formRefs.button.setAttribute("disabled", true);
    }
  };

  const displayPlayers = () => {
    for (let i = 0; i < 2; i++) {
      mainRefs.playerNameDisplays[i].textContent = ticTacToe
        .getPlayer(i)
        .getName();

      mainRefs.playerScoreDisplays[i].textContent = `Score: ${ticTacToe
        .getPlayer(i)
        .getScore()}`;

      mainRefs.playerMarkDisplays[i].textContent = `Mark: ${ticTacToe
        .getPlayer(i)
        .getMark()}`;
    }
  };

  const handleCellClick = (e) => {
    if (e.target.classList.contains("empty-cell")) {
      const currentPlayerMark = ticTacToe
        .getPlayer(ticTacToe.getCurrentPlayerIndex())
        .getMark();

      currentPlayerMark === "x"
        ? (e.target.className = "x-cell")
        : (e.target.className = "o-cell");

      requestAnimationFrame(() => {
        ticTacToe.playRound(e.target.className);

        for (let i = 0; i < 2; i++) {
          mainRefs.playerNameDisplays[i].classList.toggle("current-player");
        }
      });
    }
  };

  const addBoard = () => {
    const board = ticTacToe.getBoard();

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        mainRefs.boardContainer
          .appendChild(board[i][j])
          .addEventListener("click", (e) => handleCellClick(e));
      }
    }
  };

  const resetBoard = () => {
    while (mainRefs.boardContainer.firstChild) {
      mainRefs.boardContainer.removeChild(mainRefs.boardContainer.lastChild);
    }
  };

  const startGame = () => {
    // Change display
    formRefs.formContainer.style.display = "none";
    mainRefs.mainContainer.style.display = "flex";

    // Add players
    ticTacToe.createPlayer(formRefs.p1Name.value, formRefs.p1Mark.value);
    ticTacToe.createPlayer(formRefs.p2Name.value, formRefs.p2Mark.value);

    displayPlayers();
    addBoard();
  };

  formRefs.from.addEventListener("change", () => formValidation());
  formRefs.button.addEventListener("click", () => startGame());

  return { addBoard, resetBoard, displayPlayers };
})();
