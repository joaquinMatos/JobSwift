import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthResponse } from '../../interface/interface';
import { useAuth } from '../../context/AuthLogin';
import LoandingProgressBars from '../../components/Loanding';



const API_URL = "https://localhost:7151";

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Petición login API
            const response = await axios.post(`${API_URL}/Login/login`, { Email: email, Constrasena: password });
            const { result: token } = response.data;
            // Token de autenticación y para cualquier petición de API
            console.log(token);
            
            // Prepara el objeto userData para la función saveUser
            const userData: AuthResponse = {
                body: {
                    accessToken: token,
                },
            };

            auth.saveUser(userData);
            navigate("/dashboard");

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div> <LoandingProgressBars /></div>;
    }

    return (
        <Grid>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </Grid>
    );
};

export default LoginComponent;
