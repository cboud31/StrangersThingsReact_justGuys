import React, { useState } from "react";
import ReactDOM from "react-dom";

import { getToken, clearToken, fetchPosts } from "./api";

import { Posts, Search, Auth } from "./components";

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

      <Posts fetchPosts={fetchPosts} />
      {/*<Search />*/}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
