import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Grid, Typography, Avatar, Paper, CircularProgress } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';

const ProfileCard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://localhost:7151/PerfilCandidato')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setData(data.result[0]);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><CircularProgress /></Box>;
    }

    if (!data) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><Typography>No data available</Typography></Box>;
    }

    return (
        <Box sx={{ bgcolor: '#E3F2FD', minHeight: '100vh', padding: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ padding: '20px', borderRadius: '12px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar
                                alt="Profile Picture"
                                
                                sx={{ width: 80, height: 80, marginRight: 2 }}
                            />
                            <Box>
                                <Typography variant="h6" component="div">Nombre y apellido</Typography>
                                <Typography variant="subtitle1" color="textSecondary">Puesto (Ej: Diseñadora Gráfica)</Typography>
                            </Box>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Use este apartado para contar quién sos, a qué te dedicás y cuáles son tus fortalezas para entrar a un nuevo equipo de trabajo. Intentá que este texto defina con sinceridad qué te hace única/o y por qué sos la persona indicada para el puesto al que acudís.
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ mb: 1 }}>Experiencia profesional</Typography>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1">Experiencia</Typography>
                            <Typography variant="body2">{data.experiencia}</Typography>
                        </Box>
                        <Typography variant="h6" component="div" sx={{ mb: 1 }}>Formación</Typography>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1">Formación</Typography>
                            <Typography variant="body2">{data.formacion}</Typography>
                        </Box>
                        <Typography variant="h6" component="div" sx={{ mb: 1 }}>Idiomas</Typography>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2">{data.idiomas}</Typography>
                        </Box>
                        <Typography variant="h6" component="div" sx={{ mb: 1 }}>Habilidades</Typography>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2">{data.habilidades}</Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ padding: '20px', borderRadius: '12px' }}>
                        <Typography variant="h6" component="div" sx={{ mb: 2 }}>Documentos adjuntos</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>Puesto (Ej: certificado.pdf)</Typography>
                        <Button
                            variant="contained"
                            startIcon={<UploadFileIcon />}
                            sx={{ bgcolor: '#007AFF', color: '#FFFFFF' }}
                            href={data.curriculumPerfil}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ver Curriculum
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProfileCard;
