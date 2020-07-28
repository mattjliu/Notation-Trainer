# Notation Trainer

This is a [ReactJS](https://reactjs.org/) app I created to help chess players learn and practice [algebraic chess notation](https://en.wikipedia.org/wiki/Algebraic_notation_(chess)). The app is built using [chessboardjsx](https://github.com/willb335/chessboardjsx) and [chess.js](https://github.com/jhlywa/chess.js). 

## How to use

The app will render a position of the board and prompt you with a chess move written in algebraic notation. Make the correct move and a new position is generated. Your goal is to make as many moves as possible in 60 seconds. You can toggle the side to white, black or random (this also changes the orientation of board). 

Here is a gif of the app in action:

<p align="center">
 <img src="/demo.gif" width="450"/>
</p>

## How are the positions generated?

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
