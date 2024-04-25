import '../../css/AddMessage.css';
import { FaceSmile, File, ArrowShapeRight } from '@gravity-ui/icons';
import {Icon, PaletteOption} from '@gravity-ui/uikit';
import Popup from 'reactjs-popup';
import {Palette} from '@gravity-ui/uikit';
import React from "react";
function AddMessage() {
    const options: PaletteOption[] = [
        {content: '😊', value: 'ID-cool'},
        {content: '❤️', value: 'ID-woozy'},
        {content: '👍', value: 'ID-sick'},
        {content: '😂', value: 'ID-cool'},
        {content: '😍', value: 'ID-woozy'},
        {content: '😛', value: 'ID-sick'},
        {content: '😡', value: 'ID-cool'},
        {content: '😢', value: 'ID-woozy'},
        {content: '😯', value: 'ID-sick'},
        {content: '😱', value: 'ID-cool'},
        {content: '🤗', value: 'ID-woozy'},
        {content: '🤢', value: 'ID-sick'},
        {content: '🤥', value: 'ID-cool'},
        {content: '🤩', value: 'ID-woozy'},
        {content: '🤭', value: 'ID-sick'},
        {content: '🥴', value: 'ID-woozy'},
        {content: '🥳', value: 'ID-cool'},
        {content: '🤮', value: 'ID-woozy'},
        {content: '😎', value: 'ID-woozy'},
        {content: '🥶', value: 'ID-sick'}
    ];
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
                    <div className="palette">
                    <Palette options={options} disabled={false} multiple={false} />
                    {/*<div>Choose an emoji</div>*/}
                    {/*<button>emoji</button>*/}
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
