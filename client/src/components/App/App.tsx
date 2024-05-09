import '../../css/App.css';
import SideBar from '../SideBar/SideBar';
import Body from '../BodyMain/BodyMain';
import { useState } from 'react';
import { UserStoreProvider } from "../../stores/UserStore";

function App() {
    const [idOfShownDialog, setIdDialogWitchIsShown] = useState(0);
    return (
        <UserStoreProvider dialogID={idOfShownDialog}>
            <div className="App">
                <SideBar />
                <Body />
            </div>
        </UserStoreProvider>
    );

}

export default App;
