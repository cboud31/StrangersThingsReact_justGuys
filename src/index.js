import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { getToken, clearToken, hitAPI } from "./api";
import Auth from "./components/Auth";
import Title from "./components/Title";
import Search from "./components/Search";
import "./styles.css";
import Posts from "./components/Posts";

const App = () => {
  // a piece of state that represents the status of the current user
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    hitAPI("GET", "/posts")
      .then((data) => {
        const { posts } = data;
        setPostList(posts);
      })
      .catch(console.error);
  }, [isLoggedIn]);

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
      <Posts
        postList={postList}
        setPostList={setPostList}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
