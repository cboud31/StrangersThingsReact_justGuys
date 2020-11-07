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
      <Posts fetchPosts={fetchPosts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
