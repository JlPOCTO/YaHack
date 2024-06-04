import '../../css/ProfileOfEnotherUser.css';
import {Modal} from '@gravity-ui/uikit';
import {useState, useEffect} from 'react'
import Contacts from "../Contacts/Contacts";
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {useUserStore} from "../../stores/UserStore";

type Profile = {
    me: any;
}

function Profile(props: Profile) {
    const { setSearchInput,setDialogID} = useUserStore();
    const {me} = props;
    const {t, i18n} = useTranslation();
    const [open, setOpen] = useState(false);
    const [contacts, setMyContacts] = useState([])

    function HandleChatAdd(){
        setSearchInput("")
        sessionStorage.setItem('currentInput', '')
        setDialogID(2)
    }
    return (
        <div className='profile'>
            <header>
                <div className='userProfile'>
                    <div className='userPhoto'></div>
                    <div className='profileName'>{me.name}</div>
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

export default Profile;
