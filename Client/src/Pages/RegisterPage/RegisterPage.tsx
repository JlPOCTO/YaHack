import React, {useState} from 'react';
import '../../css/ProfileModalWindow.css';
import { redirect } from "react-router-dom";
import {Button, Modal} from "@gravity-ui/uikit";
import Profile from "../../components/Profile/Profile";
import {Routes, Route, useNavigate} from 'react-router-dom';


function RegisterPage() {
    const navigate = useNavigate();

    const navigateToContacts = () => {
        // 👇️ navigate to /contacts
        navigate('/home');
    };
    return (
        <div className="register-page">
            <button onClick={navigateToContacts}>Вход</button>
        </div>
    );
}

export default RegisterPage;
