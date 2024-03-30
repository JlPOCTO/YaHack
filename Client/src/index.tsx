import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "@gravity-ui/uikit";
import Ro from "./Pages/RegisterPage/RegisterPage";
import {BrowserRouter as Router} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import Routing from "./components/Routing/Routing";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>

        <ThemeProvider theme='light'>
            {/*<Router>*/}
                <Routing/>
            {/*</Router>*/}
        </ThemeProvider>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
