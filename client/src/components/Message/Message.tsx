import React, {useState} from 'react';
import '../../css/Message.css';
import {useUserStore} from "../../stores/UserStore";
import {Icon} from "@gravity-ui/uikit";
import {FaceSmile} from "@gravity-ui/icons";
import Picker, {EmojiClickData} from "emoji-picker-react";
import Popup from "reactjs-popup";
import { Heart } from 'lucide-react';

type Message = {
    message: any;
}
const getInitialCurrentMessage = () => {
    return sessionStorage.getItem('currentMessage') || '';
}

function Message(props: Message) {
    const {message} = props;
    const {userID} = useUserStore()

    function isMine() {
        return message.sender_id === userID
    }

    const onEmojiClick = (curEmoji: EmojiClickData) => {
        const currentMessage = sessionStorage.getItem('currentMessage')
        const newMessage = currentMessage ? currentMessage + curEmoji.emoji : curEmoji.emoji
        setCurrentMessage(newMessage)
        sessionStorage.setItem('currentMessage', newMessage)
    }
    const [currrentMessage, setCurrentMessage] = useState(getInitialCurrentMessage())

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
            {isMine() && <div className="myReaction">
                <div className="myContainer">
                    <div className="notReaction">
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
                    </div>
                    <div className="heart-button">
                        <Popup
                            trigger={
                                <button className='currentSettingsMessage'>
                                    <Icon className='Settings' data={FaceSmile}/>
                                </button>}
                            position="top left"
                        >
                            <div className='emojiPopup'>
                                <Picker onEmojiClick={onEmojiClick}/>
                            </div>
                        </Popup>
                    </div>
                </div>
            </div>
            }

        </>
    )
        ;
}

export default Message;
