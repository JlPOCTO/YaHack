import React from 'react';
import '../../css/App.css';
import SideBar from '../SideBar/SideBar';
import Body from '../BodyMain/BodyMain';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

function App() {
  return (

    <div className="App">
        <button>
            <a href="/auth/github">зарегистрируйтесь через GitHub</a>.
        </button>

        <SideBar/>
        <Body/>
    </div>
  );
}
export default App;
