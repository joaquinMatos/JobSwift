import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import visual from '../../img/adornos/phone.svg';
import CustomButton from "../../components/ButtonLogin";

const Hero = () => {

    const navigate = useNavigate();

    const routerLogin = () => {
        navigate('/candidate-login');
    };

    const routerRegister = () => {
        navigate('/candidate-register');
    };

    return (
        <Box display="flex" sx={{ position: 'relative', bgcolor: '#21bbff', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Fondos circulares */}
            <Box sx={{ position: 'absolute', top: '550px', left: '10px', zIndex: 0 }}>
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
                    <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '20px', md: '70px' }, paddingRight: { xs: '20px', md: '0' }, textAlign: { xs: 'center', md: 'left' } }}>
                        <Grid item sx={{ marginTop: { xs: '30px', md: '10%' }, fontFamily: "Poppins" }}>
                            <Typography color={"#000000"} fontSize={18} sx={{ fontWeight: '800' }}>
                                ¡Descubre Oportunidades Únicas en Nuestro Portal de Empleo!
                            </Typography>
                        </Grid>
                        <Grid item sx={{ fontFamily: "Poppins", textAlign: { xs: 'center', md: 'justify' } }}>
                            <Typography color={"#000000"} fontSize={18}>
                                ¿Buscas el trabajo de tus sueños? ¡No busques más! En nuestro
                            </Typography>
                            <Typography color={"#000000"} fontSize={18}>
                                portal de empleo, encontrarás las mejores ofertas laborales que
                            </Typography>
                            <Typography color={"#000000"} fontSize={18}>
                                se adaptan a tus habilidades y aspiraciones.
                            </Typography>
                        </Grid>
                        <Grid item sx={{ textAlign: { xs: 'center', md: 'left' }, fontFamily: 'sans-serif', marginTop: '10px' }}>
                            <Typography
                                color="white"
                                sx={{
                                    fontSize: { xs: '40px', md: '70px' },
                                    fontWeight: '900',
                                    textTransform: 'uppercase',
                                    lineHeight: '1.2',
                                    WebkitTextStroke: '3px black'
                                }}
                            >
                                buscas
                            </Typography>
                            <Typography color={"white"} sx={{ fontSize: { xs: '40px', md: '70px' }, fontWeight: '900', textTransform: 'uppercase', lineHeight: '.5', WebkitTextStroke: '3px black', }}>
                                empleo
                            </Typography>
                            <Typography color={"white"} sx={{ fontSize: { xs: '40px', md: '70px' }, fontWeight: '900', textTransform: 'uppercase', lineHeight: '1.2', WebkitTextStroke: '3px black', }}>
                                hazlo en linea
                            </Typography>
                        </Grid>
                        <Grid item display="flex" justifyContent={{ xs: 'center', md: 'left' }} marginTop={5}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Grid item>
                                    <CustomButton
                                        onClick={routerRegister}
                                        sx={{
                                            minWidth: '200px',
                                            fontSize: '20px',
                                            padding: '5px',
                                            background: '#ffffff',
                                            color: '#000000',
                                            borderRadius: '10px',
                                            border: '2px solid #000000',
                                            marginBottom: { xs: 2, sm: 0 },
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                            },
                                        }}
                                        tooltipText="Candidatos"
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            Registrar
                                        </Box>
                                    </CustomButton>
                                </Grid>
                            </Stack>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} md={6} sx={{ bgcolor: '#21bbff', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginTop: { xs: '30px', md: '62px' } }}>
                        <Box sx={{
                            position: 'absolute',
                            width: { xs: '300px', md: '500px' },
                            height: { xs: '300px', md: '500px' },
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '50%',
                            zIndex: 1,
                        }} />
                        <img alt="Illustration" src={visual} style={{ zIndex: 2, width: '80%', height: 'auto' }} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Hero;
