import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    handleClick(squareId) {
        let squares = this.props.squares;
        if (calculateWinner(squares) || squares[squareId]) {
            return;
        }
        this.props.onChange(squareId);
    }

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
  }

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [Array(9).fill(null), ],
            stepNumber: 0,
        }
        this.onChange = this.onChange.bind(this);
    }

    getNextPlayer() {
        return this.state.stepNumber % 2? 'O': 'X';
    }

    onChange(squareId) {
        let stepNumber = this.state.stepNumber;
        let squares = this.state.history[stepNumber].slice();
        squares[squareId] = this.getNextPlayer();
        let history = this.state.history.slice(0, stepNumber + 1);
        history.push(squares);
        this.setState({
            history: history,
            stepNumber: stepNumber + 1
        });
    }

    jumpTo(move) {
        this.setState({stepNumber: move});
    }

    render() {
        const squares =  this.state.history[this.state.stepNumber];
        const winner = calculateWinner(squares);

        const moves = this.state.history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = `Next player: ${this.getNextPlayer()}`;
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={squares}
                        onChange={this.onChange}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

  // ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
