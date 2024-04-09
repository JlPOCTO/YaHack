import '../../css/Profile.css';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from '../App/themes';

function Profile() {
  const [theme, setTheme] = useState('light')

  const handleSetTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    console.log(nextTheme)
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
  }
  // const getInitialTheme = () => {
  //   return localStorage.getItem('theme') || 'light';
  // }
  // const name = localStorage.getItem('theme') === 'light' ? 'dark' : 'light'
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div className='profile'>
        <header>
          <div className='userProfile'>
            <div className='userPhoto'></div>
            <div className='profileName'>Firstname Lastname</div>
          </div>
        </header>
        <main>
          <div className="item">
            <div className='itemImage'>
              <svg className='Settings' fill="#000000" width="800px" height="800px" viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title /><path d="M34.82,56.11a23.86,23.86,0,0,1-9.38-1.9A2,2,0,0,1,27,50.53a19.87,19.87,0,0,0,7.82,1.58A20.16,20.16,0,0,0,46.59,48.3a24.12,24.12,0,0,1-16.2-35.91A20.16,20.16,0,0,0,14.71,32a19.91,19.91,0,0,0,3.88,11.87,2,2,0,0,1-3.23,2.37A24.12,24.12,0,0,1,34.66,7.89h0A2,2,0,0,1,36.5,9.07a2,2,0,0,1-.33,2.16,20.11,20.11,0,0,0,15,33.5h.13a2,2,0,0,1,1.83,1.19,2,2,0,0,1-.34,2.15A24.1,24.1,0,0,1,34.82,56.11Z" /></svg>
            </div>
            <div className='displaySwitch'>
              <div className='itemNaming'>NightMode</div>
              <button className="switchButton" onClick={handleSetTheme}>Change mode</button>
            </div>
          </div>
          <div className="item">
            <div className='itemImage'>
              <svg className='Settings' fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4,21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3ZM12,7.5a2,2,0,1,1-2,2A2,2,0,0,1,12,7.5ZM8.211,16.215a4,4,0,0,1,7.578,0A.993.993,0,0,1,14.83,17.5H9.18A1,1,0,0,1,8.211,16.215Z" /></svg>
            </div>
            <div className='itemNaming'>Contacts</div>
          </div>
          <div className="item">
            <div className='itemImage'>
              <svg className='Settings' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7L12 14M12 14L15 11M12 14L9 11" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16 17H12H8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </div>
            <div className='itemNaming'>Saved messages</div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
export default Profile;
