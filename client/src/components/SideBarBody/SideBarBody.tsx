import React, {useEffect, useState} from 'react';
import '../../css/SideBarBody.css';
// import '../../css/ChatBar.css';
import ChatBar from "../ChatBar/ChatBar";
import {Button, Icon} from "@gravity-ui/uikit";
import {useUserStore} from "../../stores/UserStore";
import {observer} from "mobx-react-lite";
import {action} from "mobx";
import SearchPersonBar from "../SearchPersonBar/SearchPersonBar";
// import {Checkbox} from "@gravity-ui/uikit";
// import {Simulate} from "react-dom/test-utils";
// import load = Simulate.load;
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {ArrowRotateRight, Pencil} from '@gravity-ui/icons';
import Profile from "../Profile/Profile";
import {Sidebar} from 'primereact/sidebar';
import Contacts from "../Contacts/Contacts";
import AddChat from "../AddChat/AddChat";

const API_HOST = 'http://localhost:3000';


function SideBarBody() {
    let dialog = {
        id: 2,
        time: 1
    }
    const [contacts, setMyContacts] = useState([])
    const [visible, setVisible] = useState(false);
    const {searchInput, setSearchInput} = useUserStore();
    const {t, i18n} = useTranslation();
    const [dialogs, setDialogs] = useState([])
    const [open, setOpen] = useState(false);

    function isSearchInputEmpty() {
        console.log(searchInput)
        return searchInput === "";

    }

    useEffect(() => {

        const getMyInfo = async () => {
            const res = await fetch('\contacts')
            const contacts = await res.json();
            setMyContacts(contacts)
        }
        getMyInfo()
    }, [])

    useEffect(() => {

        const getDialogs = async () => {
            const res = await fetch(`/dialogs`)
            const dialogs1 = await res.json()
            setDialogs(dialogs1)
        }

        getDialogs()
    }, [])


    return (
        <>
            {isSearchInputEmpty() && <div style={{
                overflowY: "auto",
                maxHeight: "92%",
                height: "92%"
            }}>
                {dialogs.map((dialog: any) =>
                    <ChatBar dialog={dialog}/>
                )}
                <AddChat/>
            </div>}
            {!isSearchInputEmpty() && <div style={{
                overflowY: "auto",
                maxHeight: "92%",
                height: "92%"
            }}>
                {/*{dialogs.map((dialog: any) =>*/}
                {/*    <ChatBar dialog={dialog}/>*/}
                {/*)}*/}
                <button onClick={action((e) => {
                    setSearchInput("")
                    sessionStorage.setItem('currentInput', '')
                })} className="come-back">
                    {t('addChat.back')}
                </button>
                //Здесь нужен запрос, который будет возвращать пользователей по имени searchInput
                <p>
                    {t('addChat.chat')}
                </p>
                <SearchPersonBar/>


            </div>}
        </>
    );
}

export default observer(SideBarBody);
