import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Board from './Board';
import Settings from './Settings';
import Chessboard from 'chessboardjsx';
import './Home.css';

const calcWidth = ({ screenWidth, screenHeight }) => {
  return (screenWidth || screenHeight) < 1800 ? ((screenWidth || screenHeight) < 550 ? screenWidth : 500) : 600;
}
  
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: 'init',
      orientation: 'white',
      showNotation: false
    }
    this.handleStart = this.handleStart.bind(this);
  }

  renderSwitch(state) {
    switch(state) {

      case 'init': 
        return (
          <div class="init-container">
            Chess Notation Trainer
            <Chessboard 
            draggable={false}
            position="start" 
            orientation={this.state.orientation === 'random' ? 'white' : this.state.orientation} 
            showNotation={this.state.showNotation}
            calcWidth={calcWidth}
            />
            <button class='start button' onClick={this.handleStart}>Start</button>
            <Link to='/about'>
              <button class='about button'>About</button>
            </Link>
          </div>
        );

      case 'active': 
        return (
          <div>
            <Board 
            callbackEnd={this.callbackEnd} 
            orientation={this.state.orientation} 
            showNotation={this.state.showNotation} 
            calcWidth={calcWidth} />
          </div>
        );

      case 'ended': 
        return (
          <div class="ended-container" >
            Score: {this.state.correctMoves} Moves
            <Chessboard 
            {...this.state.finalBoardProps}
            orientation={this.state.orientation === 'random' ? 'white' : this.state.orientation} 
            showNotation={this.state.showNotation} 
            calcWidth={calcWidth}
            />
            <button class='start button' onClick={this.handleStart}>Start</button>
            <Link to='/about'>
              <button class='about button'>About</button>
            </Link>
          </div>
        );

    }
  }

  handleStart(event) {
    this.setState({ currentState: 'active' });
  }

  callbackEnd = (correctMoves, finalBoardProps) => {
    this.setState({ 
      correctMoves: correctMoves, 
      finalBoardProps: finalBoardProps,
      currentState: 'ended' });
  }

  callbackSettings = (orientation, showNotation) => {
    this.setState({
      orientation: orientation,
      showNotation: showNotation
    });
  }

  render() {
    return (
      <div>
        {this.renderSwitch(this.state.currentState)}
        <Settings 
        callbackSettings={this.callbackSettings} 
        style={{display: this.state.currentState === 'active' ? 'none' : 'block'}} />
      </div>
    );
  }
}

export default Home;