
import React, {useEffect, useRef, useState} from 'react';


import '../../css/DialogWithMessages.css';
import Message from "../Message/Message";

type DialogWithMessages = {
    messages: any;
}



function DialogWithMessages(props: DialogWithMessages) {
    const { messages } = props;
    const lastMessage = useRef<null | HTMLDivElement>(null)
    const [topPage, setTopPage] = useState(false)
    const [scrollPos, setScrollPos] = useState(0)
    const [len, setLen] = useState(0)

    useEffect(() => {
        if (lastMessage.current && (isAtBottom() || (scrollPos === 0 && !topPage) || (len !== messages.length))) {
            if (len !== messages.length) {
                setLen(messages.length)
            }
            lastMessage.current.scrollTop = lastMessage.current.scrollHeight
        }
    }, [messages, scrollPos, topPage])

    useEffect(() => {
        if (lastMessage.current) {
            lastMessage.current.scrollTop = scrollPos
        }
    }, [scrollPos])

    useEffect(() => {
        setLen(messages.length);
    }, [messages]);

    const scrollFunction = () => {
        setTopPage(true)
        if (lastMessage.current) {
            setScrollPos(lastMessage.current.scrollTop)
        } else {
            setScrollPos(0)
        }
    }

    const isAtBottom = () => {
        if (lastMessage.current) {
            return lastMessage.current.clientHeight + lastMessage.current.scrollTop >= lastMessage.current.scrollHeight
        } else {
            return false
        }
    }

    return (
        <div className='dialog-container' ref={lastMessage} onScroll={scrollFunction}>
            <div className="dialog-with-messages" ref={lastMessage}>
                {messages.map((message: any) =>
                    <Message message={message} />
                )}
            </div>
        </div>
    );
}

export default DialogWithMessages;
