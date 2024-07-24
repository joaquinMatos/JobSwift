// src/components/BienvenidoReclutador.tsx
import React from 'react';
import { Box, Typography, Grid, Button } from "@mui/material";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import News from '../../components/News';

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
            
            <News />
        </Box>
    );
}

export default BienvenidoReclutador;
