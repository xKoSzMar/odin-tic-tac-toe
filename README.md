# The Odin Project 9 - odin-tic-tac-toe

This is the ninth project from The Odin Project curriculum.

A simple and interactive TicTacToe game built with HTML, CSS, and JavaScript, allowing two players to compete against each other in a classic game of TicTacToe.

## Features

### Player Setup

- Players can enter their names and choose their marks (X or O) before starting the game.
- The "Play" button remains disabled until both players have entered their names and selected different marks.

### Game Flow

- Once the "Play" button is clicked, the setup form is hidden and the game board is displayed.
- Player information (name, score, and current mark) is shown along with the game board.

### Game Mechanics

- The game alternates turns between the two players.
- The current player is visually indicated by an underline under their name, which changes dynamically after each turn.
- Players take turns clicking on the cells of the board to place their mark (X or O).

### Code Structure

The entire JavaScript code is organized into two Immediately Invoked Function Expressions (IIFE), each returning an object:

1. **ticTacToe** - which encapsulates the core game logic, including player management, turn handling, and win condition checking.
2. **refDOM** - which holds references to the DOM elements and ensures that the UI is updated accordingly during the game, such as updating player names, scores, and the game board state.

### Technologies:

- HTML
- CSS
- JavaScript
