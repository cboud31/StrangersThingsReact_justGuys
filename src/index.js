import React, { useState } from "react";
import ReactDOM from "react-dom";

import { getToken, clearToken } from "./api";
import Auth from "./components/Auth";
import Title from "./components/Title";
import Search from "./components/Search";


import "./styles.css";

const App = () => {
  // a piece of state that represents the status of the current user
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  return (
    <div className="app">
      <header className="nav">
        <Title />
        {isLoggedIn ? (
          <>
            <div className="navButtons">
              <button>PROFILE</button>
              <button>MESSAGES</button>
              <button>NEW POST</button>
              <button
                onClick={() => {
                  clearToken();
                  setIsLoggedIn(false);
                }}
              >
                LOG OUT
              </button>
            </div>
          </>
        ) : (
          <Auth setIsLoggedIn={setIsLoggedIn} />
        )}
      </header>
      <Search />
      {/* <Main /> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
