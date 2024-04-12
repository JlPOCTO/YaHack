import React, {useState} from 'react';
import '../../css/ChatBar.css';
import {Button, Modal} from "@gravity-ui/uikit";
import settings from "../../settings-svgrepo-com.svg";
import Profile from "../Profile/Profile";



function ChatBar(dialog:any) {
    console.log("ChatBAR"+ dialog.toString())
    const [open, setOpen] = useState(false);
  return (
     <div className="chat-bar">
        <Button onClick={() => {
            console.log(`Click on ${dialog.id}`)
            setOpen(true)
        }} className='button'>
            {dialog.id}
        </Button>
    </div>
    // <div className="chat-bar">
    //     {/*<Button onClick={() => setOpen(true)} className='button'>*/}
    //     {/*    {dialog.id}*/}
    //     {/*</Button>*/}
    //     {/*<Modal open={open} onClose={() => setOpen(false)}>*/}
    //     {/*    <Profile/>*/}
    //     {/*</Modal>*/}
    // </div>
  );
}
export default ChatBar;
