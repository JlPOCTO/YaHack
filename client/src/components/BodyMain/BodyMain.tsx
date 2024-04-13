import React, {useState} from 'react';
import '../../css/BodyMain.css';
import Dialog from "../Dialog/Dialog";

type SideBarProps = {
    idOfShownDialog : any;
}
function BodyMain(props:SideBarProps) {
    const { idOfShownDialog} = props;
    const [isShown, setIsShown] = useState(false);
  return (
    <div className="body-main">
        {(!idOfShownDialog) && <img className="Img" alt="picture" />}
        {idOfShownDialog && <Dialog dialogId={idOfShownDialog}/>}
    </div>
  );
}
export default BodyMain;
