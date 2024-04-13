import React from 'react';
import '../../css/SideBar.css';
import SideBarBody from "../SideBarBody/SideBarBody";
import SideBarHeader from "../SideBarHeader/SideBarHeader";
type SideBarProps = {
    idOfShownDialog : any;
    setIdDialogWitchIsShown:any
}
function SideBar(props:SideBarProps) {
    const { idOfShownDialog, setIdDialogWitchIsShown } = props;
  return (
    <div className="side-bar">
      <SideBarHeader/>
      <SideBarBody idOfShownDialog={idOfShownDialog} setIdDialogWitchIsShown={setIdDialogWitchIsShown}/>
    </div>
  );
}
export default SideBar;
