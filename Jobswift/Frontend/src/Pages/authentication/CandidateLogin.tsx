import { Box, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthResponse } from '../../interface/interface';
import { useAuth } from '../../context/AuthLogin';
import LoandingProgressBars from '../../components/Loanding';
import señor from '../../img/avatar/Aseñor.svg'



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
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="#21bbff"
        >
            <Box
                display="flex"
                maxWidth="1000px"
                bgcolor="#000000"
                boxShadow={3}
                position="relative"
                sx={{
                    borderRadius: '30px',
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p={6}
                    width="45"
                    bgcolor="#000000"
                    color="white"
                    position="relative"
                    sx={{
                        borderRadius: '70px',
                    }}
                >
                    <form
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '24px',
                            width: '100%',
                            height: '100%'
                        }}
                        onSubmit={handleSubmit}
                    >
                        <div style={{ flex: 1 }}>
                            <Typography variant="h4" fontWeight="bold" align="center">
                                Welcome
                            </Typography>
                            <Typography variant="body2" color="textSecondary" mt={1} align="center">
                                or use your email account:
                            </Typography>
                        </div>
                        <Box mt={2} mb={2} style={{ flex: 1, width: '100%' }}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    boxSizing: 'border-box'
                                }}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    boxSizing: 'border-box'
                                }}
                                required
                            />
                        </Box>
    
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            fullWidth
                        >
                            LOGIN
                        </Button>
                    </form>
                </Box> 
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p={6}
                    width="50%"
                    bgcolor="#21bbff"
                    color="#000000"
                    position="relative"
                    sx={{
                        borderBottomLeftRadius: '100px',
                        borderTopLeftRadius: '100px',
                        borderBottomRightRadius: '28px',
                        borderTopRightRadius: '28px',
                        border: '5px solid #000000'
                    }}
                >
                    <img src={señor} style={{ height: '150px' }} />
                    <Typography variant="h4" fontWeight="bold">
                        ! Bienvenido ¡
                    </Typography>
                    <Typography variant="body2" mt={1}>
                        Register with your personal account to use this app
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ mt: 2, bgcolor: '#3B82F6', color: 'white' }}
                        fullWidth
                    >
                        REGISTER
                    </Button>
                </Box>
            </Box>
        </Box>
    );
    
    
    

};

export default LoginComponent;

