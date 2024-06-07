import React, {useState} from 'react';
import '../../css/BodyMain.css';
import Dialog from "../Dialog/Dialog";
import {useUserStore} from "../../stores/UserStore";
import AddMessage from '../AddMessage/AddMessage';
import picture from '../../../static/picture.jpg';


function BodyMain() {

  const [isShown, setIsShown] = useState(false);
  return (
    <div className="body-main">
        {<Dialog/>}
    </div>
  );
}
export default BodyMain;
