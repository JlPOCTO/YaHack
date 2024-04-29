import React, {useState} from 'react';
import '../../css/BodyMain.css';
import Dialog from "../Dialog/Dialog";
import {useUserStore} from "../../stores/UserStore";
import AddMessage from '../AddMessage/AddMessage';
import picture from '../../../static/picture.jpg';


function BodyMain() {

    // const { idOfShownDialog} = props;
    const [isShown, setIsShown] = useState(false);
  return (
    <div className="body-main">
        {/* <img src={picture} className="Settings" alt="settings" /> */}
        {<Dialog/>}
    </div>
  );
}
export default BodyMain;
