import '../../css/Profile.css';
import { Modal } from '@gravity-ui/uikit';
import { useState, useEffect } from 'react'
import Contacts from "../Contacts/Contacts";
import '../../i18n/config';
import { useTranslation } from 'react-i18next';
import { useUserStore } from "../../stores/UserStore";

type Profile = {
  me: any;
}

function Profile(props: Profile) {

  let { apiVersion } = useUserStore();
  let { changedUserAvatar } = useUserStore()
  const { me } = props;
  const {t, i18n} = useTranslation();
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [contacts, setMyContacts] = useState([])
  function find(name : any) {
    if (name !== 'null') {
      return <div className='profileName'>{name}</div>
    } 
  }
  useEffect(() => {

    const getMyInfo = async () => {
      const res = await fetch(apiVersion + '/users/contacts')
      const contacts = await res.json();
      setMyContacts(contacts)
    }
    getMyInfo()
  }, [changedUserAvatar])
  useEffect(() => {

    const getMyAvatar = async () => {
      const res = await fetch(apiVersion + '/users/myAvatar')
      const contacts = await res.json();
      setAvatar(contacts)
    }
    getMyAvatar()
  }, [])


  return (
    <div className='profile'>
      <header>
        <div className='userProfile'>
          <div className='userPhoto'>
            {avatar}
          </div>
          <div className='userData'>
            {find(me.name)}
            <div className='profileLogin'>{me.login}</div>
          </div>
        </div>
      </header>
      <main>
          <button type='button' className='contactsButton' onClick={() => setOpen(true)}>
            <div className='item'>
              <svg className='Settings' fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4,21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3ZM12,7.5a2,2,0,1,1-2,2A2,2,0,0,1,12,7.5ZM8.211,16.215a4,4,0,0,1,7.578,0A.993.993,0,0,1,14.83,17.5H9.18A1,1,0,0,1,8.211,16.215Z" /></svg>
              <div className='itemNaming'>{t('profile.contacts')}</div>
            </div>
          </button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <Contacts contacts={contacts} />
          </Modal>
        <div className="item">
          <div className='itemImage'>
            <svg className='Settings' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7L12 14M12 14L15 11M12 14L9 11" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16 17H12H8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
              <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </div>
          <div className='itemNaming'>{t('profile.savedMessages')}</div>
        </div>
      </main>
    </div>
  );
}
export default Profile;
