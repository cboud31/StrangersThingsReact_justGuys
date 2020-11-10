import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { getToken, clearToken, hitAPI } from "./api";
import { Auth, Title, Search, Posts } from "./components";
import "./styles.css";

const App = () => {
  const [searchResults, setSearchResults] = useState({ post: {} });
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
      <Search setSearchResults={setSearchResults} />
      <Posts
        postList={postList}
        setPostList={setPostList}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
