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

import { getToken, clearToken, hitAPI } from "./api";
import {
  Auth,
  Title,
  Posts,
  PostList,
  NewPost,
  NewMessage,
} from "./components";

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
    <Router>
      <div className="app">
        <header className="nav">
          <Title />
          {isLoggedIn ? (
            <>
              <div className="navButtons">
                <button>PROFILE</button>
                <Link to="/newmessage">
                  <button>MESSAGES</button>
                </Link>
                <Link to="/newpost">
                  <button>NEW POST</button>
                </Link>
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
            <PostList postList={filteredPosts()} />
          </section>
          {/* Can merge New Post/Message into <Forms />? */}
          <section className="formArea">
            <Route path="/newpost">
              <NewPost isLoggedIn={isLoggedIn} />
            </Route>
            <Route path="/newmessage">
              <NewMessage />
            </Route>
          </section>
        </main>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
