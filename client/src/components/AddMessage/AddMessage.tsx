import '../../css/AddMessage.css';
import {FaceSmile, File, ArrowShapeRight} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import Popup from 'reactjs-popup';
import Picker, {EmojiClickData} from 'emoji-picker-react';
import {useState, useRef} from 'react';
import {useUserStore} from "../../stores/UserStore";
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {ChevronDown} from '@gravity-ui/icons';
import message from "../Message/Message";
import {blob} from "stream/consumers";

const getInitialCurrentMessage = () => {
    return sessionStorage.getItem('currentMessage') || '';
}

function AddMessage() {
    let {dialogID, setFlag, flag, apiVersion} = useUserStore()
    // const ref = useRef<HTMLTextAreaElement>(null)
    const {t, i18n} = useTranslation();
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

        const date = Date.now();
        const showTime = date
        let formData = new FormData();
        formData.append(
            "content", currentMessage
        );
        formData.append(
            "chatId", dialogID
        );
        // @ts-ignore

        console.log("picture", picture)
        formData.append(
            // @ts-ignore
            "imageContent", picture
            // "imageContent", picture.blob, picture.name
        );
        if (currentMessage !== "") {
            const res = await fetch(apiVersion + `/messages`, {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: formData

            });
            // let h = res.json()
            // console.log("все хорошо")
            const messages = await res.json();
            setMessage(messages)
            console.log( "ну пожалуйста", messages.imageContent)

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

        // Это событие срабатывает, когда чтение завершено успешно
        reader.onload = function (evt) {
            // Получаем и возвращаем бинарные данные
            // @ts-ignore
            const binaryData = evt.target.result;

            // Вызываем callback с бинарными данными
            callback(binaryData);
        };

        // Чтение файла как ArrayBuffer для получения бинарных данных
        reader.readAsArrayBuffer(file);
    }

    const handleOnChange = (event: any) => {
        event.preventDefault();
        console.log("mmmm", event.target.files[0])
        const file = event.target.files[0];
        // if (file) {
        //     getBinaryData(file, function (binaryData: any) {
        //         console.log( "bbb",binaryData);
        //         let bomb = new Blob([binaryData]);
        //         console.log("bomb", bomb)
        //         bomb.type = file.type
        //         setPicture(bomb)
        //     });
        // }
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