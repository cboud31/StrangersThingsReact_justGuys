import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { getToken, clearToken, hitAPI } from "./api";
import { Auth, Title, Posts } from "./components";

import "./styles.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
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

  function filteredPosts() {
    return postList.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.price.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

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

      <main>
        <div className="search">
          <form>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by Title, Location or Price"
            />
          </form>
        </div>
        <Posts postList={filteredPosts()} isLoggedIn={isLoggedIn} />
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
