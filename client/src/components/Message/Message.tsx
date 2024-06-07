import {useEffect, useState} from 'react';
import '../../css/Message.css';
import {useUserStore} from "../../stores/UserStore";
import {Icon} from "@gravity-ui/uikit";
import Picker, {EmojiClickData} from "emoji-picker-react";
import Popup from "reactjs-popup";
import {Heart} from "@gravity-ui/icons";
import {observer} from "mobx-react-lite";

type Message = {
    message: any;
}

function Message(props: Message) {
    const {message} = props;
    let {apiVersion, currentUserID, idNames} = useUserStore()
    const [isContent, setContent] = useState(false)

    function isMine() {
        return message.senderId === currentUserID;
    }
    const [currentReactions, setReactions] = useState([]);

    useEffect(() => {
        const reactions = message.reactions
        const rs: any = []
        reactions.forEach((r: any) => {
            rs.push(r.reaction)
        })
        setReactions(rs)
    }, [])

    useEffect(() => {
        const getMyInfo = async () => {
            const res = await fetch(apiVersion + `/messages/${message.id}`)
            const isExist = await res.json();
            setContent(isExist.imageContent)
        }
        getMyInfo()
    }, [])

    useEffect(() => {
        const getMyAvatar = async () => {
            const res = await fetch(apiVersion + `/messages/${message.id}/image`)
            let imageNod = document.getElementById(message.id + "z")
            // @ts-ignore
            let imgUrl = res.url
            // @ts-ignore
            imageNod.src = imgUrl
        }
        getMyAvatar()
    }, [isContent])
    const onEmojiClick = async (curEmoji: EmojiClickData) => {
        if (curEmoji.emoji !== "") {
            await fetch(apiVersion + `/reactions`, {
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

    const deleteReaction = async (r: any) => {
        await fetch(apiVersion + `/reactions/${r}`, {
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
                                <div className="author">
                                    <p>{idNames.get(message.senderId)}</p>
                                </div>
                                <div className="text">
                                    <p>{message.content}</p>
                                </div>
                                {message.reactions.length === 0 && <div className="data">
                                    <p>{getMessageTime(message.sendingTime)}</p>
                                </div>}
                            </div>
                            {isContent &&
                            <div className="test">
                                <img id={message.id + "z"} style={{
                                    width: "100px",
                                    height: "100px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "50%",

                                }}/>
                            </div>
                            }
                            {message.reactions.length !== 0 && <div className="block-of-reaction">
                                <div className='reactionsAndTime'>
                                    {message.reactions.map((r: any) =>
                                        <button className='reactionsBlock' onClick={() => deleteReaction(r.id)}>{r.reaction}</button>
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
                                    <p>{idNames.get(message.senderId)}</p>
                                </div>
                                <div className="text">
                                    <p>{message.content}</p>
                                </div>
                                {message.reactions.length === 0 && <div className="data">
                                    <p>{getMessageTime(message.sendingTime)}</p>
                                </div>}
                            </div>
                            {isContent &&
                            <div className="test">
                                <img id={message.id + "z"} style={{
                                    width: "100px",
                                    height: "100px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "50%",

                                }}/>
                            </div>}
                            {message.reactions.length !== 0 && <div className="block-of-reaction">
                                <div className='reactionsAndTime'>
                                {message.reactions.map((r: any) =>
                                        <button className='reactionsBlock' onClick={() => deleteReaction(r.id)}>{r.reaction}</button>
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

export default observer(Message);