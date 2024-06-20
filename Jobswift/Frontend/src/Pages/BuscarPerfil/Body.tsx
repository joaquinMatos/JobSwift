import React from 'react';
import { Box, Grid, Typography, Button, IconButton, TextField } from '@mui/material';
import { AccountCircle, LocationOn } from '@mui/icons-material';
import Circulos from './Circulos';

const Body = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: '83vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(to right, #00BFFF, #00BFFF)',
                color: 'white',
                overflow: 'hidden',
                p: 4,
            }}
        >
            <Circulos />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 2,
                    bgcolor: 'white',
                    borderRadius: '25px',
                    boxShadow: 3,
                    p: 1,
                    mb: 4,
                    width: '90%',
                    maxWidth: '800px',
                }}
            >

                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <IconButton>
                        <AccountCircle sx={{ fontSize: 40 }} />
                    </IconButton>
                    <TextField
                        variant="outlined"
                        placeholder="Características"
                        sx={{
                            flexGrow: 1,
                            mx: 2,
                            backgroundColor: 'white',
                            borderRadius: '25px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                    />
                    <IconButton>
                        <LocationOn sx={{ fontSize: 40 }} />
                    </IconButton>
                    <TextField
                        variant="outlined"
                        placeholder="Lugar de Residencia"
                        sx={{
                            flexGrow: 1,
                            mx: 2,
                            backgroundColor: 'white',
                            borderRadius: '25px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                    />
                    <Button variant="contained" sx={{ ml: 2, backgroundColor: '#555', borderRadius: '25px' }}>
                        Buscar
                    </Button>
                </Box>
            </Box>

            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>
                    Perfiles
                </Typography>
                <Typography variant="body1" sx={{ color: 'black', mb: 4 }}>
                    EPonte pilas y busca el empleo mas cercano que tengas
                </Typography>
            </Box>

            <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ maxWidth: '1000px', margin: '0 auto' }}>
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src="img/28.png" // Cambia esto a la ruta de tu imagen
                        alt="Ilustración"
                        sx={{ width: '100%', maxWidth: '250px' }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
                        ¿Buscas al empleado ideal?
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'black' }}>
                        Empire FBA Prep Services In USA & Canada specializes in providing world-class prep solutions for your Amazon FBA business.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Body;
