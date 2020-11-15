import React, { useState, useEffect } from "react";
import { hitAPI } from "../api";

const MessageList = ({ messageList }) => {
  return (
    <div className="MessageList">
      {messageList.length == 0 ? (
        <h2>Your inbox is currently empty.</h2>
      ) : (
        messageList.map((message, idx) => {
          return (
            <div
              className="message"
              key={idx}
              style={{ border: "1px solid black" }}
            >
              <h3>From: {message.fromUser.username}</h3>
              <h3>Content: {message.content}</h3>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MessageList;
