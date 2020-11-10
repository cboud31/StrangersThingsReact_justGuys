import React, { useState } from "react";

const Search = () => {
  const [post, setPost] = useState("");

  return (
    <form id="search">
      <fieldset>
        <label post="keywords"></label>
        <input
          id="keywords"
          type="text"
          placeholder="enter keywords..."
          value={(post.title, post.description)}
          onChange={(event) => setPost(event.target.value)}
        />
      </fieldset>
      <button>SEARCH</button>
    </form>
  );
};

export default Search;
