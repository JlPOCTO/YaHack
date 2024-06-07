import React, { useState } from 'react';
import '../../css/BodyMain.css';
import Dialog from "../Dialog/Dialog";
import { useUserStore } from "../../stores/UserStore";


function BodyMain() {

  const { dialogID } = useUserStore()
  function isDefault() {
    return dialogID === 0
  }
  return (
    <>
        <div className= {isDefault() === true ?"body-empty" : "body-main"}>
          {<Dialog />}
        </div>
    </>
  );
}
export default BodyMain;
