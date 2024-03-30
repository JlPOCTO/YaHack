import '../../css/ProfileModalWindow.css';
import React, {useState} from 'react';
import {Button, Modal} from '@gravity-ui/uikit';
import Profile from "../Profile/Profile";
function ProfileModalWindow() {
    const [open, setOpen] = useState(false);
  return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
            <Profile/>
        </Modal>
    </div>
  );
}
export default ProfileModalWindow;
