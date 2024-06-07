// @ts-nocheck
import React from 'react';
import '../../css/SideBarHeader.css';
import ProfileModalWindow from "../ProfileModalWindow/ProfileModalWindow";
import {useState, useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {observer} from "mobx-react-lite";

type InviteLink = {
    link: any;
}

function InviteLink(props) {
    const { t } = useTranslation();
    const { link } = props;
    return (
        <div className='contacts'>
            <header>
                <p className='header'>{t('link')}:</p>
            </header>
            <main>
                <div>
                    {link}
                </div>
            </main>
        </div>
    );
}

export default observer(InviteLink);
