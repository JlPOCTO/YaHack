import {useEffect, useState} from 'react';
import '../../css/ChatBar.css';
import {Button} from "@gravity-ui/uikit";
import {useUserStore} from "../../stores/UserStore";
import {action} from "mobx";
import {observer} from "mobx-react-lite";

type ChatBarProps = {
    dialog: any;
}

function ChatBar(props: ChatBarProps) {
    const {dialog} = props;
    const {dialogID, setDialogID, currentUserID, setChatName, apiVersion, changedDialogs} = useUserStore()
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
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            return `${hours}:${minutes}`;
        }
    }

    useEffect(() => {
        const getMyAvatar = async () => {
            if (dialog.type === "group") {
                const res = await fetch(apiVersion + `/chats/${dialog.id}/avatar`)
                let imageNod = document.getElementById(dialog.id + "jjj")
                // @ts-ignore
                let imgUrl = res.url
                // @ts-ignore
                imageNod.src = imgUrl
            } else {
                let partner ={}
                dialog.users.forEach((u: any) => {
                    if (u.id !== currentUserID) {
                        partner = u
                    }
                })
                // @ts-ignore
                const res = await fetch(apiVersion + `/users/${partner.id}/avatar`)
                let imageNod = document.getElementById(dialog.id + "jjj")
                // @ts-ignore
                let imgUrl = res.url
                // @ts-ignore
                imageNod.src = imgUrl
            }
        }
        getMyAvatar()
    }, [changedDialogs])

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
                        <img id={dialog.id + "jjj"} style={{
                            width: "60px",
                            height: "60px",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "50%",
                            borderRadius: "50%"
                        }}/>
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
