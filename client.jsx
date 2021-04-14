//const React = require("react");
import React from "react";
//const ReactDom = require("react-dom");
import ReactDom from "react-dom";
//const WordRelay = require("./WordRelay");
//import WordRepay from "./WordRelay";
//const NumberBaseball = require("./NumberBaseball");
//import NumberBaseball from "./NumberBaseball";
//import Test from "./RenderTest";
//import ResponseCheck from "./ResponseCheck";
//import RSP from "./RSP";
import { hot } from "react-hot-loader/root";
//import Lotto from "./Lotto";
import TicTacToe from "./TicTacToe";

const Hot = hot(TicTacToe);

ReactDom.render(<TicTacToe />, document.querySelector("#root"));
