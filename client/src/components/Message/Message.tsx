import React, {useState} from 'react';
import '../../css/Message.css';
import {useUserStore} from "../../stores/UserStore";

type Message = {
    message: any;
}

function Message(props: Message) {
    const {message} = props;
    const {userID} = useUserStore()
    function isMine() {
        return message.sender_id === userID
    }
    return (
        <>
            {!isMine() && <div className="container">
                <div className="arrow">
                    <div className="outer"></div>
                    <div className="inner"></div>
                </div>
                <div className="message-body">
                    <div className="author">
                        <p>{message.sender_id}</p>
                    </div>
                    <div className="text">
                        <p>{message.message}</p>
                    </div>
                    <div className="data">
                        <p>{message.time}</p>
                    </div>
                </div>
            </div>}
            {isMine() && <div className="myContainer">
                <div className="arrow">
                    <div className="outer"></div>
                    <div className="inner"></div>
                </div>
                <div className="message-body">
                    <div className="author">
                        <p>{message.sender_id}</p>
                    </div>
                    <div className="text">
                        <p>{message.message}</p>
                    </div>
                    <div className="data">
                        <p>{message.time}</p>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Message;
