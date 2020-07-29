import React, { Component } from 'react';
import Chessboard from "chessboardjsx";
import * as Chess from 'chess.js';
import PGNData from '../PGN/outfile.json';
import { faCircle as blackCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as whiteCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Board.css';

const game = new Chess();
const orientations = ['white', 'black'];

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      fen: 'start', 
      randomGameIndex: 0, 
      randomMoveIndex: 0,
      initMove: '',
      initMoveData: {},
      nextMove: '',
      nextMoveData: {},
      history: [],
      nextMoveColor: '',
      squareStyles: {},
      answer: '',
      correctMoves: 0,
      time: 60,
      timerCount: 0,
      incorrect: false,
      correct: false
    }
  }

  /* ====================================== Lifecylcle Methods ====================================== */

  componentDidMount() {
    this.newPosition();

    if(this.props.timed) {
      this.interval = setInterval(() => this.setState({ timerCount: this.state.timerCount+1 }), 1000); // Start timer
    
      // Call callbackEnd once timer stops
      setTimeout(() => {
        const finalBoardProps = {
          position: this.state.fen,
          squareStyles: this.state.squareStyles,
          allowDrag: () => false , 
          showNotation: this.props.showNotation,
          orientation: this.props.orientation === 'random' ? this.state.orientation : this.props.orientation,
          calcWidth: this.props.calcWidth,
        }
        this.props.callbackEnd(
          this.state.correctMoves,
          finalBoardProps)
      }, this.state.time * 1000);
    }
  }

  componentDidUpdate(prevProps) {
    if(!this.props.timed) {
      if(this.props.orientation !== prevProps.orientation){
        this.newPosition();
      }
    } 
  }

  componentWillUnmount() {
    if(this.props.timed) {
      clearInterval(this.interval);
    } 
  }

  /* ====================================== Component Methods ====================================== */

  // Generate new board position
  newPosition = () => {
    let orientation = null;
    if (this.props.orientation === 'random'){
      orientation = orientations[Math.floor(Math.random() * 2)];
    } else {
      orientation = this.props.orientation;
    }
    let randomGameIndex = Math.floor(Math.random() * PGNData.length);
    game.load_pgn(PGNData[randomGameIndex].data);
    let history = game.history();

    // In case game was not played
    if(history.length <= 2) {
      while(history.length <= 2){
        randomGameIndex = Math.floor(Math.random() * PGNData.length);
        game.load_pgn(PGNData[randomGameIndex].data);
        history = game.history();
      }
    }
    game.reset();

    // Initial half move must be the opposite color of orientation. Initial move cannot be last half move
    let randomMoveIndex = (orientation === 'white') ? 
      Math.floor(Math.random() *  Math.floor((history.length - 3) / 2)) * 2 + 1: 
      Math.floor(Math.random() *  Math.floor((history.length - 2) / 2)) * 2;
    
    // Do not use castles as move
    if (history[randomMoveIndex+1] === 'O-O' || history[randomMoveIndex+1] === 'O-O-O') {
        randomMoveIndex = (randomMoveIndex - 2) % history.length;
    }

    const initMove = history[randomMoveIndex];
    const nextMove = history[randomMoveIndex+1];

    // Save lastFullMove for defining the nextMoveColor state (ensures color and nextMove render at the same time)
    let i;
    let lastFullMove = {};
      for (i = 0; i < (randomMoveIndex); i++) {
        lastFullMove = game.move(history[i]);
    }
    
    this.setState({ 
      fen: game.fen(), 
      randomGameIndex: randomGameIndex,
      randomMoveIndex: randomMoveIndex,
      initMove: initMove,
      initMoveData: {},
      nextMove: nextMove,
      nextMoveData: {},
      nextMoveColor: '',
      history: history,
      nextMoveColor: lastFullMove.color === 'w' ? 'White' : 'Black',
      squareStyles: {},
      answer: '',
      orientation: orientation
    });

    setTimeout(() => this.makeInitMove(), 100);
    setTimeout(() => this.updateSquareStyling(), 800);
  }

  // For initMove animation
  makeInitMove = () => {
    const initMoveData =  game.move(this.state.initMove);
    const nextMoveData = game.move(this.state.nextMove);
    game.undo();
    this.setState({ fen: game.fen(), initMoveData: initMoveData, nextMoveData: nextMoveData });
  }

  // For initMove colors
  updateSquareStyling = () => {
    console.log(this.state);
    let squareStyles = {};
    squareStyles[this.state.initMoveData.from] = {backgroundColor: 'rgba(0, 255, 0, 0.3)'};
    squareStyles[this.state.initMoveData.to] = {backgroundColor: 'rgba(0, 255, 0, 0.3)'};
    this.setState({ squareStyles: squareStyles });
  }

  // Validate user move input
  onDrop = ({ sourceSquare, targetSquare, piece }) => {
    if (this.state.nextMoveData.from === sourceSquare 
       && this.state.nextMoveData.to === targetSquare
       && (this.state.nextMoveData.color + this.state.nextMoveData.piece.toUpperCase()) === piece) {
        if(!this.props.timed) {
          this.props.callbackDisableSettings(true);
        }
        game.move(this.state.nextMove); 
        this.setState({ 
          answer: 'correct', 
          fen: game.fen(), 
          correctMoves: this.state.correctMoves+1,
          correct: true
        });
       } else if (sourceSquare === targetSquare) {
        // Skip if piece is dropped onto original square
       } else {
         this.setState({ answer: 'incorrect', incorrect: true });
       }
  }

  // Only allow correct colored pieces to be dragged
  allowDrag = ({ piece }) => {
    if (piece.charAt(0) === this.state.nextMoveData.color) {
      return true;
    } else {
      return false;
    }
  }

  // Wait for movePrompt animation to end
  onAnimationEnd = () => {
    if (this.state.correct) {
      this.setState({ incorrect: false, correct: false });
      this.newPosition();
    }
    this.setState({ incorrect: false, correct: false });

    if(!this.props.timed) {
      setTimeout(() => {
        this.props.callbackDisableSettings(false)
      }, 800);
    }
  }

  /* ====================================== Render Function ====================================== */

  render() {
    const incorrect = this.state.incorrect;
    const correct = this.state.correct;

    return (
      <div>
        <Timer 
          time={this.state.time - this.state.timerCount} 
          display={this.props.timed ? 'block' : 'none'} />
        <Chessboard
          position={this.state.fen} 
          squareStyles={this.state.squareStyles}
          onDrop={this.onDrop}
          allowDrag={this.allowDrag} 
          showNotation={this.props.showNotation} 
          orientation={this.props.orientation === 'random' ? this.state.orientation : this.props.orientation}
          calcWidth={this.props.calcWidth}
          />
        <div 
        id='movePrompt' >
          {this.state.nextMoveColor === 'White' ? <FontAwesomeIcon icon={whiteCircle} /> : <FontAwesomeIcon icon={blackCircle} />}   
          <span> </span>
          <span 
          onAnimationEnd={this.onAnimationEnd}
          className={incorrect ? 'incorrect' : (correct ? 'correct' : '')}>
            {this.state.nextMove}
            </span>
        </div>
      </div>
    );
  }
}

function Timer(props) {
  return (
    <div 
      class="timer-container" 
      style={props.time < 10 ? {color: 'red', display: props.display} : {display: props.display}} >
      <div>{props.time}</div>
    </div>
  );
}


export default Board;