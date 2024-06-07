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
import Link from '../Link/Link';
import {Link} from '@gravity-ui/icons';
type DialogId = {
    chatId: any;
}


function ModalGroupSettings(props: DialogId) {
    let {setSearchInput, setDialogID, apiVersion, userID, currentUserID, dialogID, deleteContact} = useUserStore();
    let {changedDialog} = useUserStore()
    const {chatId} = props;
    const {t, i18n} = useTranslation();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [isDirect, setIsDirect] = useState(false);
    const [contacts, setMyContacts] = useState([])
    const [link, setLink] = useState("")
    const [me, setMyInfo] = useState([])
    useEffect(() => {

        const getMyInfo = async () => {
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
        if (isDirect) {
            const dialogInfo = await fetch(apiVersion + `/chats/${dialogID}`)
            const parsed = await dialogInfo.json()
            for (let user of parsed.users) {
                if (user.id != currentUserID) {
                    deleteContact(user.id);
                    break;
                }
            }
            setDialogID(0)
            const res = await fetch(apiVersion + `/chats/${dialogID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
        } else {
            setDialogID(0)
            // @ts-ignore
            const res = await fetch(apiVersion + `/chats/${dialogID}/user?userId=${me.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await res.json();
        }
        setDialogID(0)
    }

    useEffect(() => {
        const getDialog = async () => {
            const res = await fetch(apiVersion + `/chats/${dialogID}`)
            const dialog = await res.json()
            if (dialog.type === "direct") {
                setIsDirect(true)
            }
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
    }, [dialogID, changedDialog])


    useEffect(() => {
        const getDialog = async () => {
            const res = await fetch(apiVersion + `/chats/${dialogID}`)
            const link = await res.json()
            setLink(link)

        }
        getDialog()
        setOpen1(false)
    }, [dialogID, changedDialog])


    return (
        <div className='chat-buttons'>
            <button className="see" onClick={() => setOpen(true)}>
                <Icon className="chat-picture" data={Persons}/>
                <p> {t("seeSubscribers")}</p>
            </button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Subscribers contacts={contacts}/>
            </Modal>
            {!isDirect && <button className="see1" onClick={() => setOpen1(true)}>
                <Icon className="chat-picture" data={Link}/>
                <p>{t("Invitelink")} </p>
            </button>}
            <Modal open={open1} onClose={() => setOpen1(false)}>
                <Link link={link}/>
            </Modal>
            <button className="delete" onClick={HandleDeleteChat}>
                <Icon className="chat-picture" data={TrashBin}/>
                <p> {t("Leavechat")}</p>
            </button>
        </div>
    );
}


export default observer(ModalGroupSettings);
