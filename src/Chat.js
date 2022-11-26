import React from "react";
import "./Chat.css";
import Avatar from "@material-ui/core/Avatar";

const Chat = ({ name, contact, profilePic, distance }) => {
  return (
      <div className="chat">
        <Avatar className="chat__image" src={profilePic} />
        <div className="chat__details">
          <h2>{name}</h2>
          <p>{contact}</p>
        </div>
        <p className="chat__timestamp">{distance} km</p>
      </div>
  );
};

export default Chat;
