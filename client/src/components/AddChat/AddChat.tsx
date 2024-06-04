import '../../css/AddMessage.css';
import {FaceSmile, File, ArrowShapeRight, Pencil} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import Popup from 'reactjs-popup';
import Picker, {EmojiClickData} from 'emoji-picker-react';
import React, {useState, useRef, useEffect} from 'react';
import {useUserStore} from "../../stores/UserStore";
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@gravity-ui/icons';
// import {Sidebar} from "lucide-react";
import Contacts from "../Contacts/Contacts";
import {Sidebar} from 'primereact/sidebar';
import ContactBar from "../ContactBar/ContactBar";
import AddChatComponents from "../AddChatComponents/AddChatComponents";





function AddChat() {
    const [contacts, setMyContacts] = useState([])
    const [visible, setVisible] = useState(false);
    useEffect(() => {

        const getMyInfo = async () => {
            const res = await fetch('\contacts')
            const contacts = await res.json();
            setMyContacts(contacts)
            console.log(contacts)
        }
        getMyInfo()
    }, [])
    return (
        <div>
            <button onClick={() => setVisible(true)} className="add-chat">
                <Icon className="pencil" data={Pencil}/>
            </button>
            <Sidebar visible={visible} onHide={() => setVisible(false)}
                     style={{background: 'none', padding: '15px 10px 15px 10px'}}>
                <AddChatComponents contacts={contacts}/>
            </Sidebar>
            {visible && <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999
            }}>
            </div>}
        </div>
    );
}

export default AddChat;