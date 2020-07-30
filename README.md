# Notation Trainer
[![made-with-react](https://img.shields.io/badge/Made%20with-React-blue)](https://reactjs.org/)
[![npm-version](https://img.shields.io/badge/npm-v6.14.5-orange)](https://img.shields.io/badge/npm-v6.14.5-blue)
[![license-mit](https://img.shields.io/badge/License-MIT-blue)](https://github.com/mattjliu/Notation-Trainer/blob/master/LICENSE)

This is a [ReactJS](https://reactjs.org/) app I created to help chess players learn and practice [algebraic chess notation](https://en.wikipedia.org/wiki/Algebraic_notation_(chess)). The app is built using [chessboardjsx](https://chessboardjsx.com/) and [chess.js](https://github.com/jhlywa/chess.js). 

## How it works

### Using the app

The app will render a position on the board and prompt you with a chess move written in algebraic notation. Make the correct move and a new position is generated. Your goal is to make as many moves as possible in 60 seconds. You can toggle the side to white, black or random (this also changes the orientation of board). 

Here is a gif of the app in action:

<p align="center">
 <img src="/demo.gif" width="450"/>
</p>

### How are the positions generated?

Positions and moves are taken from previous world championship games. The PGN files for those event were downloaded [here](https://www.pgnmentor.com/files.html#world).

## Install
```
npm install
```

## Usage
```
npm start
```

## Try it out here
https://mattjliu.github.io/Notation-Trainer/
