import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Board from './Board';
import Settings from './Settings';
import './Board.css';
import './Practice.css';

const calcWidth = ({ screenWidth, screenHeight }) => {
  return (screenWidth || screenHeight) < 1800 ? ((screenWidth || screenHeight) < 550 ? screenWidth : 500) : 600;
}

class Practice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: 'white',
      showNotation: false,
      disableSettings: false
    }
  }

  callbackSettings = (orientation, showNotation) => {
    this.setState({
      orientation: orientation,
      showNotation: showNotation
    });
  }

  callbackDisableSettings = (disableSettings) => {
    this.setState({
      disableSettings: disableSettings
    });
  }

  render() {
    return (
      <div>
        <div class='button-container'>
          <Link to='/'>
            <button class='back-button'>Back</button>
          </Link>
        </div>
        <Board 
        callbackDisableSettings={this.callbackDisableSettings}
        orientation={this.state.orientation} 
        showNotation={this.state.showNotation} 
        calcWidth={calcWidth}
        timed={false} />
        <Settings 
        callbackSettings={this.callbackSettings}
        style={{ marginTop: 15 }}
        disabled={this.state.disableSettings} />
      </div>
    );
  }
}

export default Practice;