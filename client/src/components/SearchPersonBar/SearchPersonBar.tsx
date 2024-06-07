import React, {useEffect, useState} from 'react';
import '../../css/ChatBar.css';
import {Button, Modal} from "@gravity-ui/uikit";
// import settings from "../../settings-svgrepo-com.svg";
import Profile from "../Profile/Profile";

import {useUserStore} from "../../stores/UserStore";
import {action} from "mobx";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import ProfileOfEnotherUser from "../ProfileOfEnotherUser/ProfileOfEnotherUser";

type SearchPersonBarProps = {
    dialog: any;
}

function SearchPersonBar (props: SearchPersonBarProps) {
    let { dialog } = props;
    const { dialogID, setDialogID, apiVersion, searchInput } = useUserStore()
    const className = ["button", dialog.id === dialogID ? "notactual" : ""].join("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getMyAvatar = async () => {
            const res1 = await fetch(apiVersion + `/users/${searchInput}`)
            const user1 = await res1.json()
            dialog = user1
            const res = await fetch(apiVersion + `/users/${dialog.id}/avatar`)
            let imageNod = document.getElementById(dialog.id + "www")
            // @ts-ignore
            let imgUrl = res.url
            // @ts-ignore
            imageNod.src = imgUrl

        }
        getMyAvatar()
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
                    <div className="space-for-avata">
                        <img id = {dialog.id + "www"} style = {{width: "60px",
                            height: "60px",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "50%",
                            borderRadius: "50%"}} />
                    </div>
                    <div id="chat-information">
                        <div id="chatName-time">
                            <div id="chatName">
                                {dialog.login}
                            </div>
                            <div id="time">

                            </div>
                        </div>
                        <div id="last-message">
                            <div id="to-left">
                                {/*Chat information*/}
                            </div>
                        </div>
                    </div>
                </div>
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ProfileOfEnotherUser user={dialog} />
            </Modal>
        </div>


    );
}

export default observer(SearchPersonBar);
