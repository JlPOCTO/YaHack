import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from "../../Pages/HomePage";
import React from "react";
import RegisterPage from "../../Pages/RegisterPage/RegisterPage";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={ <RegisterPage /> }
                />
                {/* The next line is very important for the Navigate component to work */}
                <Route
                    path="/home"
                    element={ < HomePage/> }
                />
                {/*<Route*/}
                {/*    path="/redirect"*/}
                {/*    element={ <Navigate to="/error-page" /> }*/}
                {/*/>*/}
            </Routes>
        </BrowserRouter>
    );
}
export default Routing;
