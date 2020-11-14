import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams,
} from "react-router-dom";

// NOTE!! Install React Router (terminal --> npm install react-router-dom) if you haven't already.

import { getToken, clearToken, hitAPI, fetchReplies } from "./api";
import {
  Auth,
  NavButtons,
  Title,
  Posts,
  PostList,
  NewPost,
  NewMessage,
  MessageList,
} from "./components";

import "./styles.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [postList, setPostList] = useState([]);
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    hitAPI("GET", "/posts")
      .then((data) => {
        const { posts } = data;
        // console.log(posts);
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
    <Router>
      <div className="app">
        <header className="nav">
          <Title />
          {isLoggedIn ? (
            <>
              <NavButtons />
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
        </header>

        <div className="search">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by Title, Location or Price"
          />
        </div>

        <main className="main">
          <section className="feature">
            <PostList
              setActivePost={setActivePost}
              postList={filteredPosts()}
            />
          </section>
          <section className="sideBar">
         
            <Route exact path="/newpost">
              <NewPost isLoggedIn={isLoggedIn} />
            </Route>
            <Route exact path="/reply">
              {activePost ? <NewMessage post={activePost} /> : null}
            </Route>
            <Route exact path="/messages">
              <MessageList />
            </Route>
          </section>
        </main>

      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
