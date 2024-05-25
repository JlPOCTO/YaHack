import '../../css/ProfileModalWindow.css';
import { Modal } from '@gravity-ui/uikit';
import Profile from "../Profile/Profile";
import { useEffect, useState } from 'react'
import { observer } from "mobx-react-lite";
import { Sidebar } from 'primereact/sidebar';

type ProfileModalWindow = {
  me: any;
}

function ProfileModalWindow() {
  const [visible, setVisible] = useState(false);
  const [me, setMyInfo] = useState([])
  useEffect(() => {

    const getMyInfo = async () => {
      const res = await fetch('\me')
      const me = await res.json();
      setMyInfo(me)
    }
    getMyInfo()
  }, [])

  return (
    <div>
      <button type='button' onClick={() => setVisible(true)} style={{ background: "none", border: "none" }}>
        <svg className='Settings' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17V11" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
          <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#1C274C" />
          <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </button>
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
         <Profile me={me} />
      </Sidebar>
    </div>
  );
}
export default observer (ProfileModalWindow);
