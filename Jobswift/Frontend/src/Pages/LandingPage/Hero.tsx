import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Hero = () => {
    
    const navigate = useNavigate();

    const ClickLogin = () => {
        navigate('/login');
    };

    return (
        <Box display="flex" sx={{ position: 'relative', bgcolor: '#00AAFF', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Fondos circulares */}
            <Box sx={{ position: 'absolute', top: '-200px', left: '-200px', zIndex: 0 }}>
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        bgcolor: 'rgba(255, 255, 255, 0.3)',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        width: '800px',
                        height: '800px',
                        borderRadius: '50%',
                        bgcolor: 'rgba(255, 255, 255, 0.3)',
                        top: '-400px',
                        right: '-400px',
                    }}
                />
            </Box>

            {/* Información */}
            <Box sx={{ zIndex: 1, width: '100%' }}>
                <Grid container>
                    <Grid item xs={6} sx={{ paddingLeft: '70px' }}>
                        <Grid item sx={{ marginTop: '10%', fontFamily: "Poppins", textAlign: 'left' }}>
                            <Typography color={"white"} fontSize={18} sx={{ fontWeight: '800' }}>
                                ¡Descubre Oportunidades Únicas en Nuestro Portal de Empleo!
                            </Typography>
                        </Grid>
                        <Grid item sx={{ fontFamily: "Poppins", textAlign: 'justify' }}>
                            <Typography color={"white"} fontSize={18}>
                                ¿Buscas el trabajo de tus sueños? ¡No busques más! En nuestro
                            </Typography>
                            <Typography color={"white"} fontSize={18}>
                                portal de empleo, encontrarás las mejores ofertas laborales que
                            </Typography>
                            <Typography color={"white"} fontSize={18}>
                                se adaptan a tus habilidades y aspiraciones.
                            </Typography>
                        </Grid>
                        <Grid item sx={{ textAlign: 'justify', fontFamily: 'sans-serif', marginTop: '10px' }}>
                            <Typography color={"white"} sx={{ fontSize: '70px', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1.2' }}>
                                buscas
                            </Typography>
                            <Typography color={"white"} sx={{ fontSize: '70px', fontWeight: '900', textTransform: 'uppercase', lineHeight: '.5' }}>
                                empleo
                            </Typography>
                            <Typography color={"white"} sx={{ fontSize: '70px', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1.2' }}>
                                hazlo en linea
                            </Typography>
                        </Grid>
                        <Grid item display="flex" justifyContent="center" marginTop={5}>
                            <Stack direction="row" spacing={10}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#E67D15',
                                        color: '#050505',
                                        borderRadius: '35px',
                                        fontWeight: 'bold',
                                        padding: '10px 20px', // Ajustar el padding para un tamaño mayor
                                        fontSize: '16px', // Ajustar el tamaño de fuente
                                        height: '50px', // Ajustar la altura del botón
                                    }}
                                >
                                    Registrate
                                </Button>
                                <Button
                                    onClick={ClickLogin}
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#E67D15',
                                        color: '#050505',
                                        borderRadius: '35px',
                                        fontWeight: 'bold',
                                        padding: '10px 20px', // Ajustar el padding para un tamaño mayor
                                        fontSize: '16px', // Ajustar el tamaño de fuente
                                        height: '50px', // Ajustar la altura del botón
                                    }}
                                >
                                    Iniciar sesión
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ bgcolor: '#00AAFF', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'relative', marginTop: '62px' }}>
                        <Box sx={{
                            position: 'absolute',
                            width: '500px',
                            height: '500px',
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '50%',
                            zIndex: 1,
                        }} />
                        <img alt="Illustration" src="img/chicaoriginal-removebg-preview.png" style={{ zIndex: 2, alignSelf: 'flex-end', height: '100%' }} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Hero;
