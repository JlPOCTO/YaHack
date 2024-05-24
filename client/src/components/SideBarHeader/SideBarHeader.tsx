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
const getInitialInput = () => {
    return localStorage.getItem('currentInput') || "";
}
const getInitialTheme = () => {
    return localStorage.getItem('theme') || 'light';
}

function SideBarHeader() {
    let {setLanguage, setSearchInput, searchInput} = useUserStore();
    const [currrentInput, setCurrentInput] = useState(getInitialInput())
    const {t, i18n} = useTranslation();
    const changeLanguage = (lng: string) => () => {
        console.log(lng)
        i18n.changeLanguage(lng);
        setLanguage(lng)
    }
    function getInitialIsLight(){
        return theme === "light";

    }
    const [theme, setTheme] = useState(getInitialTheme)
    const [themeLight, setChangeTheme] = useState(getInitialIsLight())
    const handleSetTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
        setChangeTheme(!themeLight)
        localStorage.setItem('theme', nextTheme)
    }

    const getCurrentInput = () => {
        const currentInput = sessionStorage.getItem('currentInput')
        console.log("cuur: " + currentInput)
        setSearchInput(currentInput)
        console.log("search: " + searchInput)
        setCurrentInput('')
        sessionStorage.setItem('currentInput', '')
    }
    const handleSetCurrentInput = (e: any) => {
        // console.log("handleSetCurrentInput"+ e.target.value)
        setCurrentInput(e.target.value)
        sessionStorage.setItem('currentInput', e.target.value)
    }


    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);
    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles/>
            <header className='SideBarHeader'>
                <menu className='HeaderMenu'>
                    <nav className='HeaderNav'>
                        <div className="profile-input">
                            <ProfileModalWindow/>
                            <div className="searchPlace">
                                <form method='get'>
                                    <input type="text" id="search-messenger" placeholder={t('description.part1')}
                                           name='searchMessage'
                                           value={currrentInput}
                                           onChange={handleSetCurrentInput}
                                        // onChange={handleSetCurrentMessage}
                                        // className="message"
                                    >
                                    </input>
                                </form>
                                <button onClick={action((e) => {
                                    const currentInput = sessionStorage.getItem('currentInput')
                                    console.log("cuur: " + currentInput)
                                    setSearchInput(currentInput)
                                    // searchInput = currentInput
                                    console.log("search: " + searchInput)
                                    setCurrentInput('')

                                })} className='currentSettings'>
                                    <Icon id = "321" className='Settings-rotate-right' data={ArrowRotateRight}/>
                                </button>
                            </div>
                            <button className="switchButton" onClick={handleSetTheme}>
                                {/*<svg className='Settings' fill="#000000" width="800px" height="800px"*/}
                                {/*     viewBox="0 0 64 64"*/}
                                {/*     data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title/>*/}
                                {/*    <path*/}
                                {/*        d="M34.82,56.11a23.86,23.86,0,0,1-9.38-1.9A2,2,0,0,1,27,50.53a19.87,19.87,0,0,0,7.82,1.58A20.16,20.16,0,0,0,46.59,48.3a24.12,24.12,0,0,1-16.2-35.91A20.16,20.16,0,0,0,14.71,32a19.91,19.91,0,0,0,3.88,11.87,2,2,0,0,1-3.23,2.37A24.12,24.12,0,0,1,34.66,7.89h0A2,2,0,0,1,36.5,9.07a2,2,0,0,1-.33,2.16,20.11,20.11,0,0,0,15,33.5h.13a2,2,0,0,1,1.83,1.19,2,2,0,0,1-.34,2.15A24.1,24.1,0,0,1,34.82,56.11Z"/>*/}
                                {/*</svg>*/}
                                {themeLight && <Icon  className='Settings-moon'  data={Moon}/>}
                                {!themeLight && <Icon  className='Settings-moon'  data={Sun}/>}

                            </button>
                            <div className="changeLanguages">
                                <button
                                    id="13b"
                                    type="button"
                                    onClick={changeLanguage('ru')}
                                    className={i18n.language === 'ru' ? 'active' : ''}
                                >
                                    RU
                                </button>
                                <button id="14b"
                                        type="button"
                                        onClick={changeLanguage('en')}
                                        className={i18n.language === 'en' ? 'active' : ''}
                                >
                                    EN
                                </button>
                            </div>
                        </div>

                    </nav>
                </menu>
            </header>
        </ThemeProvider>
    );
}

export default observer(SideBarHeader);
