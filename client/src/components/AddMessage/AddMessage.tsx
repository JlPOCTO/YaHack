import '../../css/AddMessage.css';
import {FaceSmile, File, ArrowShapeRight} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import Popup from 'reactjs-popup';
import Picker, {EmojiClickData} from 'emoji-picker-react';
import {useState, useRef, useEffect} from 'react';
import {useUserStore} from "../../stores/UserStore";
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@gravity-ui/icons';

const getInitialCurrentMessage = () => {
    return sessionStorage.getItem('currentMessage') || '';
}

function AddMessage() {
    let { dialogID, userID, setFlag, flag, apiVersion } = useUserStore()
    const ref = useRef<HTMLTextAreaElement>(null)
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

        const g = !flag
        setFlag(g)

        const date = Date.now() + 10800000;
        const showTime = date
        if (currrentMessage !== "") {
            const res = await fetch(apiVersion + `/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: currrentMessage,
                    chatId: dialogID,
                    imageContent: ""
                })
            });
            const messages = await res.json();
            setMessage(messages)
            console.log("jjj"+typeof messages)
            
            setCurrentMessage('')
            
            sessionStorage.setItem('currentMessage', '')
        }
    }

    const handleSetCurrentMessage = (e: any) => {
        setCurrentMessage(e.target.value)
        sessionStorage.setItem('currentMessage', e.target.value)
    }

    useEffect(() => {
        const changeHeight = () => {
            if (ref.current) {
                ref.current.style.height = 'auto';
                ref.current.style.height = ref.current.scrollHeight + 'px';
            }
        };
        changeHeight();
    }, [currrentMessage]);


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
                <form>
                <textarea
                    value={currrentMessage}
                    ref={ref}
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