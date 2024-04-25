import React from 'react';
import '../../css/SideBar.css';
import SideBarBody from "../SideBarBody/SideBarBody";
import SideBarHeader from "../SideBarHeader/SideBarHeader";
import {observer} from 'mobx-react-lite';


function SideBar() {
    return (
        <div className="side-bar">
            <SideBarHeader/>
            <SideBarBody/>
        </div>
    );

}


export default SideBar;
