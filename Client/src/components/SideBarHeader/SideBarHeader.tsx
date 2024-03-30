import React from 'react';
import '../../css/SideBarHeader.css';
import ProfileModalWindow from "../ProfileModalWindow/ProfileModalWindow";

function SideBarHeader() {
  return (
    <header className='SideBarHeader'>
        <menu className='HeaderMenu'>
            <nav className='HeaderNav'>
                    <ProfileModalWindow/>
                <form method='get'>
                  <input type="text" id="search-messenger" placeholder='Search' name='searchMessage'>
                  </input>
                </form>
            </nav>
        </menu>
    </header>
  );
}
export default SideBarHeader;
