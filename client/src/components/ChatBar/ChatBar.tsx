import React, {useState} from 'react';
import '../../css/ChatBar.css';
import {Button, Modal} from "@gravity-ui/uikit";
import settings from "../../settings-svgrepo-com.svg";
import Profile from "../Profile/Profile";
import Dialog from "../Dialog/Dialog";

type ChatBarProps = {
    dialog: any;
    idOfShownDialog : any;
    setIdDialogWitchIsShown:any
}

function ChatBar(props: ChatBarProps) {
    const { dialog, idOfShownDialog, setIdDialogWitchIsShown } = props;

    // const [isShown, setIsShown] = useState(false);
    // const [isActual, setIsActual] = useState(false);
    const handleClick = (event:any) => {
        setIdDialogWitchIsShown(dialog.id)
        // setIsShown(current => !current);
    };

    return (
     <div className="chat-bar">
        <Button onClick={handleClick} className='button'>
            {dialog.id}
        </Button>

         {/*{isShown && <Dialog dialog={dialog}/>}*/}
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
