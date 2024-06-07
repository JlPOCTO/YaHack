import {useEffect, useState} from 'react';
import '../../css/ChatBar.css';
import {Button, Modal} from "@gravity-ui/uikit";

import {useUserStore} from "../../stores/UserStore";
import {action} from "mobx";
import {observer} from "mobx-react-lite";
import ProfileOfEnotherUser from "../ProfileOfEnotherUser/ProfileOfEnotherUser";

type SearchPersonBarProps = {
    dialog: any;
}

function SearchPersonBar (props: SearchPersonBarProps) {
    let { dialog } = props;
    const { dialogID, apiVersion, searchInput } = useUserStore()
    const className = ["button", dialog.id === dialogID ? "notactual" : ""].join("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getMyAvatar = async () => {
            const res1 = await fetch(apiVersion + `/users/${searchInput}`)
            const user1 = await res1.json()
            dialog = user1
        }
        getMyAvatar()
    }, [])
    useEffect(() => {
        const getMyAvatar = async () => {
            const res = await fetch(apiVersion + `/users/${dialog.id}/avatar`)
            let imageNod = document.getElementById(dialog.id + "www")
            // @ts-ignore
            let imgUrl = res.url
            // @ts-ignore
            imageNod.src = imgUrl

        }
        getMyAvatar()
    }, [dialog])
    return (
        <div className="chat-bar">
            <Button onClick={action((e) => {
                setOpen(true)
            })} className={className}
                    style={{
                        borderRadius:"10px"
                    }}>
                <div className="chat-bar-pro">
                    <img id = {dialog.id + "www"} style = {{width: "60px",
                        height: "60px",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "50%",
                        borderRadius: "50%"}} />
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
