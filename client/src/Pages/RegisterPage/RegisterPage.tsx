import React, {useState} from 'react';
import '../../css/Register.css';
import {redirect} from "react-router-dom";
import {Button, Modal} from "@gravity-ui/uikit";
import Profile from "../../components/Profile/Profile";
import {Routes, Route, useNavigate} from 'react-router-dom';

function RegisterPage() {
    return (
        <div className="register-page">
            <div className="open-area">
                <label>Kilogram</label>
                <div className="photo">

                </div>
                <a href="/auth/github" className="register-button">

                    Вход через GitHub

                </a>
            </div>
        </div>
    );
}

export default RegisterPage;
