import React, {useState} from 'react';
import '../../css/Message.css';
import {Button, Modal} from "@gravity-ui/uikit";
// import settings from "../../settings-svgrepo-com.svg";
import Profile from "../Profile/Profile";

type Message = {
    message: any;
}

function Message(props:Message) {
    const { message } = props;
  return (
    <div className="message">
        <div className="text">
            {message.message}
        </div>
    </div>

  );
}
export default Message;
