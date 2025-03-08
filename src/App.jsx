import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import TodoList from "./components/TodoList";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F8F9FA;
    margin: 0;
    font-family: 'Inter', sans-serif;
    color: #333333;
  }
`;

// Get the container element to render into.
const container = document.getElementById("react-root");

// Render the TODO list into the DOM
ReactDOM.render(<TodoList />, container);
