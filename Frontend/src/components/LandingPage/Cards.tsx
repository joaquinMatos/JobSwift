import { Box, Button, Card, Grid, Typography } from "@mui/material";

const Cards = () => {
    return (
        <Box sx={{ position: 'relative' }}>
            <Box sx={{
                bgcolor: '#FFFFFF',
                minHeight: '20vh'
            }} />
            <Box display="flex" sx={{
                bgcolor: '#142F3C',
                minHeight: '50vh',
                padding: '10px'
            }}>
                <Grid container justifyContent="space-evenly" marginTop={10}>
                    <Grid item xs={12} sm={3.5} md={3.5}>
                        <Card sx={{
                            minHeight: '150px',
                            position: 'relative',
                            overflow: 'visible',
                            paddingTop: '100px',
                            borderRadius: '20px',
                            textAlign: 'center'
                        }}>
                            <img
                                src="img/womanyellow.png"
                                alt=""
                                style={{
                                    position: 'absolute',
                                    width: '153px',
                                    top: '-200px',
                                    left: '50%',
                                    transform: 'translateX(-50%)'
                                }}
                            />
                            <Typography align="center" sx={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px', marginTop: '50px' }}>
                                Oferta
                            </Typography>
                            <Box sx={{ paddingLeft: '50px', paddingRight: '50px' }}>
                                <Typography align="center" sx={{ marginBottom: '10px' }}>
                                    ¡Publica tus ofertas en el portal de empleo y atrae a los mejores talentos!
                                </Typography>
                                <Typography align="center">
                                    ¿Necesitas encontrar al candidato perfecto para tu empresa? ¡Nuestro portal de empleo es la solución ideal!
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <Button
                                    sx={{
                                        color: 'orange',
                                        background: 'none',
                                        border: 'none',
                                        borderBottom: '2px solid orange',
                                        padding: '0',
                                        fontSize: 'inherit',
                                        cursor: 'pointer',
                                        margin: '10px'
                                    }}
                                >
                                    REGÍSTRATE
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3.5} md={3.5}>
                        <Card sx={{
                            minHeight: '150px',
                            position: 'relative',
                            overflow: 'visible',
                            paddingTop: '100px',
                            borderRadius: '20px',
                            textAlign: 'center'
                        }}>
                            <img
                                src="img/chicomaleta.png"
                                alt=""
                                style={{
                                    position: 'absolute',
                                    width: '180px',
                                    top: '-200px',
                                    left: '53%',
                                    transform: 'translateX(-50%)'
                                }}
                            />
                            <Typography align="center" sx={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px', marginTop: '50px' }}>
                                Perfil
                            </Typography>
                            <Box sx={{ paddingLeft: '50px', paddingRight: '50px' }}>
                                <Typography align="center" sx={{ marginBottom: '10px' }}>
                                ¡Crea tu perfil y deja que las empresas te busquen a ti!
                                </Typography>
                                <Typography align="center">
                                ¿Estás listo para llevar tu carrera al siguiente nivel? Las mejores oportunidades están a un click de distancia.
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <Button
                                    sx={{
                                        color: 'orange',
                                        background: 'none',
                                        border: 'none',
                                        borderBottom: '2px solid orange',
                                        padding: '0',
                                        fontSize: 'inherit',
                                        cursor: 'pointer',
                                        margin: '10px'
                                    }}
                                >
                                    REGÍSTRATE
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3.5} md={3.5}>
                        <Card sx={{
                            minHeight: '150px',
                            position: 'relative',
                            overflow: 'visible',
                            paddingTop: '100px',
                            borderRadius: '20px',
                            textAlign: 'center'
                        }}>
                            <img
                                src="img/womanyellow.png"
                                alt=""
                                style={{
                                    position: 'absolute',
                                    width: '153px',
                                    top: '-200px',
                                    left: '50%',
                                    transform: 'translateX(-50%)'
                                }}
                            />
                            <Typography align="center" sx={{ fontSize: '20px', fontWeight: '900', marginBottom: '20px', marginTop: '50px' }}>
                                Oferta
                            </Typography>
                            <Box sx={{ paddingLeft: '50px', paddingRight: '50px' }}>
                                <Typography align="center" sx={{ marginBottom: '10px' }}>
                                    ¡Publica tus ofertas en el portal de empleo y atrae a los mejores talentos!
                                </Typography>
                                <Typography align="center">
                                    ¿Necesitas encontrar al candidato perfecto para tu empresa? ¡Nuestro portal de empleo es la solución ideal!
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <Button
                                    sx={{
                                        color: 'orange',
                                        background: 'none',
                                        border: 'none',
                                        borderBottom: '2px solid orange',
                                        padding: '0',
                                        fontSize: 'inherit',
                                        cursor: 'pointer',
                                        margin: '10px'
                                    }}
                                >
                                    REGÍSTRATE
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Cards;
