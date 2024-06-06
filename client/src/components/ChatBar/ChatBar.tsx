import React, { useState } from 'react';
import '../../css/ChatBar.css';
import { Button, Modal } from "@gravity-ui/uikit";
// import settings from "../../settings-svgrepo-com.svg";
import Profile from "../Profile/Profile";
import Dialog from "../Dialog/Dialog";
import { useUserStore } from "../../stores/UserStore";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

type ChatBarProps = {
    dialog: any;
}

function ChatBar(props: ChatBarProps) {
    const { dialog } = props;
    const { dialogID, setDialogID, currentUserID, setChatName } = useUserStore()

    // const [isShown, setIsShown] = useState(false);
    const [isActual, setIsActual] = useState(false);
    const handleClick = (event: any) => {
        setIsActual(current => dialog.id === dialogID);
    };
    const className = ["button", dialog.id === dialogID ? "notactual" : ""].join("");

    function getchatName() {
        if (dialog.type === "direct") {
            let partner = currentUserID
            dialog.users.forEach((u: any) => {
                if (u.id !== currentUserID) {
                    if (!u.name) {
                        partner = u.login
                    } else {
                        partner = u.name
                    }
                }
            })
            setChatName(partner)
            return partner
        } else {
            setChatName(dialog.name)
            return dialog.name
        }
    }
    function getLastMessage() {
        if (dialog.lastMessage) {
            return dialog.lastMessage.content
        }
    }
    function getLastMessageTime() {
        if (dialog.lastMessage) {
            const time = dialog.lastMessage.sendingTime
            const date = new Date(time);
            // return date.toLocaleTimeString('ru-RU', {
            //     hour: '2-digit',
            //     minute: '2-digit',
            // });
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            return `${hours}:${minutes}`;
        }
    }

    return (
        <div className="chat-bar">
            <Button onClick={action((e) => {
                setDialogID(dialog.id)
                setChatName(getchatName())
            })} className={className}
                style={{
                    borderRadius: "10px"
                }}>
                <div className="chat-bar-pro">
                    <div className="space-for-avatar">

                    </div>
                    <div id="chat-information">
                        <div id="chatName-time">
                            <div id="chatName">
                                {getchatName()}
                            </div>
                            <div id="time">
                                {getLastMessageTime()}
                            </div>
                        </div>
                        <div id="last-message">
                            <div id="to-left">
                                {getLastMessage()}
                            </div>
                        </div>
                    </div>
                </div>
            </Button>

        </div>


    );
}

export default observer(ChatBar);
