import React, {useState} from 'react';
import '../../css/ChatBar.css';
import {Button, Modal} from "@gravity-ui/uikit";
// import settings from "../../settings-svgrepo-com.svg";
import Profile from "../Profile/Profile";
import Dialog from "../Dialog/Dialog";
import {useUserStore} from "../../stores/UserStore";
import {action} from "mobx";
import {observer} from "mobx-react-lite";

type ChatBarProps = {
    dialog: any;
}

function ChatBar(props: ChatBarProps) {
    const { dialog } = props;
    const {dialogID, setDialogID} = useUserStore()

    // const [isShown, setIsShown] = useState(false);
    const [isActual, setIsActual] = useState(false);
    const handleClick = (event:any) => {
        setDialogID(dialog.id)
        // setIsActual(current => dialog.id === idOfShownDialog);
        // setIdDialogWitchIsShown(dialog.id)
    };


    return (
     <div className="chat-bar">
         <Button onClick={action((e) =>{
             setDialogID(dialog.id)
         })} className='button'>
            {dialog.id}
        </Button>
         {/*{isActual && <Button onClick={handleClick} className='button-no-actual'>*/}
         {/*    {dialog.id}*/}
         {/*</Button>}*/}

         {/*{isShown && <Dialog dialog={dialog}/>}*/}
    </div>


  );
}
export default observer(ChatBar);
