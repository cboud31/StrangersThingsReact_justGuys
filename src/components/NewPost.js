import React, { useState, useEffect } from "react";
import { fetchPost, hitAPI, deletePost, fetchMessages } from "../api";

const NewPost = (props) => {
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
    <>
      <div className="NewPost">
        {isLoggedIn ? (
          <form onSubmit={handleSubmit} className="post">
            <h3>Create Post</h3>
            <input
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <br />
            <textarea
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
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
            <input className="Submit" type="submit" value="Submit"></input>
          </form>
        ) : null}
      </div>

      {/* <div className="postContainer">
        <div>
          <aside>
            <form onSubmit={handleSubmit} classname="messages">
              <h3>Messages</h3>
              <textarea
                type="scroll"
                placeholder="Drag the bottom right corner for more space...."
              ></textarea>
              <br></br>
              <button className="Submit">Submit</button>
            </form>
          </aside>
        </div>
      </div> */}

      {/* {postList.reverse().map((post, idx) => {
        return (
          <div className="posts" key={idx}>
            <h3>{post.title}</h3>
            <span>{post.author.username}</span>
            <div>{post.price}</div>
            <div>{post.description}</div>
            <div>{post.location}</div>
            <div>{post.willDeliver ? "Will Deliver" : "Will Not Deliver"}</div>
            {post.isAuthor ? (
              <button
                className="Delete"
                onClick={() => {
                  handleDelete(post._id, idx);
                }}
              >
                Delete
              </button>
            ) : null}
          </div>
        );
      })} */}
    </>
  );
};

export default NewPost;
