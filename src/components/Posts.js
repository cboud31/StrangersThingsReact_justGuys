import React, { useState, useEffect } from "react";
import { fetchPost, hitAPI, deletePost } from "../api";

const Posts = (props) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [selectDeliver, setSelectDeliver] = useState("no");

  const { postList, setPostList, isLoggedIn } = props;

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      description,
      location,
      price,
      willDeliver,
      title,
    };

    fetchPost(newPost).then((result) => {
      const post = result.post;
      const postsCopy = postList.slice();
      postsCopy.push(post);
      // console.log(postsCopy, 'in post')
      setPostList(postsCopy);
    });
  };

  const handleDelete = (id, index) => {
    deletePost(id).then((results) => {
      const postsCopy = postList.slice();
      postsCopy.splice(index, 1);
      setPostList(postsCopy);
    });
  };

  const handleChange = (event) => {
    setSelectDeliver(event.target.value);
    if (event.target.value === "yes") {
      setWillDeliver(true);
    } else {
      setWillDeliver(false);
    }
  };

  return (
    <div>
      <aside id="post">
        {isLoggedIn ? (
          <aside>
            <form onSubmit={handleSubmit} className="post">
              <h3>Create Post</h3>
              <input
                type="text"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <br />
              <input
                type="text"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              ></input>
              <br />
              <input
                type="text"
                value={location}
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
              ></input>
              <br />
              <input
                type="text"
                value={price}
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              ></input>
              <br />
              <select
                value={selectDeliver}
                onChange={(e) => {
                  handleChange(e);
                }}
                name="Will Deliver"
              >
                <option value="no">No</option>

                <option value="yes">Yes</option>
              </select>
              <label>Will Deliver</label>
              <br />
              <input type="submit" value="Submit"></input>
            </form>
          </aside>
        ) : null}

      <div>
        {postList.reverse().map((post, idx) => {
          return (
            <div className="posts" key={idx}>
                <h3>{post.title}</h3>
                <span>{post.author.username}</span>
                <div>{post.price}</div>
                <div>{post.description}</div>
                <div>{post.location}</div>
                <div>
                {post.willDeliver ? "Will Deliver" : "Will Not Deliver"}
                </div>
                  {post.isAuthor ? (
                    <button
                      onClick={() => {
                        handleDelete(post._id, idx);
                      }}
                    >
                      Delete
                    </button>
                  ) : null}
              </div>
            );
          })}
        </div>
        </aside>
    </div>
  );
};

export default Posts;
