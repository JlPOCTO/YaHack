import React, {useState} from 'react';
import '../../css/ChatBar.css';
import {Button, Modal} from "@gravity-ui/uikit";
// import settings from "../../settings-svgrepo-com.svg";
import Profile from "../Profile/Profile";
import Dialog from "../Dialog/Dialog";
import {useUserStore} from "../../stores/UserStore";
import {action} from "mobx";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";

type ChatBarProps = {
    dialog: any;
}

function ChatBar(props: ChatBarProps) {
    const { dialog } = props;
    const {dialogID, setDialogID} = useUserStore()

    // const [isShown, setIsShown] = useState(false);
    const [isActual, setIsActual] = useState(false);
    const handleClick = (event:any) => {
        setIsActual(current => dialog.id === dialogID);
    };
    const className = ["button", dialog.id === dialogID ? "notactual" : ""].join("");

    return (
     <div className="chat-bar">
          <Button onClick={action((e) =>{
             setDialogID(dialog.id)
         })} className={className}>
            {dialog.id}
        </Button>
         {/*{ <Button onClick={action((e) =>{*/}
         {/*    setDialogID(dialog.id)*/}
         {/*    handleClick(e)*/}
         {/*})} className='button-no-actual'>*/}
         {/*    {dialog.id}*/}
         {/*</Button>&& isActual }*/}
         {/*{isActual && <Button onClick={handleClick} className='button-no-actual'>*/}
         {/*    {dialog.id}*/}
         {/*</Button>}*/}

         {/*{isShown && <Dialog dialog={dialog}/>}*/}
    </div>


  );
}
export default observer(ChatBar);
