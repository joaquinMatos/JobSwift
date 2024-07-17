import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthLogin';

interface Postulacion {
    idPostulacion: number;
    fk_IdOfertaTrabajo: number;
    status: number;
    // Otros campos según tu API
}

const MisPostulaciones = () => {
    const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
    const navigate = useNavigate();
    const { getAccessToken } = useAuth();

    useEffect(() => {
        fetchPostulaciones(); // Carga las postulaciones al cargar la página
    }, []);

    const fetchPostulaciones = async () => {
        try {
            const token = await getAccessToken();
            const response = await axios.get(`https://localhost:7151/Favorito`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPostulaciones(response.data.result); // Actualiza las postulaciones con los datos obtenidos
            console.log(response.data.result); // Asegúrate de que los datos sean correctos en la consola
        } catch (error) {
            console.error('Error al obtener las postulaciones:', error);
            // Puedes manejar el error según tus necesidades (por ejemplo, mostrar un mensaje al usuario)
        }
    };

    const handlePostulacionClick = (fk_IdOfertaTrabajo: number) => {
        navigate(`/dashboard`, { state: { jobId: fk_IdOfertaTrabajo } }); // Navega a Dashboard con el ID del trabajo seleccionado en la URL
    };

    return (
        <Box sx={{ p: 2, flexGrow: 1 }}>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, mb: 2 }}>
                Mis Postulaciones
            </Typography>
            <Grid container spacing={2}>
                {postulaciones.map((postulacion) => (
                    <Grid item key={postulacion.idPostulacion} xs={12} md={6}>
                        <Box
                            sx={{ p: 2, bgcolor: '#f0f0f0', borderRadius: 1, cursor: 'pointer' }}
                            onClick={() => handlePostulacionClick(postulacion.fk_IdOfertaTrabajo)}
                        >
                            <Typography variant="h6">{`Oferta de trabajo ${postulacion.fk_IdOfertaTrabajo}`}</Typography>
                            <Typography variant="body1">{`Estado: ${postulacion.status === 0 ? 'Pendiente' : 'Aceptado'}`}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MisPostulaciones;
