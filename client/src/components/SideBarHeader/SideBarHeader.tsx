import React from 'react';
import '../../css/SideBarHeader.css';
import ProfileModalWindow from "../ProfileModalWindow/ProfileModalWindow";
import {useState, useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import {lightTheme, darkTheme, GlobalStyles} from '../App/themes';

const getInitialTheme = () => {
    console.log(localStorage.getItem('theme'))
    return localStorage.getItem('theme') || 'light';
}

function SideBarHeader() {
    const [theme, setTheme] = useState(getInitialTheme)
    const handleSetTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
        localStorage.setItem('theme', nextTheme)
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

                            <form method='get'>
                                <input type="text" id="search-messenger" placeholder='Search' name='searchMessage'>
                                </input>
                            </form>
                        </div>
                        <button className="switchButton" onClick={handleSetTheme}>
                            <svg className='Settings' fill="#000000" width="800px" height="800px" viewBox="0 0 64 64"
                                 data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title/>
                                <path
                                    d="M34.82,56.11a23.86,23.86,0,0,1-9.38-1.9A2,2,0,0,1,27,50.53a19.87,19.87,0,0,0,7.82,1.58A20.16,20.16,0,0,0,46.59,48.3a24.12,24.12,0,0,1-16.2-35.91A20.16,20.16,0,0,0,14.71,32a19.91,19.91,0,0,0,3.88,11.87,2,2,0,0,1-3.23,2.37A24.12,24.12,0,0,1,34.66,7.89h0A2,2,0,0,1,36.5,9.07a2,2,0,0,1-.33,2.16,20.11,20.11,0,0,0,15,33.5h.13a2,2,0,0,1,1.83,1.19,2,2,0,0,1-.34,2.15A24.1,24.1,0,0,1,34.82,56.11Z"/>
                            </svg>
                        </button>

                    </nav>
                </menu>
            </header>
        </ThemeProvider>
    );
}

export default SideBarHeader;
