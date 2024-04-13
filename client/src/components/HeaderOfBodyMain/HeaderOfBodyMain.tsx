import React, {useState} from 'react';
import '../../css/HeaderOfBodyMain.css';
import {Button, Modal} from "@gravity-ui/uikit";
import settings from "../../settings-svgrepo-com.svg";
import Profile from "../Profile/Profile";

type DialogProps = {
    dialog: any;
}

function HeaderOfBodyMain(props:any) {

  return (
    <div className="header-of-body-main">
        Name + photo
    </div>

  );
}
export default HeaderOfBodyMain;
