import React, {useState} from 'react';
import '../../css/ChatBar.css';
import {Button, Modal} from "@gravity-ui/uikit";
// import settings from "../../settings-svgrepo-com.svg";
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
    const [isActual, setIsActual] = useState(false);
    const handleClick = (event:any) => {
        setIdDialogWitchIsShown(dialog.id)
        setIsActual(current => dialog.id === idOfShownDialog);
    };


    return (
     <div className="chat-bar">
         {!isActual && <Button onClick={handleClick} className='button'>
            {dialog.id}
        </Button>}
         {isActual && <Button onClick={handleClick} className='button-no-actual'>
             {dialog.id}
         </Button>}

         {/*{isShown && <Dialog dialog={dialog}/>}*/}
    </div>


  );
}
export default ChatBar;
