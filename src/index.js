import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Game from "./game";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <Game />
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
