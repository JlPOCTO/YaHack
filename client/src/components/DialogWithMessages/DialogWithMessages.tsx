
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useUserStore, useFlagsStore } from "../../stores/UserStore";


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
    const { changedDialog } = useFlagsStore()

    useEffect(() => {
        setLen(messages.length);
    }, [messages]);

    const [nameOfTheDialog, setName] = useState([])
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
        // setTimeout(() => {
            // console.log("text", lastMessage.current, lastMessage.current?.scrollHeight)
            if ((lastMessage.current)) {
                setLen(messages.length)
                lastMessage.current.scrollTop = lastMessage.current.scrollHeight
            }
        // }, 0)
        
    }, [messages]);


    return (
        <div className='dialog-container'>
            <div className='dialog-with-messages' ref={lastMessage}>
                {messages.map((message: any) =>
                    <Message message={message} dialogType={dialogType}/>
                )}
            </div>
        </div>
    );
}

export default DialogWithMessages;
