import React, { useState } from "react";
import { hitAPI } from "../api";

const MessageList = () => {
  const [messageList, setMessageList] = useState([]);

  hitAPI("GET", "/test/me")
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });

  hitAPI("GET", "/users/me")
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });

  return <h2>Inbox Coming Soon!</h2>;
};

export default MessageList;

/*

// Hit the API /users/me endpoint:
- hitAPI in a try/catch

// Console.log the messages array.

// Map over that array, rendering each message.



*/
