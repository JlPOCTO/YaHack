// @ts-nocheck
import React from 'react';
import '../../css/SideBarHeader.css';
import ProfileModalWindow from "../ProfileModalWindow/ProfileModalWindow";
import {useState, useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import {lightTheme, darkTheme, GlobalStyles} from '../App/themes';
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {useUserStore} from "../../stores/UserStore";
import {Icon} from "@gravity-ui/uikit";
import {ArrowShapeRight} from "@gravity-ui/icons";
import {ArrowRotateRight} from '@gravity-ui/icons';
import {action} from "mobx";
import {observer} from "mobx-react-lite";
import {Moon} from '@gravity-ui/icons';
import {Sun} from '@gravity-ui/icons';


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
