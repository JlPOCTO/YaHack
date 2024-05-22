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
    const {dialogID, setDialogID, userID} = useUserStore()

    // const [isShown, setIsShown] = useState(false);
    const [isActual, setIsActual] = useState(false);
    const handleClick = (event: any) => {
        setIsActual(current => dialog.id === dialogID);
    };
    const className = ["button", dialog.id === dialogID ? "notactual" : ""].join("");

    function getchatName() {
        if (dialog.type === "direct") {
            let partner = 0
            // dialog.users.forEach((u) => {if (u !== userID) partner = u})
            return "Dialog" + dialog.id
        } else {
            return dialog.name
        }
    }

    return (
        <div className="chat-bar">
            <Button onClick={action((e) => {
                setDialogID(dialog.id)
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
                                Time: {dialog.id}
                            </div>
                        </div>
                        <div id="last-message">
                            <div id="to-left">
                                LastMessage: {dialog.id}
                            </div>
                        </div>
                    </div>
                </div>
            </Button>

        </div>


    );
}

export default observer(ChatBar);
