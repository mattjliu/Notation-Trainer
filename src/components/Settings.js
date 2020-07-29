import React, { Component } from 'react';
import './Settings.css';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      orientation: 'white',
      showNotation: false
    };
    this.onChangeOrientation = this.onChangeOrientation.bind(this);
    this.onChangeNotation = this.onChangeNotation.bind(this);
  }

  onChangeOrientation(event) {
    this.setState({ orientation: event.target.value }, () => {
      this.props.callbackSettings(
        this.state.orientation, 
        this.state.showNotation);
    });
  }

  onChangeNotation(event) {
    this.setState({ showNotation: event.target.checked }, () => {
      this.props.callbackSettings(
        this.state.orientation, 
        this.state.showNotation
        );
    });
  }

  render() {
    return (
      <div class="settingsContainer" style={this.props.style} >
        <div class="radio-group-container" onChange={this.onChangeOrientation}>
          <label class="radio-container">White
            <input type="radio" value="white" name="orientation" defaultChecked disabled={this.props.disabled}/> 
            <span class="checkmark"></span>
          </label>
          <label class="radio-container">Black 
            <input type="radio" value="black" name="orientation" disabled={this.props.disabled}/> 
            <span class="checkmark"></span>
          </label>
          <label class="radio-container">Random
            <input type="radio" value="random" name="orientation" disabled={this.props.disabled}/> 
            <span class="checkmark"></span>
          </label>
        </div>

        <div class="checkbox-group-container">
          <label class="checkbox-container">Show Coordinates 
            <input type="checkbox" onChange={this.onChangeNotation} disabled={this.props.disabled}/> 
            <span class="checkmark"></span>
          </label>
        </div>   
      </div>
    );
  }
}

export default Settings;