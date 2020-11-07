import React, { useState } from "react";
import ReactDOM from "react-dom";

import { getToken, clearToken } from "./api";

import { Posts, Search, User, Auth } from "./components";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  return (
    <div className="app">
      {isLoggedIn ? (
        <>
          
          <button
            onClick={() => {
              clearToken();
              setIsLoggedIn(false);
            }}
          >
            LOG OUT
          </button>

          <Posts isLoggedIn={ isLoggedIn } />
        </>
      ) : (
        <Auth setIsLoggedIn={setIsLoggedIn} />
      )}

      {/* <Search /> */}
      {/* <User /> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
