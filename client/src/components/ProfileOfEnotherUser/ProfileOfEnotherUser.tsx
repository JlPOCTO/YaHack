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
    const {t} = useTranslation();
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
                        <div className='itemNaming'>{t('addDialid.message')}</div>
                    </div>
                </button>

            </main>
        </div>
    );
}

export default observer(ProfileOfEnotherUser);
