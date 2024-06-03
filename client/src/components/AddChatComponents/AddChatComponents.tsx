import '../../css/AddMessage.css';
import '../../css/AddChatComponents.css';
import {FaceSmile, File, ArrowShapeRight, Pencil, ArrowRotateRight} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import Popup from 'reactjs-popup';
import Picker, {EmojiClickData} from 'emoji-picker-react';
import React, {useState, useRef, useEffect} from 'react';
import {useUserStore} from "../../stores/UserStore";
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@gravity-ui/icons';
// import {Sidebar} from "lucide-react";

import {Sidebar} from 'primereact/sidebar';
import ContactBar from "../ContactBar/ContactBar";
import ChatBar from "../ChatBar/ChatBar";
import {action} from "mobx";
// import {ArrowShapeRight} from '@gravity-ui/icons';


type Contacts = {
    contacts: any;
}
const getInitialInput = () => {
    return localStorage.getItem('currentInput') || "";
}


function AddChatComponents(props: Contacts) {
    const {contacts} = props;
    let {language, setSearchInput, searchInput} = useUserStore();
    const {t, i18n} = useTranslation();
    const [currrentInput, setCurrentInput] = useState(getInitialInput())

    const handleSetCurrentInput = (e: any) => {
        // console.log("handleSetCurrentInput"+ e.target.value)
        setCurrentInput(e.target.value)
        sessionStorage.setItem('currentInput', e.target.value)
    }
    const handleKeyDown = (e: any) => {
        const link = document.getElementById('road-button');
        if (e.keyCode == 13) {
            if (e.shiftKey == false) {
                e.preventDefault();
                // @ts-ignore
                link.click()
            }
        }

    };

    return (
        <div className="ll">
            <header>
                <div className="label" >
                    <label>{t('label')}</label>
                </div>
                <div className="add-place">
                    <div className="searchPlace">
                        <form method='get'>
                            <input type="text" id="search-messenger" placeholder={t('chat')}
                                   name='searchMessage'
                                   value={currrentInput}
                                   onChange={handleSetCurrentInput}
                                   onKeyDown={handleKeyDown}
                            >
                            </input>
                        </form>
                        <button onClick={action((e) => {
                            const currentInput = sessionStorage.getItem('currentInput')
                            console.log("cuur: " + currentInput)
                            setSearchInput(currentInput)
                            // searchInput = currentInput
                            console.log("search: " + searchInput)
                            setCurrentInput('')

                        })} className='currentSettings' id="road-button">
                            <Icon id="21" className='Settings-rotate-right' data={ArrowShapeRight}/>
                        </button>
                    </div>
                </div>
            </header>
            <div className="chat-bar">
                {contacts.map((contact: any) =>
                    <ContactBar contact={contact}/>
                )}
            </div>
        </div>
    );
}

export default AddChatComponents;