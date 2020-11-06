import React from "react";
import { fetchPosts } from "../api";
console.log(fetchPosts);

const Posts = (props) => {
  const { fetchPosts } = props;

  const {
    active,
    description,
    location,
    messages,
    price,
    title,
    willDeliver,
  } = fetchPosts;

  return (
    <main>
      <div id="posts">
        <header>
          <h3>{title}xcvvdfg</h3>
          <h4>{description}gdfgdfgadfgd</h4>
        </header>
      </div>
    </main>
  );
};

export default Posts;
