import '../../css/AddMessage.css';
import { Pencil} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import React, {useState, useEffect} from 'react';
import {useUserStore} from "../../stores/UserStore";
import '../../i18n/config';
import {Sidebar} from 'primereact/sidebar';
import AddChatComponents from "../AddChatComponents/AddChatComponents";





function AddChat() {
    let { apiVersion } = useUserStore()
    const [contacts, setMyContacts] = useState([])
    const [visible, setVisible] = useState(false);
    useEffect(() => {

      const getMyInfo = async () => {
        const res = await fetch(apiVersion + '/users')
            const contacts = await res.json();
            setMyContacts(contacts)
            // console.log(contacts)
        }
        getMyInfo()
    }, [])
    return (
        <div>
            <button onClick={() => setVisible(true)} className="add-chat">
                <Icon className="pencil" data={Pencil}/>
            </button>
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
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