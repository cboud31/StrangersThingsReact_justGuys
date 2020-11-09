import React, { useState, useEffect } from "react";
import { fecthPost, getPost, deletePost } from "../api";

const Posts = (props) => {
  const [newPost, setNewPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const { postList, setPostList, isLoggedIn} = props;



  const handleSubmit = (event) => {
    event.preventDefault();
    //creates post object to pass as body of Post
    const newPost = {
      description,
      location,
      price,
      willDeliver,
      title,
    };

    fecthPost(newPost).then((results) => {
      const postsCopy = postList.slice();
      postsCopy.push(results);
      setPostList(postsCopy);
    });
  };

  const handleDelete = (id, index) => {
      deletePost(id).then(results=>{
          const postsCopy = postList.slice();
          postsCopy.splice(index, 1)
          setPostList(postsCopy);
    });
  }

  const handleChange =(event)=>{
      if(event.target.value === "yes"){
setWillDeliver(true);
      }else{
setWillDeliver(false);

      }

  }

  return (
    <div id="post">
{  isLoggedIn ?    <aside>
        <form onSubmit={handleSubmit} className="post">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <br />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <br />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></input>
          <br />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <br />
          <select value={willDeliver} onChange={(e)=>{handleChange(e)}} name="Will Deliver" >
          <option selected="selected">Will Deliver</option>
  <option value="yes">Yes</option>
  <option value="no">No</option>

</select>
          <label>Will Deliver</label>
          <br />
          <input type="submit" value="Submit"></input>
        </form>
      </aside> : null}

      <div>
        {postList.map((post, idx) => {
          return (
            <div className="posts" key={idx}>
              <div>
                <h3>{post.title}</h3>
                <span>{post.author.username}</span>
                <div>{post.price}</div>
                <div>{post.description}</div>
                <div>{post.location}</div>
                <div>{post.willDeliver? "Will Deliver" : "Will Not Deliver"}</div>
              {post.isAuthor ? <button onClick={()=>{handleDelete(post._id,idx)}}>Delete</button> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
