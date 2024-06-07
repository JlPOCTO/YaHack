import '../../css/Contacts.css';
import '../../css/ContactBar.css';
import '../../i18n/config';
import {Button, Icon} from "@gravity-ui/uikit";
import {action} from "mobx";
import {useEffect, useState} from "react";
import {Square} from '@gravity-ui/icons';
import {SquareCheck} from '@gravity-ui/icons';
import {useUserStore} from "../../stores/UserStore";
import {observer} from "mobx-react-lite";

type Contacts = {
    contact: any;
}

function ContactBar(props: Contacts) {
    const {contact} = props;
    let { apiVersion, setChatUsers, chatUsers, currentUserID } = useUserStore();
    const [isTic, setTic] = useState(false)
    const className = ["button", contact.id === 0 ? "notactual" : ""].join("");

    useEffect(() => {
        const getMyAvatar = async () => {
            if (contact.type === "group") {
                console.log("chatId", contact.id)
                const res = await fetch(apiVersion + `/chats/${contact.id}/avatar`)
                console.log(res)
                let imageNod = document.getElementById(contact.id + "kkk")
                // @ts-ignore
                let imgUrl = res.url
                // @ts-ignore
                imageNod.src = imgUrl
            } else {
                console.log("dialogId", contact.id)
                let partner ={}
                contact.users.forEach((u: any) => {
                    if (u.id !== currentUserID) {
                        partner = u
                    }
                })
                // @ts-ignore
                const res = await fetch(apiVersion + `/users/${partner.id}/avatar`)
                console.log(res)
                let imageNod = document.getElementById(contact.id + "kkk")
                // @ts-ignore
                let imgUrl = res.url
                // @ts-ignore
                imageNod.src = imgUrl
            }
        }
        getMyAvatar()
    }, [])


    function addUser() {
        let set = new Set();
        for (let u of chatUsers) {
            set.add(u)
        }
        if (!isTic) {
            set.add(contact.id)
        } else {
            set.delete(contact.id)
        }
        setChatUsers(set)
    }

    return (
        <div className='contacts'>
            <div className="chat-bar">
                <Button onClick={action((e) => {
                    setTic(!isTic)
                    addUser()
                })} className={className}
                        style={{
                            borderRadius: "10px"
                        }}>
                    <div className="chat-bar-pro">
                        {!isTic && <Icon className="square" data={Square}/>}
                        {isTic && <Icon className="square" data={SquareCheck}/>}
                        <div className="space-for-avatar">

                        </div>
                        <div id="chat-information">
                            <div id="chatName-time">
                                <div id="chatName">
                                    {contact.name}
                                </div>
                                <div id="time">

                                </div>
                            </div>
                            <div id="last-message">
                                <div id="to-left">
                                    {/*LastMessage: {dialog.id}*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </Button>

            </div>
        </div>
    );
}

export default observer(ContactBar);
