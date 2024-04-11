import React from 'react';

import {redirect} from "react-router-dom";
import App from "../components/App/App";

function HomePage() {
    return (
        <div className="home-page">
            <App/>
        </div>
    );
}

export default HomePage;
