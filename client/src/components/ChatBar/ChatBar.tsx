import React, {useState} from 'react';
import '../../css/ChatBar.css';
import {Button, Modal} from "@gravity-ui/uikit";
// import settings from "../../settings-svgrepo-com.svg";
import Profile from "../Profile/Profile";
import Dialog from "../Dialog/Dialog";
import {useUserStore} from "../../stores/UserStore";
import {action} from "mobx";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";

type ChatBarProps = {
    dialog: any;
}

function ChatBar(props: ChatBarProps) {
    const {dialog} = props;
    const {dialogID, setDialogID} = useUserStore()

    // const [isShown, setIsShown] = useState(false);
    const [isActual, setIsActual] = useState(false);
    const handleClick = (event: any) => {
        setIsActual(current => dialog.id === dialogID);
    };
    const className = ["button", dialog.id === dialogID ? "notactual" : ""].join("");

    return (
        <div className="chat-bar">
            <Button onClick={action((e) => {
                setDialogID(dialog.id)
            })} className={className}>
                <div id="chat-information">
                    <div id="chatName-time">
                        <div id="chatName">
                            ChatName: {dialog.id}
                        </div>
                        <div id="time">
                            Time: {dialog.id}
                        </div>

                    </div>
                    <div id="last-message">
                        <div id = "to-left">
                        LastMessage: {dialog.id}
                        </div>
                    </div>
                </div>
            </Button>

        </div>


    );
}

export default observer(ChatBar);