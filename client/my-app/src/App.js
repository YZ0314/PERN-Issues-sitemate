import React, { Fragment } from "react";
import "./App.css";

//components

import InputTodo from "./components/AddIssue";
import ListTodos from "./components/ListIssues";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
