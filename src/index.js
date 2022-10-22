import React from 'react';
import ReactDOM from 'react-dom';
import Board, { SIZE as BOARD_SIZE } from './components/board';
import MoveList from './components/move-list';
import Status from './components/status';
import ResetButton from './components/reset-button';
import Navigation from './components/navigation';
import './style.css';
import MoveAD from './components/moveAD';


class Position {
  constructor(i) {
    this.row = Math.floor(i / BOARD_SIZE) + 1;
    this.col = (i % BOARD_SIZE) + 1;
  }

  toString() {
    return `${this.row}, ${this.col}`;
  }
}

function checkRow(squares, x, step) {
    return (squares[x] && squares[x] === squares[x+step] && squares[x] === squares[x+step*2] && squares[x] === squares[x+step*3] && squares[x] === squares[x+step*4]);

}
class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(BOARD_SIZE).fill(null),
      }],
      nextPlayer: 'X',
      stepNumber: 0,
      moveAD: 'A',
    };

    this.handleClick = this.handleClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
    this.asdes = this.asdes.bind(this);
  }

  currentSquares() {
    return this.state.history[this.state.stepNumber].squares;
  }

  handleClick(i) {
    const squares = this.currentSquares().slice();
    if (this.calculateWinner(squares) || squares[i]) {
        return;
    }
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    squares[i] = this.state.nextPlayer;
    this.setState({
      history: history.concat([{
        squares: squares,
        player: this.state.nextPlayer,
        position: new Position(i),
      }]),
      nextPlayer: (this.state.nextPlayer === 'X') ? 'O' : 'X',
      stepNumber: history.length,
    });
  }

  calculateWinner(squares) {
    let lines = [];
    let step = 0;
    //horizontal
    step = 1;
    for (let x = 0; x < BOARD_SIZE; x++) { 
      for (let y = x*BOARD_SIZE; y < (x*BOARD_SIZE+BOARD_SIZE)-4; y++){
        if (checkRow(squares,y,step)) {
          lines[0]=[y,y+step,y+step*2,y+step*3,y+step*4]
          return {player: squares[y], line: lines[0]};
        }
      }
    }  
    //vertical
    step = BOARD_SIZE;
    for (let x = 0; x < BOARD_SIZE-4; x++) { 
      for (let y = x*BOARD_SIZE; y < (x*BOARD_SIZE+BOARD_SIZE); y++){
        if (checkRow(squares,y,step)) {
          lines[0]=[y,y+step,y+step*2,y+step*3,y+step*4]
          return {player: squares[y], line: lines[0]};
        }
      }
    }  
    //major diag
    step = BOARD_SIZE+1;
    for (let x = 0; x < BOARD_SIZE-4; x++) { 
      for (let y = x*BOARD_SIZE; y < (x*BOARD_SIZE+BOARD_SIZE)-4; y++){
        if (checkRow(squares,y,step)) {
          lines[0]=[y,y+step,y+step*2,y+step*3,y+step*4]
          return {player: squares[y], line: lines[0]};
        }
      }
    }  
    //minor diag
    step = BOARD_SIZE-1;
    for (let x = 0; x < BOARD_SIZE; x++) { 
      for (let y = x*BOARD_SIZE+4; y < (x*BOARD_SIZE+BOARD_SIZE); y++){
        if (checkRow(squares,y,step)) {
          lines[0]=[y,y+step,y+step*2,y+step*3,y+step*4]
          return {player: squares[y], line: lines[0]};
        }
      }
    } 
    return null;
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      nextPlayer: (step % 2) ? 'O' : 'X',
    });
  }

  resetGame() {
    this.setState({
      history: [{
        squares: Array(BOARD_SIZE).fill(null),
      }],
      nextPlayer: 'X',
      stepNumber: 0,
    });
  }

  asdes(){
    if (this.state.moveAD === 'A'){
      this.setState({
        moveAD: 'D',
      })
    } else {
      this.setState({
        moveAD: 'A',
      })
    }
  }

  render() {
    const history = this.state.history;
    const lastSquares = history[history.length - 1].squares;
    const winner = this.calculateWinner(lastSquares);
    const draw = lastSquares.every(element => element !== null) ? 'D' : null;
    const winnerPlayer = winner ? winner.player : null;
    let movead = this.state.moveAD;
    let winnerLine = null;
    // only show winner line when last move is selected in history
    if (winner && this.state.stepNumber === history.length - 1 ) {
      winnerLine = winner.line;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Status winner={winnerPlayer} nextPlayer={this.state.nextPlayer} draw={draw}/>
          <Board winnerLine={winnerLine} squares={this.currentSquares()}
                 onClick={this.handleClick} />
          <ResetButton onReset={this.resetGame} />
          <Navigation stepNumber={this.state.stepNumber}
                      historyLength={history.length}
                      onClick={this.jumpTo} />
        </div>
        <div className="game-info">
          <MoveAD movead={movead} 
                  onClick={this.asdes}/>
          <MoveList history={this.state.history} winner={winnerPlayer} draw={draw} movead={movead}
                    onClick={this.jumpTo} stepNumber={this.state.stepNumber} />
        </div>
      </div>
    );
  }
}


ReactDOM.render(<Game />, document.getElementById('root') );
