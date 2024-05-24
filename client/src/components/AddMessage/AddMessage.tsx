import '../../css/AddMessage.css';
import {FaceSmile, File, ArrowShapeRight} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import Popup from 'reactjs-popup';
import Picker, {EmojiClickData} from 'emoji-picker-react';
import {useState} from 'react';
import {useUserStore} from "../../stores/UserStore";
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@gravity-ui/icons';
const getInitialCurrentMessage = () => {
    return sessionStorage.getItem('currentMessage') || '';
}

function AddMessage() {
    const {dialogID, userID} = useUserStore()
    const {t, i18n} = useTranslation();
    const [messages, setMessage] = useState([])
    const [isOpen, setOpen] = useState(false)
    const [currrentMessage, setCurrentMessage] = useState(getInitialCurrentMessage())
    const onEmojiClick = (curEmoji: EmojiClickData) => {
        const currentMessage = sessionStorage.getItem('currentMessage')
        const newMessage = currentMessage ? currentMessage + curEmoji.emoji : curEmoji.emoji
        setCurrentMessage(newMessage)
        sessionStorage.setItem('currentMessage', newMessage)
    }
    const handleAddMessage = async () => {
        // console.log('current: ', currrentMessage)
        const res = await fetch(`/addMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: currrentMessage,
                chatID: dialogID,
                senderID: userID,
                time: 3,
                imagePath: " "
            })
        });
        const messages = await res.json();
        setMessage(messages)
        setCurrentMessage('')
        sessionStorage.setItem('currentMessage', '')
    }
    const handleSetCurrentMessage = (e: any) => {
        setCurrentMessage(e.target.value)
        sessionStorage.setItem('currentMessage', e.target.value)
    }

    function isPhotoBoxOpen() {
        setOpen(!isOpen)
    }


    return (
        <div className="box">
            {isOpen &&
                <div className="photo-box">

                </div>}
            <div className='messageContainer'>
                <button type="submit" className='firstCurrentSettings' onClick={isPhotoBoxOpen}>
                    {!isOpen && <Icon className='Settings' data={File}/>}
                    {isOpen && <Icon className='Settings' data={ChevronDown}/>}
                </button>
                <input
                    value={currrentMessage}
                    onChange={handleSetCurrentMessage}
                    placeholder={t('description.part2')}
                    className="message"
                    // style={{border: 'none'}}
                />
                <div className='buttonContainer'>
                    <Popup
                        trigger={
                            <button className='currentSettings'>
                                <Icon className='Settings' data={FaceSmile}/>
                            </button>}
                        position="top left"
                    >
                        <div className='emojiPopup'>
                            <Picker onEmojiClick={onEmojiClick}/>
                        </div>
                    </Popup>
                    <button onClick={handleAddMessage} className='currentSettings'>
                        <Icon className='Settings' data={ArrowShapeRight}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddMessage;
