import React, { useState } from "react";

const Search = () => {
  const [searchResults, setSearchResults] = useState("");

  return (
    <div id="search">
      <input
        type="text"
        placeholder="enter keywords..."
        value={searchResults}
        onChange={(event) => setSearchResults(event.target.value)}
      />
      <button className="Search">SEARCH</button>
    </div>
  );
};

export default Search;
