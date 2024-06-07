import { useState } from 'react';
import '../../css/Message.css';
import { useUserStore } from "../../stores/UserStore";
import { Icon } from "@gravity-ui/uikit";
import Picker, { EmojiClickData } from "emoji-picker-react";
import Popup from "reactjs-popup";
import { Heart } from "@gravity-ui/icons";
import { observer } from "mobx-react-lite";


type Message = {
    message: any;
}

function Message(props: Message) {
    const { message } = props;
    let { apiVersion, currentUserID, idNames } = useUserStore()
    function isMine() {
        return message.senderId === currentUserID;
    }

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