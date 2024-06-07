import '../../css/ModalGroupSettings.css';
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {Icon, Modal} from "@gravity-ui/uikit";
import {TrashBin} from '@gravity-ui/icons';
import {Persons} from '@gravity-ui/icons';
import {useUserStore} from "../../stores/UserStore";
import {useEffect, useState} from "react";
import Contacts from "../Contacts/Contacts";
import Subscribers from "../Subscribers/Subscribers";
import {observer} from "mobx-react-lite";

type DialogId = {
    chatId: any;
}


function ModalGroupSettings(props: DialogId) {
    let {setSearchInput, setDialogID, apiVersion, userID, currentUserID, dialogID} = useUserStore();
    const {chatId} = props;
    const {t, i18n} = useTranslation();
    const [open, setOpen] = useState(false);
    const [contacts, setMyContacts] = useState([])
    const [me, setMyInfo] = useState([])
    useEffect(() => {

        const getMyInfo = async () => {
            console.log(apiVersion + '/users/me');
            const res = await fetch(apiVersion + '/users/me')
            const me = await res.json();
            if (!me.name) {
                me.name = me.login;
            }
            setMyInfo(me)
        }
        getMyInfo()
    }, [])

    const HandleDeleteChat = async () => {
        const res = await fetch(apiVersion + `/chats/${chatId}/user`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // @ts-ignore
                userId: me.id,

            })
        });
        await res.json();
    }

    useEffect(() => {
        const getDialog = async () => {
            const res = await fetch(apiVersion + `/chats/${dialogID}`)
            const dialog = await res.json()
            let arr = []
                for (let i = 0; i < dialog.users.length; i++) {
                    const n = dialog.users[i]
                    arr.push(n)
                }
                //@ts-ignore
                setMyContacts(arr)
        }
        getDialog()
        setOpen(false)
    }, [dialogID])

    return (
        <div className='chat-buttons'>
            <button className="see" onClick={() => setOpen(true)}>
                <Icon className="chat-picture" data={Persons}/>
                <p> See subscribers</p>
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Subscribers contacts={contacts}/>
            </Modal>
            <button className="delete" onClick={HandleDeleteChat}>
                <Icon className="chat-picture" data={TrashBin}/>
                <p> Leave chat</p>
            </button>
        </div>
    );
}


export default observer(ModalGroupSettings);
