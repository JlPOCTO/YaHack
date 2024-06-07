import React from 'react';
import { useState } from 'react';

import {redirect} from "react-router-dom";
import App from "../components/App/App";
import { UserStoreProvider } from "../stores/UserStore";


function HomePage() {
  const [idOfShownDialog, setIdDialogWitchIsShown] = useState(0);
  return (
      <UserStoreProvider dialogID={idOfShownDialog}>
        <div className="home-page">
              <App/>
        </div>
      </UserStoreProvider>
    );
}

export default HomePage;
