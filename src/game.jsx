import React, { Component } from "react";
import Board from "./components/board";
import Info from "./components/info";
import initialise from "./helpers/initialise";

export default class Game extends Component {
    constructor() {
        super();
        this.state = {
            squares: initialise(),
            whiteKilled: [],
            blackKilled: [],
            player: 1,
            sourceSelection: false,
            status: "Hello, let's play in chess",
            turn: "white",
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (i) => {
        const squares = this.state.squares.slice();

        if (!this.state.sourceSelection) {
            // check empty square
            if (!squares[i]) {
                this.setState({ status: `Grab a piece, not a empty field...` });
                return;
            }
            // check correct pieces
            if (squares[i].player !== this.state.player) {
                this.setState({
                    status: `Choose your own pieces, now it's turn player ${this.state.player}`,
                });
                return;
            } else {
                squares[i].style = {
                    ...squares[i].style,
                    backgroundColor: "rgb(66 175 76)",
                };

                this.setState({
                    status: "Choose destination",
                    sourceSelection: i,
                });
            }
            // check correct pieces
        } else {
            const squares = this.state.squares.slice();
            const whiteKilled = this.state.whiteKilled.slice();
            const blackKilled = this.state.blackKilled.slice();

            const isOccupied = squares[i] ? true : false;
            const isMovePossible = squares[
                this.state.sourceSelection
            ].isMovePossible(this.state.sourceSelection, i, isOccupied);
            const srcToDestPath = squares[
                this.state.sourceSelection
            ].getSrcToDestPath(this.state.sourceSelection, i);

            const isMoveLegal = this.isMoveLegal(srcToDestPath);

            if (squares[i] && this.state.player === squares[i].player) {
                this.setState({
                    status: "You can't kill you pieces!",
                    sourceSelection: false,
                });
                return;
            }
            if (isMovePossible && isMoveLegal) {
                if (squares[i] !== null) {
                    if (squares[i].player === 1) {
                        whiteKilled.push(squares[i]);
                    } else {
                        blackKilled.push(squares[i]);
                    }
                }

                squares[i] = squares[this.state.sourceSelection];

                // remove previous bg on turn
                squares[this.state.sourceSelection] = null;

                squares[i].style = {
                    ...squares[i].style,
                    backgroundColor: "",
                };

                const player = this.state.player === 1 ? 2 : 1;
                const turn = this.state.turn === "white" ? "black" : "white";
                this.setState({
                    sourceSelection: false,
                    squares: squares,
                    whiteKilled: whiteKilled,
                    blackKilled: blackKilled,
                    player: player,
                    status: "",
                    turn: turn,
                });
            } else {
                this.setState({
                    status:
                        "Wrong selection. Choose valid source and destination again.",
                    sourceSelection: false,
                });
            }
        }
    };

    isMoveLegal(srcToDestPath) {
        let isLegal = true;
        for (let i = 0; i < srcToDestPath.length; i++) {
            if (this.state.squares[srcToDestPath[i]] !== null) {
                isLegal = false;
            }
        }
        return isLegal;
    }

    render() {
        const { status, squares, turn, whiteKilled, blackKilled } = this.state;
        console.log(whiteKilled);
        return (
            <div className="game">
                <Info
                    status={status}
                    turn={turn}
                    whiteKilled={whiteKilled}
                    blackKilled={blackKilled}
                />
                <Board squares={squares} handleClick={this.handleClick} />
            </div>
        );
    }
}
