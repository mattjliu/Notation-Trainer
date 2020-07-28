import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';

class App extends React.Component {
  render () {
    return (
      <div class="board-container">
        <HashRouter basename='/'>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
        </HashRouter>
      </div>
    );
  }
}

export default App;
