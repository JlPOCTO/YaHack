
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
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        setLen(messages.length);
    }, [messages]);

    useEffect(() => {
        if ((lastMessage.current) && (len !== messages.length ||  messages.length < 8)) {
            console.log(messages.length)
            if (messages.length > 8 || messages.length === 0) {
                setFlag(true)
            } else {
                setFlag(false)
            }
            setLen(messages.length)
            if (messages.length >= 8) {
                lastMessage.current.scrollTop = lastMessage.current.scrollHeight
            }
        }
    }, [messages]);


    return (
        <div className='dialog-container'>
            <div className='dialog-with-messages' style={flag ? {justifyContent: 'unset'} : {justifyContent: 'flex-end'}} ref={lastMessage}>
                {messages.map((message: any) =>
                    <Message message={message} />
                )}
            </div>
        </div>
    );
}

export default DialogWithMessages;
