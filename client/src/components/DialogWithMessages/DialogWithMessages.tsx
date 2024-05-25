
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
        if ((lastMessage.current) && (len !== messages.length)) {
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
