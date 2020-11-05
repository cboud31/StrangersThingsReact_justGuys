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
          <h1>Thanks for logging in!</h1>
          <button
            onClick={() => {
              clearToken();
              setIsLoggedIn(false);
            }}
          >
            LOG OUT
          </button>
        </>
      ) : (
        <Auth setIsLoggedIn={setIsLoggedIn} />
      )}

      {/*<Posts />
      <Search />
      <User />*/}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
