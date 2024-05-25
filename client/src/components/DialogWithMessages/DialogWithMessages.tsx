
import React, { useEffect, useRef, useState } from 'react';


import '../../css/DialogWithMessages.css';
import Message from "../Message/Message";

type DialogWithMessages = {
    messages: any;
}



function DialogWithMessages(props: DialogWithMessages) {
    const { messages } = props;
    const lastMessage = useRef<null | HTMLDivElement>(null)
    const [len, setLen] = useState(0)

    useEffect(() => {
        setLen(messages.length);
    }, [messages]);


    useEffect(() => {
        setTimeout(() => {
            console.log("text", lastMessage.current, lastMessage.current?.scrollHeight)
            if ((lastMessage.current)) {
                setLen(messages.length)
                lastMessage.current.scrollTop = 99999999
            }
        }, 0)
        
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
