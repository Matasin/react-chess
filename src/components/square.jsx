import React from "react";

const Square = (props) => {
    const { shade, ...rest } = props;
    return <button className={`square ${shade}`} {...rest}></button>;
};

export default Square;
