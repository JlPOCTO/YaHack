import '../../css/Contacts.css';
import '../../css/ContactBar.css';
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {Button, Icon} from "@gravity-ui/uikit";
import {action} from "mobx";
import React, {useState} from "react";
import {Square} from '@gravity-ui/icons';
import {SquareCheck} from '@gravity-ui/icons';

type Contacts = {
    contact: any;
}

function ContactBar(props: Contacts) {
    const {contact} = props;
    const [isTic, setTic] = useState(false)
    const dialog = contact
    const className = ["button", dialog.id === 2 ? "notactual" : ""].join("");
    const {t} = useTranslation();

    function find(name: any) {
        console.log(name)
        if (name !== 'null') {
            return <p className='myContactsNames'>{name}</p>
        }
    }

    return (
        <div className='contacts'>
            <div className="chat-bar">
                <Button onClick={action((e) => {
                    // setDialogID(dialog.id)
                    setTic(!isTic)
                    console.log({isTic})
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

export default ContactBar;
