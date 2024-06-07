// @ts-nocheck
import '../../css/SideBarHeader.css';
import ProfileModalWindow from "../ProfileModalWindow/ProfileModalWindow";
import {useState, useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import {lightTheme, darkTheme, GlobalStyles} from '../App/themes';
import '../../i18n/config';
import {useTranslation} from 'react-i18next';
import {useUserStore} from "../../stores/UserStore";
import {Icon} from "@gravity-ui/uikit";
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
    let {setLanguage, setSearchInput} = useUserStore();
    const [currrentInput, setCurrentInput] = useState(getInitialInput())
    const {t, i18n} = useTranslation();
    const changeLanguage = (lng: string) => () => {
        i18n.changeLanguage(lng);
        setLanguage(lng)
    }

    function getInitialIsLight() {
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

    const handleSetCurrentInput = (e: any) => {
        setCurrentInput(e.target.value)
        sessionStorage.setItem('currentInput', e.target.value)
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);
    const handleKeyDown =  (e: any) => {
        const link = document.getElementById('road-button');
        if (e.keyCode == 13) {
            if (e.shiftKey == false) {
                e.preventDefault();
                // @ts-ignore
                link.click()
            }
        }

    };
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
                                           onKeyDown={handleKeyDown}
                                    >
                                    </input>
                                </form>
                                <button onClick={action((e) => {
                                    const currentInput = sessionStorage.getItem('currentInput')
                                    setSearchInput(currentInput)
                                    setCurrentInput('')

                                })} className='currentSettings' id="road-button">
                                    <Icon id="321" className='Settings-rotate-right' data={ArrowRotateRight}/>
                                </button>
                            </div>
                            <button className="switchButton" onClick={handleSetTheme}>
                                {themeLight && <Icon className='Settings-moon' data={Moon}/>}
                                {!themeLight && <Icon className='Settings-moon' data={Sun}/>}
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
