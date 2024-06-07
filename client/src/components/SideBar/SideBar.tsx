import React from 'react';
import '../../css/SideBar.css';
import SideBarBody from "../SideBarBody/SideBarBody";
import SideBarHeader from "../SideBarHeader/SideBarHeader";

function SideBar() {
    return (
        <React.StrictMode>
        <div className="side-bar">
            <SideBarHeader/>
            <SideBarBody/>
        </div>
        </React.StrictMode>
    );
}

export default SideBar;
