import React, {useEffect, useState} from 'react';
import '../../css/ChatBar.css';
import {Button, Modal} from "@gravity-ui/uikit";
import settings from "../../settings-svgrepo-com.svg";
import Profile from "../Profile/Profile";
import HeaderOfBodyMain from "../HeaderOfBodyMain/HeaderOfBodyMain";
import AddMessage from "../AddMessage/AddMessage";
import DialogWithMessages from "../DialogWithMessages/DialogWithMessages";
import ChatBar from "../ChatBar/ChatBar";
import message from "../Message/Message";

type DialogProps = {
    dialogId: any;
}

function Dialog(props: DialogProps) {
    const {dialogId} = props;
    const [messages, setMessages] = useState([])
    useEffect(() => {

        const getMessages = async () => {
            const res = await fetch(`/dialogs/:id/messages`)
            const messages = await res.json()
            setMessages(messages)

        }

        getMessages()
    }, [])

    return (
        <div className="dialog">

            <HeaderOfBodyMain/>
            <DialogWithMessages messages={messages}/>
            {/*<AddMessage/>*/}
        </div>

    );
}

export default Dialog;
