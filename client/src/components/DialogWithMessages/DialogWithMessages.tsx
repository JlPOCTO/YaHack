import React, {useState} from 'react';
import '../../css/DialogWithMessages.css';
import {Button, Modal} from "@gravity-ui/uikit";
// import settings from "../../settings-svgrepo-com.svg";
import Profile from "../Profile/Profile";
import HeaderOfBodyMain from "../HeaderOfBodyMain/HeaderOfBodyMain";
import AddMessage from "../AddMessage/AddMessage";
import ChatBar from "../ChatBar/ChatBar";
import Message from "../Message/Message";
type DialogWithMessages = {
    messages: any;
}

function DialogWithMessages(props:DialogWithMessages) {
    const { messages } = props;
    return (
        <div style={{
            overflowY: "auto",
            maxHeight: "85%",
            display: "flex",
            flexDirection: "column",
            alignItems:"center"
        }}>
        <div className="dialog-with-messages">
            {messages.map((message:any) =>
                <Message message={message}/>
            )}
        </div>
        </div>
    );
}

export default DialogWithMessages;
