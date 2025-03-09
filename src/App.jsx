import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import TodoList from "./components/TodoList";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f5f5f5;
    margin: 0;
    font-family: 'Inter', sans-serif;
    color: #333333;
  }
`;

// Get the container element to render into.
const container = document.getElementById("react-root");

// Render the TODO list into the DOM. Included the GlobalStyle to change background color to gray
ReactDOM.render(
  <>
    <GlobalStyle />
    <TodoList />
  </>,
  container
);
