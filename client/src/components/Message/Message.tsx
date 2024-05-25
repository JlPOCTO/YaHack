import {useState, useRef} from 'react';
import '../../css/Message.css';
import {useUserStore} from "../../stores/UserStore";
import {Icon} from "@gravity-ui/uikit";
import {FaceSmile} from "@gravity-ui/icons";
import Picker, {EmojiClickData} from "emoji-picker-react";
import Popup from "reactjs-popup";
import {Heart} from "@gravity-ui/icons";
import {isReaction} from "mobx/dist/core/reaction";


type Message = {
    message: any;
}
const getInitialCurrentMessage = () => {
    return sessionStorage.getItem('currentMessage') || '';
}

function Message(props: Message) {
    const {message} = props;
    const {userID} = useUserStore()
    const [scrollPos, setScrollPos] = useState(0)

    function isMine() {
        return message.sender_id === userID
    }

    function deleteReaction() {
        setIsReaction(false)
    }

    const [isReaction, setIsReaction] = useState(false);
    const ref = useRef<null | HTMLDivElement>(null)
    const [currentReaction, setCurrentReaction] = useState('😄');
    const onEmojiClick = (curEmoji: EmojiClickData) => {
        setIsReaction(true)
        setCurrentReaction(curEmoji.emoji)
        if (ref.current) {
            ref.current.style.height = `${ref.current.scrollHeight}px`
        }
        setScrollPos(ref.current?.scrollTop || 0)
        if (ref.current) {
            ref.current.scrollTop = scrollPos
        }
        // const currentMessage = sessionStorage.getItem('currentMessage')
        // const newMessage = currentMessage ? currentMessage + curEmoji.emoji : curEmoji.emoji
        // setCurrentMessage(newMessage)
        // sessionStorage.setItem('currentMessage', newMessage)
    }
    const [currrentMessage, setCurrentMessage] = useState(getInitialCurrentMessage())

    return (
        <>
            {!isMine() && <div className="Reaction">
                <div className="container">
                    <div className="notReaction">
                        <div className="arrow">
                            <div className="outer"></div>
                            <div className="inner"></div>
                        </div>
                        <div className="message-body">
                            <div className="block-of-message">
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
                            {isReaction && <div className="block-of-reaction" onClick={deleteReaction}>
                                <div>{currentReaction}</div>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="heart-button-left">
                        <Popup
                            trigger={
                                <button className='currentSettingsMessage'>
                                    <Icon className='Settings' data={Heart}/>
                                </button>}
                            position="top left"
                        >
                            <div className='emojiPopupMyReaction'>
                                <Picker onEmojiClick={onEmojiClick}/>
                            </div>
                        </Popup>
                    </div>
                </div>
            </div>
            }
            {isMine() && <div className="myReaction">
                <div className="myContainer">
                    <div className="notReaction">
                        <div className="arrow">
                            <div className="outer"></div>
                            <div className="inner"></div>
                        </div>
                        <div className="message-body">
                            <div className="block-of-message">
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
                            {isReaction && <div className="block-of-reaction" onClick={deleteReaction}>
                                <div>{currentReaction}</div>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="heart-button">
                        <Popup
                            trigger={
                                <button className='currentSettingsMessage'>
                                    <Icon className='Settings' data={Heart}/>
                                </button>}
                            position="top left"
                        >
                            <div className='emojiPopupMyReaction'>
                                <Picker onEmojiClick={onEmojiClick}/>
                            </div>
                        </Popup>
                    </div>
                </div>
            </div>
            }

        </>
    )

}

export default Message;
