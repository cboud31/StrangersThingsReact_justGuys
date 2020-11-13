import React from "react";

const PostList = ({ postList }) => {
  return (
    <div className="postList">
      {postList.reverse().map((post, idx) => {
        return (
          <div className="post" key={idx}>
            {console.log(post)}
            <h3>{post.title}</h3>
            <span>{post.author.username}</span>
            <div>{post.price}</div>
            <div>{post.description}</div>
            <div>{post.location}</div>
            <div>{post.willDeliver ? "Will Deliver" : "Will Not Deliver"}</div>
            {/* {post.isAuthor ? (
                  <button
                    onClick={() => {
                      handleDelete(post._id, idx);
                    }}
                  >
                    Delete
                  </button>
                ) : null} */}
          </div>
        );
      })}
    </div>
  );
};

export default PostList;