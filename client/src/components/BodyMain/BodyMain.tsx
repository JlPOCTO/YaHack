import React, {useState} from 'react';
import '../../css/BodyMain.css';
import Dialog from "../Dialog/Dialog";
import {useUserStore} from "../../stores/UserStore";


function BodyMain() {

    // const { idOfShownDialog} = props;
    const [isShown, setIsShown] = useState(false);
  return (
    <div className="body-main">
        {/*{(!idOfShownDialog) && <img className="Img" alt="picture" />}*/}
        {<Dialog/>}
    </div>
  );
}
export default BodyMain;
