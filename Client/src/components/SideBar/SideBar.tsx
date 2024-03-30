import React from 'react';
import logo from '../../logo.svg';
import '../../css/SideBar.css';
import SideBarBody from "../SideBarBody/SideBarBody";
import SideBarHeader from "../SideBarHeader/SideBarHeader";

function SideBar() {
  return (
    <div className="side-bar">
      <SideBarHeader/>
      <SideBarBody/>
    </div>
  );
}
export default SideBar;
