import '../../css/AddMessage.css';
import { FaceSmile, File, ArrowShapeRight } from '@gravity-ui/icons';
import {Button, Icon, TextInput} from '@gravity-ui/uikit';
import Popup from 'reactjs-popup';
import Picker from 'emoji-picker-react';
import React, { useState } from 'react';
import {useUserStore} from "../../stores/UserStore";

const getInitialCurrentMessage = () => {
    return sessionStorage.getItem('currentMessage') || '';
}
function AddMessage() {
    const {dialogID, userID} = useUserStore()
    const [emoji, setEmoji] = useState<any>(null)
    const [messages, setMessage] = useState([])
    const [currrentMessage, setCurrentMessage] = useState(getInitialCurrentMessage())
    const onEmojiClick = (event: any, curEmoji : any) => {
        setEmoji(curEmoji)
    }
    const handleAddMessage = async () => {
        console.log(currrentMessage)
        const res = await fetch(`/addMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: currrentMessage,
                chatID : dialogID,
                senderID : userID,
                time : 3,
                imagePath: " "
            })
        });
        const messages = await res.json();
        setMessage(messages)
        setCurrentMessage('')
        sessionStorage.setItem('currentMessage', '')
    }
    const handleSetCurrentMessage = (e:any) => {
        setCurrentMessage(e.target.value)
        sessionStorage.setItem('currentMessage', e.target.value)
    }


    return (
        <div className='messageContainer'>
            <button type="submit" className='currentSettings' style={{ bottom: 0, position: 'absolute', margin: '3px' }}>
                <Icon className='Settings' data={File} />
            </button>
            <TextInput
                size='m'
                pin="brick-round"
                value={currrentMessage}
                onChange={handleSetCurrentMessage}
                placeholder='Введите текст' name='textMessage'
                id="message"
            />
            {/*<input  value={currrentMessage}*/}
            {/*        onChange={handleSetCurrentMessage("")}*/}
            {/*        type="text" id="message" placeholder='Введите текст' name='textMessage' />*/}
            <div className='buttonContainer'>
                <Popup
                    trigger={
                        <button className='currentSettings'>
                            <Icon className='Settings' data={FaceSmile} />
                        </button>}
                    position="top left"
                >
                    <div className='emojiPopup'>
                        <Picker onEmojiClick={onEmojiClick}/>
                    </div>
                </Popup>
                <Button onClick={handleAddMessage}>
                    <Icon data={ArrowShapeRight} />
                </Button>
            </div>
        </div>
    );
}
export default AddMessage;
