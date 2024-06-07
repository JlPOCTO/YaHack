import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from "../../Pages/HomePage";
import RegisterPage from "../../Pages/RegisterPage/RegisterPage";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={ <RegisterPage /> }
                />
                <Route
                    path="/home"
                    element={ < HomePage/> }
                />
            </Routes>
        </BrowserRouter>
    );
}
export default Routing;
