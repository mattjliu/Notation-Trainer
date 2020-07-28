import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Chessboard from 'chessboardjsx';
import GithubCorner from 'react-github-corner';
import { faCircle as blackCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as whiteCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './About.css';
import './Board.css';
import '../App.css';

const calcWidth = ({ screenWidth, screenHeight }) => {
  return (screenWidth || screenHeight) < 1800 ? ((screenWidth || screenHeight) < 550 ? screenWidth : 500) : 600;
}

class About extends Component {
  render() {
  return (
    <div class="top-container">
      <GithubCorner href="https://github.com/mattjliu/Notation-Trainer" />
      <div class='button-container'>
        <Link to='/'>
          <button class='back-button'>Back</button>
        </Link>
      </div>
      <div class='text-container'>
        <p class='text'>
          This is a simple app that I created to help chess players learn and practice algebraic notation. 
          The app will generate a position on the board and prompt you to make a given move.
          You will see the <FontAwesomeIcon icon={whiteCircle} /> icon if it's white's turn to move 
          and the <FontAwesomeIcon icon={blackCircle} /> icon if it's black's turn.
          For example, in the board below, the correct move is <span class='special-font'>Bb5</span>.
        </p>
      </div>
      <div class='board-container'>
        <Chessboard 
        draggable={false}
        position="r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R"
        calcWidth={calcWidth}
        />
      </div>
      <div 
        id='movePrompt' >
          <FontAwesomeIcon icon={whiteCircle} />
          <span> </span>
          <span>
            Bb5
          </span>
      </div>
      <div class='text-container'>
        <p class='text'>
          Your goal is to make as many correct moves as possible in 60 seconds. You can select 
          the <span class='special-font'>White</span> or <span class='special-font'>Black</span> options 
          to change the side of the prompted moves. This also changes the orientation of the board.
          Selecting <span class='special-font'>Random</span> would make the board randomly alternate between white and black.
          Checking the <span class='special-font'>Show Coordinates</span> option toggles the file and rank indicators on the board.
        </p>

        <p class='text'>
          This app was created using <a href="https://reactjs.org/">ReactJS</a> with the use 
          of <a href="https://github.com/willb335/chessboardjsx">Chessboard.jsx</a> and <a href="https://github.com/jhlywa/chess.js">chess.js</a>.
          The positions generated from the board are real positions from world championship games. 
          The PGN files from those events were downloaded <a href="https://www.pgnmentor.com/files.html#world">here</a>.
          You can also view the source code at my <a href="https://github.com/mattjliu/Notation-Trainer">github repository</a>.
        </p>
      </div>
    </div>
    );
  }
}

export default About;