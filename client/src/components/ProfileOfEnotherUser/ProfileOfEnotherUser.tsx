import '../../css/ProfileOfEnotherUser.css';
import {Modal} from '@gravity-ui/uikit';
import {useState, useEffect} from 'react'
import Contacts from "../Contacts/Contacts";
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {useUserStore} from "../../stores/UserStore";
import {observer} from "mobx-react-lite";

type Profile = {
    user: any;
}

function ProfileOfEnotherUser(props: Profile) {
    let { setSearchInput, setDialogID, apiVersion, userID, currentUserID, setChatName, getContact, addContact, storedContacts } = useUserStore();
    const {user} = props;
    const {t, i18n} = useTranslation();
    const [open, setOpen] = useState(false);
    const [contacts, setMyContacts] = useState([])
    const [me, setMyInfo] = useState([])
    useEffect(() => {

        const getMyInfo = async () => {
            const res = await fetch(apiVersion + '/users/me')
            const me = await res.json();
            if (!me.name) {
                me.name = me.login;
            }
            setMyInfo(me)
            userID = me.id
        }
        getMyInfo()
    }, [])

    const HandleChatAdd =
        async () => {
            sessionStorage.setItem('currentMessage', '')
            setSearchInput("")
            sessionStorage.setItem('currentInput', '')
            let dialogId = getContact(user.id);
            if (dialogId) {
                setDialogID(dialogId);
            } else {
                const res = await fetch(apiVersion + `/chats`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: null,
                        chatType: "direct",
                        // @ts-ignore
                        users: [me.id, user.id]
                    })
                });
                const newDialog = await res.json();
                if (newDialog) {
                    setDialogID(newDialog.id)
                    addContact(user.id, newDialog.id);

                    let partner = currentUserID
                    user.users.forEach((u: any) => {
                        if (u.id !== currentUserID) {
                            if (!u.name) {
                                partner = u.login
                            } else {
                                partner = u.name
                            }
                        }
                    })
                    setChatName(partner)
                }
            }
        }
    useEffect(() => {
        const getMyAvatar = async () => {

            const res = await fetch(apiVersion + `/users/${user.id}/avatar`)
            console.log(res)
            let imageNod = document.getElementById(user.id + "bbb")
            // @ts-ignore
            let imgUrl = res.url
            // @ts-ignore
            imageNod.src = imgUrl

        }
        getMyAvatar()
    }, [])

    return (
        <div className='profile'>
            <header>
                <div className='userProfile'>
                    <div className='userPhoto'>
                        <img id = {user.id + "bbb"} style = {{width: "100px",
                            height: "100px",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "50%",
                            borderRadius: "50%"}} />
                    </div>
                    <div className='profileName'>{user.login}</div>
                </div>
            </header>
            <main>
                <button type='button' className='contactsButton' onClick={HandleChatAdd}>
                    <div className='item'>
                        {/*<svg className='Settings' fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4,21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3ZM12,7.5a2,2,0,1,1-2,2A2,2,0,0,1,12,7.5ZM8.211,16.215a4,4,0,0,1,7.578,0A.993.993,0,0,1,14.83,17.5H9.18A1,1,0,0,1,8.211,16.215Z" /></svg>*/}
                        <div className='itemNaming'>{t('addDialid.message')}</div>
                    </div>
                </button>

            </main>
        </div>
    );
}

export default observer(ProfileOfEnotherUser);
