import React, {useEffect, useState} from 'react';
import '../../css/SideBarBody.css';
// import '../../css/ChatBar.css';
import ChatBar from "../ChatBar/ChatBar";
import {Button} from "@gravity-ui/uikit";
// import {Checkbox} from "@gravity-ui/uikit";
// import {Simulate} from "react-dom/test-utils";
// import load = Simulate.load;

const API_HOST = 'http://localhost:3000';


function SideBarBody() {
    const [dialogs, setDialogs] = useState([])
    const [open, setOpen] = useState(false);

    useEffect(() => {

        const getDialogs = async () => {
            const res = await fetch(`/dialogs`)
            const dialogs1 = await res.json()
            setDialogs(dialogs1)
        }

        getDialogs()
    }, [])

    return (
        <div style={{
            overflowY: "auto",
            maxHeight: "92%",
            height: "92%"
        }}>
            {dialogs.map((dialog: any) =>
                <ChatBar dialog={dialog}/>
            )}
        </div>

    );
}

export default SideBarBody;
