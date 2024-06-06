import {useEffect, useState} from 'react';
import '../../css/Dialog.css';
import HeaderOfBodyMain from "../HeaderOfBodyMain/HeaderOfBodyMain";
import AddMessage from "../AddMessage/AddMessage";
import DialogWithMessages from "../DialogWithMessages/DialogWithMessages";
import {useUserStore} from "../../stores/UserStore";
import {observer} from "mobx-react-lite";


function Dialog() {
    const { dialogID, flag, apiVersion } = useUserStore()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        console.log("dialog")
        const getMessages = async () => {
            const res = await fetch(apiVersion + `/chats/${dialogID}/messages`)
            const messages = await res.json()
            console.log(messages);
            setMessages(messages)
        }
        getMessages() 
    }, [dialogID, flag])

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

            {isDefault() && <div className="just-picture">
            </div>}
        </>
    );
}

export default observer(Dialog);
