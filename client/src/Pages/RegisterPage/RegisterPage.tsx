import React, {useState} from 'react';
import '../../css/Register.css';
import { redirect } from "react-router-dom";
import {Button, Modal} from "@gravity-ui/uikit";
import Profile from "../../components/Profile/Profile";
import {Routes, Route, useNavigate} from 'react-router-dom';

function RegisterPage() {
    return (
        <div className="register-page">
            <button>

                <a href="/auth/github">Зарегистрируйтесь через GitHub</a>.

            </button>
        </div>
    );
}

export default RegisterPage;
