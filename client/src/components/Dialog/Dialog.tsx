import {useEffect, useState} from 'react';
import '../../css/Dialog.css';
import HeaderOfBodyMain from "../HeaderOfBodyMain/HeaderOfBodyMain";
import AddMessage from "../AddMessage/AddMessage";
import DialogWithMessages from "../DialogWithMessages/DialogWithMessages";
import {useUserStore} from "../../stores/UserStore";
import {observer} from "mobx-react-lite";


function Dialog() {
    const { dialogID, flag, apiVersion, changedDialog, changedMessages, setDialogType } = useUserStore()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const getMessages = async () => {
            const res = await fetch(apiVersion + `/chats/${dialogID}/messages`)
            const messages = await res.json()
            setMessages(messages)
            const res1 = await fetch(apiVersion + `/chats/${dialogID}`)
            const dialogInfo = await res1.json()
            setDialogType(dialogInfo.type)
        }
        getMessages() 
    }, [dialogID, flag, changedDialog, changedMessages])

    function isDefault() {
        return dialogID === 0
    }

    return (
        <>
            {!isDefault() && <div className="dialog">
                <HeaderOfBodyMain dialogId={dialogID}/>
                <DialogWithMessages messages={messages} dialogId={dialogID}/>
                <AddMessage/>
            </div>}

            {isDefault() && <div className="just-picture">
            </div>}
        </>
    );
}

export default observer(Dialog);