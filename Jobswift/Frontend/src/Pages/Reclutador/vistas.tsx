import React from 'react';
import { Box, Typography, Paper, Grid, Button } from "@mui/material";

const BienvenidoReclutador = () => {
    return (
        <Box sx={{ bgcolor: '#E3F2FD', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
                <Typography variant="h3" component="div" sx={{ mb: 3 }}>
                    ¡Bienvenido, Reclutador!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Estamos encantados de tenerte aquí. Utiliza este panel para gestionar tus ofertas de trabajo, 
                    buscar candidatos y más.
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button variant="contained" color="primary" href="/crear-oferta">
                            Crear Nueva Oferta
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary" href="/buscar-candidatos">
                            Buscar Candidatos
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default BienvenidoReclutador;
