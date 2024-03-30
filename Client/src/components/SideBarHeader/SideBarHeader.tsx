import React from 'react';
import '../../css/SideBarHeader.css';
import ProfileModalWindow from "../ProfileModalWindow/ProfileModalWindow";


function SideBarHeader() {
  return (
    <div className="side-bar-header">
      Header
        <ProfileModalWindow/>
    </div>
  );
}
export default SideBarHeader;
