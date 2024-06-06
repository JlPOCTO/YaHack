import { useState, useEffect } from 'react';
import '../../css/Message.css';
import { useUserStore } from "../../stores/UserStore";
import { Icon } from "@gravity-ui/uikit";
import Picker, { EmojiClickData } from "emoji-picker-react";
import Popup from "reactjs-popup";
import { Heart } from "@gravity-ui/icons";
import { observer } from "mobx-react-lite";


type Message = {
    message: any;
    dialogType: any;
}

function Message(props: Message) {
    const { message, dialogType } = props;
    let { apiVersion, currentUserID } = useUserStore()
    const [scrollPos, setScrollPos] = useState(0)
    const [userName, setName] = useState([])
    function isMine() {
        return message.senderId === currentUserID;
    }
    useEffect(() => {
        const getUserName = async () => {
            const res = await fetch(apiVersion + `/users/${message.senderId}`)
            const curMessage = await res.json()
            let user = currentUserID
            if (!curMessage.name) {
                user = curMessage.login
            } else {
                user = curMessage.name
            }
            setName(user)
        }
        getUserName()
    }, [])

    const [isReaction, setIsReaction] = useState(false);
    // const ref = useRef<null | HTMLDivElement>(null)
    const [currentReaction, setCurrentReaction] = useState('😄');
    // const onEmojiClick = (curEmoji: EmojiClickData) => {
    //     setIsReaction(true)
    //     setCurrentReaction(curEmoji.emoji)
    // }
    const onEmojiClick = async (curEmoji: EmojiClickData) => {
        if (curEmoji.emoji !== "") {
            const res = await fetch(apiVersion + `/messages/${message.id}/reactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reaction: curEmoji.emoji,
                    messageId: message.id,
                    userId: message.senderId
                })
            });
        }
    }

    function getReactions(r: any) {
        return r.reaction
    }

    // useEffect(() => {
    //     const getReactions = async () => {
    //         const res = await fetch(apiVersion + `/messages/${message.id}/reactions`)
    //         const reactions = await res.json()
    //         // setIsReaction(true)
    //         console.log(reactions)
    //         // setCurrentReaction(reactions)
    //     }
    //     getReactions() 
    // }, [])

    // function deleteReaction() {
    //     setIsReaction(false)
    // }

    const deleteReaction = async (r: any) => {
        const res = await fetch(apiVersion + `/messages/${message.id}/reactions`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reaction: r.reaction
            })
        })
    }


    function getMessageTime(time: number) {
        const date = new Date(time);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    }

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
                                {dialogType === "group" && <div className="author">
                                    <p>{userName}</p>
                                </div>}
                                <div className="text">
                                    <p>{message.content}</p>
                                </div>
                                {message.reactions.length === 0 && <div className="data">
                                    <p>{getMessageTime(message.sendingTime)}</p>
                                </div>}
                            </div>
                            {message.reactions.length !== 0 && <div className="block-of-reaction">
                                <div className='reactionsAndTime'>
                                    {message.reactions.map((r: any) =>
                                        <button className='reactionsBlock' onClick={() => deleteReaction(r)}>{getReactions(r)}</button>
                                    )}
                                </div>
                                <div className="data_reaction">
                                    <p>{getMessageTime(message.sendingTime)}</p>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="heart-button-left">
                        <Popup
                            trigger={
                                <button className='currentSettingsMessage'>
                                    <Icon className='Settings' data={Heart} />
                                </button>}
                            position="top left"
                        >
                            <div className='emojiPopupMyReaction'>
                                <Picker onEmojiClick={onEmojiClick} />
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
                                {dialogType === "group" && <div className="author">
                                    <p>{userName}</p>
                                </div>}
                                <div className="text">
                                    <p>{message.content}</p>
                                </div>
                                {message.reactions.length === 0 && <div className="data">
                                    <p>{getMessageTime(message.sendingTime)}</p>
                                </div>}
                            </div>
                            {message.reactions.length !== 0 && <div className="block-of-reaction">
                                <div className='reactionsAndTime'>
                                    {message.reactions.map((r: any) =>
                                        <button className='reactionsBlock' onClick={() => deleteReaction(r)}>{getReactions(r)}</button>
                                    )}
                                </div>
                                <div className="data_reaction">
                                    <p>{getMessageTime(message.sendingTime)}</p>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="heart-button">
                        <Popup
                            trigger={
                                <button className='currentSettingsMessage'>
                                    <Icon className='Settings' data={Heart} />
                                </button>}
                            position="top left"
                        >
                            <div className='emojiPopupMyReaction'>
                                <Picker onEmojiClick={onEmojiClick} />
                            </div>
                        </Popup>
                    </div>
                </div>
            </div>
            }

        </>
    )

}

export default observer(Message);