import React, { useState, useEffect } from 'react';
import { Box, Grid, AppBar, Toolbar, Typography } from '@mui/material';
import axios from 'axios';

interface Postulacion {
    idPostulacion: number;
    fk_IdOfertaTrabajo: number;
    status: number;
    // Otros campos según tu API
}

const MisPostulaciones = () => {
    const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);

    useEffect(() => {
        fetchPostulaciones(); // Carga las postulaciones al cargar la página
    }, []);

    const fetchPostulaciones = async () => {
        try {
            const response = await axios.get(`https://localhost:7151/Favorito`, {
                // Puedes manejar los headers según lo que requiera tu API
            });

            setPostulaciones(response.data.result); // Actualiza las postulaciones con los datos obtenidos
            console.log(response.data.result); // Asegúrate de que los datos sean correctos en la consola
        } catch (error) {
            console.error('Error al obtener las postulaciones:', error);
            // Puedes manejar el error según tus necesidades (por ejemplo, mostrar un mensaje al usuario)
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Mis Postulaciones
                    </Typography>
                </Toolbar>
                <Box sx={{ p: 2, flexGrow: 1 , color: "black"}}>
                    <Grid container spacing={2}>
                        {postulaciones.map((postulacion) => (
                            <Grid item key={postulacion.idPostulacion} xs={12} md={6}>
                                <Box sx={{ p: 2, bgcolor: '#f0f0f0', borderRadius: 1 }}>
                                    <Typography variant="h6">{`Oferta de trabajo ${postulacion.fk_IdOfertaTrabajo}`}</Typography>
                                    <Typography variant="body1">{`Estado: ${postulacion.status === 0 ? 'Pendiente' : 'Aceptado'}`}</Typography>
                                    {/* Puedes agregar más detalles según los datos de tu API */}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </AppBar>
        </Box>
    );
};

export default MisPostulaciones;
