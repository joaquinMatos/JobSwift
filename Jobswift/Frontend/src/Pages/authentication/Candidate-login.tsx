import { Alert, Box, Grid, Typography, useMediaQuery } from "@mui/material"
import { useState } from "react";
import CustomButton from "../../components/ButtonLogin";
import { BorderBottom, Margin } from "@mui/icons-material";
import Facebook from "../../img/facebook.svg"
import whatsapp from "../../img/whatsapp.svg"
import send from "../../img/send.svg"
import adorno1 from "../../img/adornos/Alogin_1.svg"
import robot from "../../img/avatar/robotn.svg"
import { useAuth } from "../../context/AuthLogin";
import { Navigate, useNavigate } from "react-router-dom";
import LoandingProgressBars from "../../components/Loanding";
import axios from "axios";
import API_URL from "../../utils/api";
import { AuthResponse } from "../../interface/interface";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:700px)');
    const [alertError, setAlertError] =  useState<JSX.Element | null>(null);

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

        } catch {
            setAlertError(<Alert severity="error"> Error al Iniciar Seccion </Alert>);
            setLoading(false);
        }
    };

    if (loading) {
        return <div> <LoandingProgressBars /></div>;
    };


    return (
        <Box sx={{ height: '100vh' }}>
            <Grid container sx={{ height: '100%' }}>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    lg={8}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingRight: '100px',
                        paddingBottom: '100px',
                        height: '100vh', // ajusta según necesites
                    }}
                >
                    <Typography variant="h4" color="black" sx={{ marginBottom: '20px', fontSize: '15px', fontWeight: '700', }}>
                        Welcome back!
                    </Typography>
                    {alertError && (
                        <Box sx={{ width: '100%', maxWidth: '400px', marginBottom: '20px' }}>
                            {alertError}
                        </Box>
                    )}
                    <Grid
                        sx={{
                            width: '50%'
                        }}
                    >
                        <form
                        onSubmit={handleSubmit}
                        >
                            <Typography sx={{ margin: '10px' }}>Email:</Typography>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '50px',
                                    border: '2px solid #21bbff',
                                    background: '#FFFFFF',
                                    boxSizing: 'border-box',
                                }}
                                required
                            />
                            <Typography sx={{ margin: '10px' }}>Password:</Typography>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '50px',
                                    border: '2px solid #21bbff',
                                    background: '#FFFFFF',
                                    boxSizing: 'border-box',
                                }}
                                required
                            />
                            <CustomButton
                            type="submit"
                                sx={{
                                    width: '100%',
                                    marginTop: '30px',
                                    borderRadius: '50px'
                                }}>
                                login
                            </CustomButton>
                        </form>
                        <Typography sx={{
                            marginTop: '25px',
                            textAlign: 'center'
                        }}>
                            Don't have an account?
                            <span style={{ color: '#21bbff', cursor: 'pointer', marginLeft: '15px' }}>
                                Register
                            </span>
                        </Typography>
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                textAlign: 'center',
                                justifyContent: 'center', // centra horizontalmente los elementos
                                alignItems: 'center', // centra verticalmente los elementos
                                padding: '20px', // espacio alrededor del contenedor
                            }}
                        >
                            <Grid item>
                                <img src={Facebook} alt="Facebook" style={{ cursor: 'pointer' }} />
                            </Grid>
                            <Grid item>
                                <img src={whatsapp} alt="WhatsApp" style={{ cursor: 'pointer' }} />
                            </Grid>
                            <Grid item>
                                <img src={send} alt="Send" style={{ cursor: 'pointer' }} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        sx={{
                            position: 'absolute',
                            width: '200px',
                            height: '160px',
                            bottom: 0,
                            left: 0,
                            marginRight: '300px'
                        }}
                    >
                        <img src={adorno1} alt="" />
                    </Grid>
                </Grid>
                {!isSmallScreen && (
                    <Grid item xs={0} sm={4} lg={4} sx={{
                        background: '#21bbff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Grid item sx={{
                            position: 'relative',
                            width: '550px',
                            height: '500px',
                            background: 'none',
                            marginRight: '300px'
                        }}>
                          <img src={robot} alt="Robot" style={{ width: '500px',background: 'none'}}/>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default Login