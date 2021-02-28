import Square from "../components/square";

const Info = ({ status, turn, whiteKilled, blackKilled }) => {
    return (
        <div className="info">
            <span>Turn for:</span>
            <div
                className="turn-box"
                style={
                    turn === "white"
                        ? { backgroundColor: "white" }
                        : { backgroundColor: "black" }
                }
            ></div>

            <h2 className="status">{status}</h2>

            <div className="killed-pieces --white">
                {whiteKilled.map(({ style, name }, index) => {
                    if (name === "King") return <h1>Black won</h1>;
                    return <Square key={index} style={style} />;
                })}
            </div>
            <div className="killed-pieces  --black">
                {blackKilled.map(({ style, name }, index) => {
                    if (name === "King") return <h1>White won</h1>;
                    return <Square key={index} style={style} />;
                })}
            </div>
        </div>
    );
};

export default Info;
