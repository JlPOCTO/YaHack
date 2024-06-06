import '../../css/Contacts.css';
import '../../css/ContactBar.css';
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {Button, Icon} from "@gravity-ui/uikit";
import {action} from "mobx";
import React, {useState} from "react";
import {Square} from '@gravity-ui/icons';
import {SquareCheck} from '@gravity-ui/icons';
import {useUserStore} from "../../stores/UserStore";
import {observer} from "mobx-react-lite";

type Contacts = {
    contact: any;
}

function ContactBar(props: Contacts) {
    const {contact} = props;
    // let usersTic: Number[] = []
    let {language, setSearchInput, searchInput, apiVersion, setChatUsers, chatUsers} = useUserStore();
    const [isTic, setTic] = useState(false)
    const dialog = contact
    const className = ["button", dialog.id === 0 ? "notactual" : ""].join("");
    const {t} = useTranslation();

    function find(name: any) {
        // console.log(name)
        if (name !== 'null') {
            return <p className='myContactsNames'>{name}</p>
        }
    }

    function addUser() {
        let set = new Set;
        for (let n of chatUsers) {
            set.add(n)
            // console.log("n",n)
        }
        if (!isTic) {
            console.log(" я зашел сюда")
            set.add(dialog.id)
            setChatUsers(set)
        } else {
            set.delete(dialog.id)
            setChatUsers(set)
        }
        // setChatUsers(usersTic)

        // for (let n of chatUsers) {
        //     set.add(n)
        // }
        // console.log("localusers ",.length )
    }

    return (
        <div className='contacts'>
            <div className="chat-bar">
                <Button onClick={action((e) => {
                    // setDialogID(dialog.id)
                    console.log("first tic", isTic)
                    setTic(!isTic)
                    console.log("first tic2", isTic)
                    addUser()
                    console.log("charUsers ", chatUsers.size)
                    // console.log({isTic})
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
