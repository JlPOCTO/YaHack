
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

    useEffect(() => {
        setLen(messages.length);
    }, [messages]);


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
                    <Message message={message} />
                )}
            </div>
        </div>
    );
}

export default DialogWithMessages;
