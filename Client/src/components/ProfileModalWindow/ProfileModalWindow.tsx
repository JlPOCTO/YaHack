import '../../css/ProfileModalWindow.css';
import React, {useState} from 'react';
import {Button, Modal} from '@gravity-ui/uikit';
import settings from '../../settings-svgrepo-com.svg';
import Profile from "../Profile/Profile";

function ProfileModalWindow() {
    const [open, setOpen] = useState(false);
  return (
      <div>
        <Button onClick={() => setOpen(true)} className='model-button'>
          <img src={settings} className="Settings" alt="settings" />
          </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
            <Profile/>
        </Modal>
    </div>
  );
}
export default ProfileModalWindow;
