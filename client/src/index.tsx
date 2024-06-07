import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import {ThemeProvider} from "@gravity-ui/uikit";
import Ro from "./Pages/RegisterPage/RegisterPage";
import {BrowserRouter as Router} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import Routing from "./components/Routing/Routing";
import { render } from 'react-dom'

import { configureStore } from '@reduxjs/toolkit'

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
