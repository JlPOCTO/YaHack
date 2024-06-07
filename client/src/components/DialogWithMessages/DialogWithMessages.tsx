import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useUserStore } from "../../stores/UserStore";
import '../../css/DialogWithMessages.css';
import Message from "../Message/Message";

type DialogWithMessages = {
    messages: any;
    dialogId: any;
}

function DialogWithMessages(props: DialogWithMessages) {
    const { messages, dialogId } = props;
    const lastMessage = useRef<null | HTMLDivElement>(null)
    const [len, setLen] = useState(0)
    const [dialogType, setType] = useState('')
    const { apiVersion } = useUserStore()
    const { changedDialog } = useUserStore()

    useEffect(() => {
        setLen(messages.length);
    }, [messages]);

    useEffect(() => {
        const getDialogType = async () => {
            const res = await fetch(apiVersion + `/chats/${dialogId}`)
            const dialog = await res.json()
            if (dialog.type === "direct") {
                setType("direct")
            } else {
                setType("group")
            }
        }
        getDialogType() 
    }, [dialogId, changedDialog])

    useLayoutEffect(() => {
        if ((lastMessage.current)) {
            setLen(messages.length)
            lastMessage.current.scrollTop = lastMessage.current.scrollHeight
        }
    }, [messages]);

    return (
        <div className='dialog-container'>
            <div className='dialog-with-messages' ref={lastMessage}>
                {messages.map((message: any) =>
                    <Message message={message} />
                )}
            </div>
        </div>
    );
}

export default DialogWithMessages;
