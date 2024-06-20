import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoandingProgressBars from '../../components/Loanding';

const API_URL = "https://localhost:7151";

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/Login/login`, { Email: email, Constrasena: password });
            const { result: token } = response.data;
            console.log(response.data);
            sessionStorage.setItem('Authorization', token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            // Manejar el error de inicio de sesión aquí
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div><LoandingProgressBars /></div>;
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
