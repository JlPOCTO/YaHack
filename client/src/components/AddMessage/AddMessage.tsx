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
    let {dialogID, setFlag, flag, apiVersion} = useUserStore()
    // const ref = useRef<HTMLTextAreaElement>(null)
    const {t} = useTranslation();
    const [messages, setMessage] = useState([])
    const [isOpen, setOpen] = useState(false)
    const [picture, setPicture] = useState({})
    const [currentMessage, setCurrentMessage] = useState(getInitialCurrentMessage())
    const onEmojiClick = (curEmoji: EmojiClickData) => {
        const currentMessage = sessionStorage.getItem('currentMessage')
        const newMessage = currentMessage ? currentMessage + curEmoji.emoji : curEmoji.emoji
        setCurrentMessage(newMessage)
        sessionStorage.setItem('currentMessage', newMessage)
    }
    const handleAddMessage = async () => {

        const g = !flag
        setFlag(g)

        let formData = new FormData();
        formData.append(
            "content", currentMessage
        );
        formData.append(
            "chatId", dialogID
        );
        // @ts-ignore

        formData.append(
            // @ts-ignore
            "imageContent", picture
        );
        if (currentMessage !== "") {
            const res = await fetch(apiVersion + `/messages`, {
                method: 'POST',
                body: formData

            });
            const messages = await res.json();
            setMessage(messages)

            setCurrentMessage('')

            sessionStorage.setItem('currentMessage', '')
        }
    }

    const handleSetCurrentMessage = (e: any) => {
        setCurrentMessage(e.target.value)
        sessionStorage.setItem('currentMessage', e.target.value)
    }


    function isPhotoBoxOpen() {
        setOpen(!isOpen)
    }

    const handleKeyDown = (e: any) => {
        const link = document.getElementById('super-button');
        if (e.keyCode == 13) {
            if (e.shiftKey == false) {
                e.preventDefault();
                // @ts-ignore
                link.click()
            }
        }

    };

    function getBinaryData(file: any, callback: any) {
        const reader = new FileReader();

        reader.onload = function (evt) {
            // @ts-ignore
            const binaryData = evt.target.result;
            callback(binaryData);
        };
        reader.readAsArrayBuffer(file);
    }

    const handleOnChange = (event: any) => {
        event.preventDefault();
        const file = event.target.files[0];
        setPicture(file)
    }

    return (
        <div className="box">
            {isOpen &&
                <div className="photo-box">
                    <form>
                        <input
                            type="file"
                            onChange={handleOnChange}
                        />
                    </form>
                </div>}
            <div className='messageContainer'>
                <button type="submit" className='firstCurrentSettings' onClick={isPhotoBoxOpen}>
                    {!isOpen && <Icon className='Settings' data={File}/>}
                    {isOpen && <Icon className='Settings' data={ChevronDown}/>}
                </button>
                <form>
                <textarea
                    value={currentMessage}
                    maxLength={1000}
                    onChange={handleSetCurrentMessage}
                    onKeyDown={handleKeyDown}
                    placeholder={t('description.part2')}
                    className="message"
                />
                </form>
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
                    <button onClick={handleAddMessage} className='currentSettings' id="super-button">
                        <Icon className='Settings' data={ArrowShapeRight}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddMessage;