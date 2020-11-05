import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Posts, Search, User } from "./components";

const App = () => {
  return (
    <div className="app">
      <Posts />
      <Search />
      <User />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
