import React, { Component } from "react";

import Square from "./square";

const isEven = (num) => {
    return num % 2 == 0;
};

export default class Board extends Component {
    render() {
        const board = [];
        for (let i = 0; i < 8; i++) {
            const squareRows = [];
            for (let j = 0; j < 8; j++) {
                // square id
                const id = i * 8 + j;

                // color of square
                const shade =
                    (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
                        ? "--light"
                        : "--dark";

                // bg icon of piece or/and bg on select square
                const style = this.props.squares[id]
                    ? this.props.squares[id].style
                    : null;

                // const style =
                //     this.props.squares[id] && this.props.squares[id].style;

                squareRows.push(
                    <Square
                        key={id}
                        shade={shade}
                        // directed
                        style={style}
                        onClick={() => this.props.handleClick(id)}
                        // directed
                    />
                );
            }
            board.push(
                <div key={i} className="board__row">
                    {squareRows}
                </div>
            );
        }

        return <div className="board">{board}</div>;
    }
}
