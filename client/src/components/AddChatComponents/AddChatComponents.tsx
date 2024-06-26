import '../../css/AddMessage.css';
import '../../css/AddChatComponents.css';
import {FaceSmile, File, ArrowShapeRight, Pencil, ArrowRotateRight} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import Popup from 'reactjs-popup';
import Picker, {EmojiClickData} from 'emoji-picker-react';
import React, {useState, useRef, useEffect} from 'react';
import {useUserStore} from "../../stores/UserStore";
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@gravity-ui/icons';
// import {Sidebar} from "lucide-react";

import {Sidebar} from 'primereact/sidebar';
import ContactBar from "../ContactBar/ContactBar";
import ChatBar from "../ChatBar/ChatBar";
import {action} from "mobx";
// import {ArrowShapeRight} from '@gravity-ui/icons';


type Contacts = {
    contacts: any;
}
const getInitialcurrentName = () => {
    return sessionStorage.getItem('currentName') || "";
}


function AddChatComponents(props: Contacts) {
    const {contacts} = props;
    let {language, setSearchInput, searchInput, apiVersion, chatUsers, visible, setVisible} = useUserStore();
    const [flag, setFlag] = useState(false)
    const {t, i18n} = useTranslation();

    const [currentName, setcurrentName] = useState(getInitialcurrentName())

    const handleSetcurrentName = (e: any) => {
        setcurrentName(e.target.value)
        sessionStorage.setItem('currentName', e.target.value)
    }

    const [meId, setMyInfo] = useState(0)
    useEffect(() => {

        const getMyInfo = async () => {
            const res = await fetch(apiVersion + '/users/me')
            const me = await res.json();
            if (!me.name) {
                me.name = me.login;
            }
            setMyInfo(me.id)
        }
        getMyInfo()
    }, [])


    const HandleChatAdd =
        async () => {
            const users = []
            const m = meId
            users.push(m)
            for (let n of chatUsers) {
                users.push(n)
            }
            if (users.length > 1) {
                setFlag(false)
                const res = await fetch(apiVersion + `/chats`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: currentName,
                        chatType: "group",
                        users: users
                    })
                });
                const newDialog = await res.json();
                setSearchInput("")
                sessionStorage.setItem('currentInput', '')
                setVisible(false)
            } else {
                setFlag(true)
            }
        }

    const handleKeyDown = (e: any) => {
        const link = document.getElementById('ro-button');
        if (e.keyCode == 13) {
            if (e.shiftKey == false) {
                e.preventDefault();
                // @ts-ignore
                link.click()
            }
        }
    };

    return (
        <div className="ll">
            <div>
                <div>
                    <label>{t('label')}</label>
                </div>
                <div className="add-place">
                    <div className="searchPlace">
                        <form method='get'>
                            <input type="text" id="search-messenger" placeholder={t('chat')}
                                   name='searchMessage'
                                   value={currentName}
                                   onChange={handleSetcurrentName}
                                   onKeyDown={handleKeyDown}
                            >
                            </input>
                        </form>
                        <button onClick={action((e) => {
                            HandleChatAdd()
                            const currentInput = sessionStorage.getItem('currentName')
                            setcurrentName('')


                        })} className='currentSettings' id="ro-button">
                            <Icon className='Settings-rotate-right' data={ArrowShapeRight}/>
                        </button>
                    </div>
                </div>
            </div>
            {flag && <div style={{color:"red"}}> {t("chatError")}</div>
            }
            <div className="chat-bar">
                {contacts.map((contact: any) =>
                    <ContactBar contact={contact}/>
                )}
            </div>
        </div>
    );
}

export default AddChatComponents;