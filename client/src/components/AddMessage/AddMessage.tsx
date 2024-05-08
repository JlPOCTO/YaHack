import '../../css/AddMessage.css';
import { FaceSmile, File, ArrowShapeRight } from '@gravity-ui/icons';
import { Icon } from '@gravity-ui/uikit';
import Popup from 'reactjs-popup';
import Picker from 'emoji-picker-react';
import { useState } from 'react';

function AddMessage() {

    const [emoji, setEmoji] = useState<any>(null)
    
    const onEmojiClick = (event: any, curEmoji : any) => {
        setEmoji(curEmoji)
    }

    return (
        <div className='messageContainer'>
            <button type="submit" className='currentSettings' style={{ bottom: 0, position: 'absolute', margin: '3px' }}>
                <Icon className='Settings' data={File} />
            </button>
            <input type="text" id="message" placeholder='Введите текст' name='textMessage' />
            <div className='buttonContainer'>
                <Popup
                    trigger={
                        <button className='currentSettings'>
                            <Icon className='Settings' data={FaceSmile} />
                        </button>}
                    position="top center"
                >
                    <div className='emojiPopup'>
                        <Picker onEmojiClick={onEmojiClick}/>
                    </div>
                </Popup>
                <button type="submit" className='currentSettings'>
                    <Icon className='Settings' data={ArrowShapeRight} />
                </button>
            </div>
        </div>
    );
}
export default AddMessage;
