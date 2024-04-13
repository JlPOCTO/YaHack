import React, {useEffect, useState} from 'react';
import '../../css/SideBarBody.css';
// import '../../css/ChatBar.css';
import ChatBar from "../ChatBar/ChatBar";
import {Button} from "@gravity-ui/uikit";
// import {Checkbox} from "@gravity-ui/uikit";
// import {Simulate} from "react-dom/test-utils";
// import load = Simulate.load;

const API_HOST = 'http://localhost:3000';

type SideBarProps = {
    idOfShownDialog : any;
    setIdDialogWitchIsShown:any
}

function SideBarBody(props:SideBarProps) {
    const { idOfShownDialog, setIdDialogWitchIsShown } = props;
    const [dialogs, setDialogs] = useState([])
    const [open, setOpen] = useState(false);
    // const   [loading, setLoading] = useState(false)

    useEffect(() => {

        const getDialogs = async () => {
            // setLoading(false)
            // console.log("Begin fetch")
            const res = await fetch(`/dialogs`)
            // console.log("End fetch")
            // setLoading(true)
            const dialogs1 = await res.json()
            setDialogs(dialogs1)
        }

        getDialogs()
    }, [])

    return (
        <div>
            {dialogs.map((dialog:any) =>
               <ChatBar dialog={dialog} idOfShownDialog={idOfShownDialog} setIdDialogWitchIsShown={setIdDialogWitchIsShown} />
            )}
        </div>

    );
}

export default SideBarBody;
