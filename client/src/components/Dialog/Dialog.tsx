import React, {useEffect, useState} from 'react';
import '../../css/Dialog.css';
import {Button, Modal} from "@gravity-ui/uikit";
// import settings from "../../settings-svgrepo-com.svg";
import Profile from "../Profile/Profile";
import HeaderOfBodyMain from "../HeaderOfBodyMain/HeaderOfBodyMain";
import AddMessage from "../AddMessage/AddMessage";
import DialogWithMessages from "../DialogWithMessages/DialogWithMessages";
import ChatBar from "../ChatBar/ChatBar";
import message from "../Message/Message";
import {useUserStore} from "../../stores/UserStore";
import {observer} from "mobx-react-lite";


function Dialog() {
    const {dialogID} = useUserStore()
    const [messages, setMessages] = useState([])
    useEffect(() => {

        const getMessages = async () => {
            const res = await fetch(`/messages?id=${dialogID}`)
            const messages = await res.json()
            setMessages(messages)

        }
        getMessages()
    }, [{dialogID}])

    function isDefault() {
        return dialogID === 0
    }

    return (
        <>
            {!isDefault() && <div className="dialog">
                <HeaderOfBodyMain dialogId={dialogID}/>
                <DialogWithMessages messages={messages}/>
                <AddMessage/>
            </div>}

        </>
    );
}

export default observer(Dialog);
