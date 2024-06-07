import '../../css/HeaderOfBodyMain.css';
import React, { useEffect, useState } from 'react';
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {useUserStore } from "../../stores/UserStore";
import {observer} from "mobx-react-lite";
import {Icon, Modal} from "@gravity-ui/uikit";
import {EllipsisVertical} from "@gravity-ui/icons";
import Contacts from "../Contacts/Contacts";
import ModalGroupSettings from "../ModalGroupSettings/ModalGroupSetting";

type DialogProps = {
    dialogId: any;
}


function HeaderOfBodyMain(props:  any) {
    const {dialogId} = props;
    const { apiVersion, chatName, dialogID, currentUserID } = useUserStore()
    const { changedDialog } = useUserStore()
    const { t } = useTranslation();
    const [nameOfTheDialog, setName] = useState([])
    const [open, setOpen] = useState(false)
    const [isGroup, setIsGroup] = useState(false)
    const [counterMembers, setCount] = useState(1)
    const [actualId, setId] = useState(0)
    useEffect(() => {
        const getDialog = async () => {
            const res = await fetch(apiVersion + `/chats/${dialogID}`)
            const dialog = await res.json()
            setId(dialog.id)
            if (dialog.type === "direct") {
                let partner = currentUserID
                dialog.users.forEach((u: any) => {
                    if (u.id !== currentUserID) {
                        if (!u.name) {
                            partner = u.login
                        } else {
                            partner = u.name
                        }
                    }
                })
                setIsGroup(false)
                setName(partner)
            } else {
                setIsGroup(true)
                setName(dialog.name)
                setCount(dialog.users.length)
            }
        }
        getDialog()
        setOpen(false)
    }, [dialogID])
    useEffect(() => {
        const getMyAvatar = async () => {
            const res = await fetch(apiVersion + `/chats/${dialogID}`)
            const dialog = await res.json()
            setId(dialog.id)
            if (dialog.type === "group") {
                console.log("chatId", dialog.id)
                const res = await fetch(apiVersion + `/chats/${dialogID}/avatar`)
                console.log(res)
                let imageNod = document.getElementById(dialogID + "ooo")
                // @ts-ignore
                let imgUrl = res.url
                // @ts-ignore
                imageNod.src = imgUrl
            } else {
                console.log("dialogId", dialog.id)
                let partner ={}
                dialog.users.forEach((u: any) => {
                    if (u.id !== currentUserID) {
                        partner = u
                    }
                })
                // @ts-ignore
                const res = await fetch(apiVersion + `/users/${partner.id}/avatar`)
                console.log(res)
                let imageNod = document.getElementById(dialogID+ "ooo")
                // @ts-ignore
                let imgUrl = res.url
                // @ts-ignore
                imageNod.src = imgUrl
            }
        }
        getMyAvatar()
    }, [dialogID])
      return (

        <div className="header-of-body-main-pro">
            <div className="someSpace">
                <img id={dialogID+ "ooo"} style={{
                    width: "40px",
                    height: "40px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50%",
                    borderRadius: "50%"
                }}/>
            </div>
            <div className="header-of-body-main">
                <div className="info-chat">
                    <div className="dialog-name">
                        {nameOfTheDialog}
                    </div>
                    <div className="status">
                        {!isGroup && <div>{t('status')}</div>}
                        {isGroup && <div> {counterMembers} {t("members")}  </div>}
                    </div>
                </div>
            </div>
            <div className="chat-settings">
                <button className="chat-button" onClick={() => setOpen(!open)}>
                    <Icon className="dots" data={EllipsisVertical}/>
                </button>
                {open &&  <ModalGroupSettings chatId={dialogID} />}
            </div>
        </div>

    );
}

export default observer(HeaderOfBodyMain);
