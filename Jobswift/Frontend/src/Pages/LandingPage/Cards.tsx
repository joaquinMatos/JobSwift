import React from 'react';
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const Cards = () => {
    return (
        <Box>
            <Box sx={{
               
            }} />
            <Box display="flex" sx={{
              
            }}>
                <Grid container justifyContent="space-evenly" marginTop={10}>
                    <Grid item xs={12} sm={3.5} md={3.5}>
                        <Card sx={{
                            minHeight: '350px',
                            position: 'relative',
                            overflow: 'visible',
                            padding: '20px',
                            borderRadius: '20px',
                            textAlign: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            backgroundColor: '#FFFFFF'
                        }}>
                            <WorkOutlineIcon sx={{ fontSize: 50, color: '#007AFF', marginBottom: '20px' }} />
                            <Typography align="center" sx={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
                                Oferta
                            </Typography>
                            <Box sx={{ padding: '0 20px' }}>
                                <Typography align="center" sx={{ marginBottom: '10px', fontSize: '16px' }}>
                                    ¡Publica tus ofertas en el portal de empleo y atrae a los mejores talentos!
                                </Typography>
                                <Typography align="center" sx={{ fontSize: '14px', color: '#777777' }}>
                                    ¿Necesitas encontrar al candidato perfecto para tu empresa? ¡Nuestro portal de empleo es la solución ideal!
                                </Typography>
                            </Box>
                            
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3.5} md={3.5}>
                        <Card sx={{
                            minHeight: '350px',
                            position: 'relative',
                            overflow: 'visible',
                            padding: '20px',
                            borderRadius: '20px',
                            textAlign: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            backgroundColor: '#FFFFFF'
                        }}>
                            <PersonOutlineIcon sx={{ fontSize: 50, color: '#007AFF', marginBottom: '20px' }} />
                            <Typography align="center" sx={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
                                Perfil
                            </Typography>
                            <Box sx={{ padding: '0 20px' }}>
                                <Typography align="center" sx={{ marginBottom: '10px', fontSize: '16px' }}>
                                    ¡Crea tu perfil y deja que las empresas te busquen a ti!
                                </Typography>
                                <Typography align="center" sx={{ fontSize: '14px', color: '#777777' }}>
                                    ¿Estás listo para llevar tu carrera al siguiente nivel? Las mejores oportunidades están a un click de distancia.
                                </Typography>
                            </Box>
                           
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3.5} md={3.5}>
                        <Card sx={{
                            minHeight: '350px',
                            position: 'relative',
                            overflow: 'visible',
                            padding: '20px',
                            borderRadius: '20px',
                            textAlign: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            backgroundColor: '#FFFFFF'
                        }}>
                            <AssessmentOutlinedIcon sx={{ fontSize: 50, color: '#007AFF', marginBottom: '20px' }} />
                            <Typography align="center" sx={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>
                                Análisis
                            </Typography>
                            <Box sx={{ padding: '0 20px' }}>
                                <Typography align="center" sx={{ marginBottom: '10px', fontSize: '16px' }}>
                                    ¡Analiza el rendimiento de tus ofertas y mejora tu estrategia de contratación!
                                </Typography>
                                <Typography align="center" sx={{ fontSize: '14px', color: '#777777' }}>
                                    Obtén estadísticas detalladas y maximiza el impacto de tus publicaciones.
                                </Typography>
                            </Box>
                           
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Cards;
