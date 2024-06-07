import React, {useEffect, useState} from 'react';
import '../../css/SideBarBody.css';
// import '../../css/ChatBar.css';
import ChatBar from "../ChatBar/ChatBar";
import { Button, Icon } from "@gravity-ui/uikit";
import { useUserStore } from "../../stores/UserStore";
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

    const [contacts, setMyContacts] = useState([])
    const [visible, setVisible] = useState(false);
    const { searchInput, setSearchInput, apiVersion } = useUserStore();
    let { changedUserAvatar, changedDialogs } = useUserStore()
    const {t, i18n} = useTranslation();
    const [dialogs, setDialogs] = useState([])
    const [user, setUser] = useState({})
    const [open, setOpen] = useState(false);

    function isSearchInputEmpty() {
        return searchInput === "";

    }

    useEffect(() => {

        const getMyInfo = async () => {
            const res = await fetch('/contacts')
            const contacts = await res.json();
            setMyContacts(contacts)
        }
        getMyInfo()
    }, [changedUserAvatar])


    useEffect(() => {

        const getDialogs = async () => {
            const res = await fetch(apiVersion + `/chats`)
            const dialogs1 = await res.json()
            setDialogs(dialogs1)
      }
      console.log("From sidebar: " + changedDialogs);
        getDialogs()
    }, [changedDialogs])

    useEffect(() => {
        const getUser = async () => {
            // console.log( "User@@@" , searchInput)
            const res = await fetch(apiVersion + `/users/${searchInput}`)
            const user1 = await res.json()
            // console.log( "User" ,user1)
            setUser(user1)
        }

        getUser()
    }, [searchInput, changedUserAvatar])
    return (
        <>
            {isSearchInputEmpty() && <div style={{
                overflowY: "auto",
                maxHeight: "90%",
                height: "90%"
            }}>
                {dialogs.map((dialog: any) =>
                    <ChatBar dialog={dialog}/>
                )}
                <AddChat/>
            </div>}
            {!isSearchInputEmpty() && <div style={{
                overflowY: "auto",
                maxHeight: "90%",
                height: "90%"
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
                <p>
                    {t('addChat.chat')}
                </p>
                <SearchPersonBar dialog={user}/>
            </div>}
        </>
    );
}

export default observer(SideBarBody);
