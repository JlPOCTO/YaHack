import { useRef, useEffect } from 'react';
import '../../css/DialogWithMessages.css';
import Message from "../Message/Message";
type DialogWithMessages = {
    messages: any;
}

function DialogWithMessages(props: DialogWithMessages) {
    const { messages } = props;
    const lastMessage = useRef<null | HTMLDivElement>(null)
    useEffect(() => {
        lastMessage.current?.scrollIntoView()
    }, [messages])
    return (
        <div style={{
            overflowY: "auto",
            maxHeight: "82%",
            height: "82%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "dimgrey",
            justifyContent: "flex-end"
        }}>
            <div className="dialog-with-messages">
                {messages.map((message: any) =>
                    <Message message={message} />
                )}
                <div ref={lastMessage} />
            </div>
        </div>
    );
}

export default DialogWithMessages;
