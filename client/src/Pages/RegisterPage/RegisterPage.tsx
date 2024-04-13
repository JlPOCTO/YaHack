import React from 'react';
import '../../css/ProfileModalWindow.css';

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
