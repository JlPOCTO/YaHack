import React, {useEffect, useState} from 'react';
import '../../css/ChatBar.css';
import {Button, Modal} from "@gravity-ui/uikit";
// import settings from "../../settings-svgrepo-com.svg";
import Profile from "../Profile/Profile";
import Dialog from "../Dialog/Dialog";
import {useUserStore} from "../../stores/UserStore";
import {action} from "mobx";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import ProfileOfEnotherUser from "../ProfileOfEnotherUser/ProfileOfEnotherUser";

type SearchPersonBarProps = {
    dialog: any;
}

function SearchPersonBar (props: SearchPersonBarProps) {
    const { dialog } = props;
    // const {dialog} = props;
    const { dialogID, setDialogID, apiVersion } = useUserStore()

    const [isActual, setIsActual] = useState(false);
    const handleClick = (event: any) => {
        setIsActual(current => dialog.id === dialogID);
    };
    const className = ["button", dialog.id === dialogID ? "notactual" : ""].join("");

    const [open, setOpen] = useState(false);
    const [me, setMyInfo] = useState([])
    useEffect(() => {
        const getMyInfo = async () => {
            const res = await fetch(apiVersion + '/users/me')
            const me = await res.json();
            setMyInfo(me)
        }
        getMyInfo()
    }, [])
    return (
        <div className="chat-bar">
            <Button onClick={action((e) => {
                // setDialogID(dialog.id)
                setOpen(true)
            })} className={className}
                    style={{
                        borderRadius:"10px"
                    }}>
                <div className="chat-bar-pro">
                    <div className="space-for-avatar">

                    </div>
                    <div id="chat-information">
                        <div id="chatName-time">
                            <div id="chatName">
                                {dialog.name}
                            </div>
                            <div id="time">

                            </div>
                        </div>
                        <div id="last-message">
                            <div id="to-left">
                                Chat information
                            </div>
                        </div>
                    </div>
                </div>
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ProfileOfEnotherUser dialog={dialog} />
            </Modal>
        </div>


    );
}

export default observer(SearchPersonBar);
