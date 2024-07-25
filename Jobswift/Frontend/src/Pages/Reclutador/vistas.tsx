// src/components/BienvenidoReclutador.tsx
import React from 'react';
import { Box, Typography, Grid, Button } from "@mui/material";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
<<<<<<< HEAD
=======
import News from '../../components/News';
>>>>>>> 67de0f4b1cdba038af723a0c78d741cdf3da57a3

const BienvenidoReclutador: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#E3F2FD', minHeight: '95vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
            <WorkOutlineIcon sx={{ fontSize: 270, color: '#007AFF', mb: 3 }} />
            <Typography variant="h3" component="div" sx={{ mb: 3 }}>
                ¡Bienvenido, Reclutador!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                Estamos encantados de tenerte aquí. Utiliza este panel para gestionar tus ofertas de trabajo, 
                buscar candidatos y más.
            </Typography>
<<<<<<< HEAD
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Button variant="contained" color="primary" href="/crear-oferta">
                        Crear Nueva Oferta
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="info" href="/buscar-candidatos">
                        Buscar Candidatos
                    </Button>
                </Grid>
            </Grid>
=======
            
            <News />
>>>>>>> 67de0f4b1cdba038af723a0c78d741cdf3da57a3
        </Box>
    );
}

export default BienvenidoReclutador;
