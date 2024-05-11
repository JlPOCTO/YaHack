import React, {useState} from 'react';
import '../../css/HeaderOfBodyMain.css';
import {Button, Modal} from "@gravity-ui/uikit";
// import settings from "../../settings-svgrepo-com.svg";
import Profile from "../Profile/Profile";
import {useUserStore} from "../../stores/UserStore";
import {observer} from "mobx-react-lite";

type DialogProps = {
    dialogId: any;
}

function HeaderOfBodyMain(props:any) {
    const {dialogID} = useUserStore();
  return (
    <div className="header-of-body-main">
        <div className="dialog-name">
            {dialogID}
        </div>
        <div className="status">
            online
        </div>
    </div>

  );
}
export default observer(HeaderOfBodyMain);