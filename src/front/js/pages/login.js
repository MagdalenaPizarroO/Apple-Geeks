// ./pages/login.js

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/authContext'
import login from "../../img/login.png";
import { showPopupInfo, showPopupError } from '../component/popupx';

function Login() {
    const { logIn } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleLogin = async () => {
        // Validación simple: usuario y contraseña no deben estar vacíos
        if (!username.trim() || !password.trim()) {
            showPopupError('Ambos campos, usuario y contraseña, son obligatorios.');
            return;
        }

        // Construye los datos del formulario
        const loginData = {
            "correo": username,
            "contrasena": password
        };

        // Envía una solicitud HTTP al servidor
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        // Maneja la respuesta
        if (response.ok) {
            const responseData = await response.json();

            // Almacena el token en el localStorage
            localStorage.setItem('Token', responseData.token);
            localStorage.setItem('userName', username);
            localStorage.setItem('userId', responseData.data.id);

            logIn(username, responseData.data.id);
            console.error('Inicio de sesión exitoso: ' + responseData);
            showPopupInfo('Inicio de sesión exitoso.');
            navigate('/');

        } else {
            console.error('Error al iniciar sesión:', response.statusText);
            showPopupError('Usuario o Password son incorrectas. ');
        }
    };

    const handleCancel = () => {
        setUsername('');
        setPassword('');
    };

    return (
        <div className="container-fluid h-100">
            <div className="row h-100" style={{ marginTop: '75px' }}>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src={login} alt="Imagen" style={{ width: '800px', height: '600px' }} />
                </div>
                <div className="col-md-6 my-auto">
                    <h4 className="text-center mb-4">¡Bienvenido Proveedor!</h4>
                    <h5 className="text-center mb-4">Ingrese sus Datos para Acceder al Portal</h5>
                    <form onSubmit={(event) => event.preventDefault()} className="mx-auto col-6">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Usuario:</label>
                            <input type="text" className="form-control" id="username" maxLength="30" value={username} onChange={handleUsernameChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña:</label>
                            <input type="password" className="form-control" id="password" maxLength="30" value={password} onChange={handlePasswordChange} />
                        </div>
                        <div className="mb-3 text-center">
                            <button type="button" className="btn btn-primary me-2" onClick={handleLogin}>Ingresar</button>
                            <Link to="/" className="btn btn-secondary me-2">Cancelar</Link>
                            <Link to="/recupera-password" className="btn btn-link">¿Olvidaste tu contraseña?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
