import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, IconButton } from '@mui/material';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Job {
    idOfertaTrabajo: number;
    titulo: string;
    ubicacion: string;
    jornada: string;
    salario: string;
    descripcion: string;
    fk_IdReclutador: number;
}

interface JobDescriptionProps {
    job: Job | null;
}

const Descripcion: React.FC<JobDescriptionProps> = ({ job }) => {
    const [postulacionId, setPostulacionId] = useState<number | null>(null); // Estado para almacenar el ID de la postulación
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores
    const [isPostulating, setIsPostulating] = useState<boolean>(false); // Estado para controlar el estado de postulación

    useEffect(() => {
        if (postulacionId !== null) {
            // Aquí podrías realizar alguna acción adicional después de la postulación
            // Por ejemplo, redirigir a otra página, mostrar un mensaje adicional, etc.
            console.log('Postulación exitosa:', postulacionId);
        }
    }, [postulacionId]);

    if (!job) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Selecciona un trabajo para ver los detalles</Typography>
            </Box>
        );
    }

    const handlePostular = async () => {
        try {
            setIsPostulating(true);
    
            const fk_Candidato = 1; // Reemplaza con la lógica para obtener el ID del candidato actual
            const status = 0; // Reemplaza con la lógica para obtener el estado de la postulación
    
            const response = await axios.post(`https://localhost:7151/Postulacion`, {
                status,
                fk_Candidato,
                fk_IdOfertaTrabajo: job.idOfertaTrabajo,
                fk_IdReclutador: job.fk_IdReclutador
            });
    
            if (response.status === 201) { // Verifica el código de estado esperado para la creación exitosa
                setPostulacionId(response.data.result[0].idPostulacion);
            } else {
                setError('Error al procesar la postulación');
            }
        } catch (error) {
            console.error('Error al postular:', error);
            console.log(error); // Agrega este console.log para ver detalles del error en la consola
            setError('Error al procesar la postulación');
        } finally {
            setIsPostulating(false);
        }
    };
    
    
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4">{job.titulo}</Typography>
            <Typography variant="h6">{job.ubicacion}</Typography>
            <Typography variant="body2">{job.jornada}</Typography>
            <Typography variant="body2">{job.salario}</Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>{job.descripcion}</Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handlePostular}
                disabled={postulacionId !== null || isPostulating} // Deshabilita el botón si ya se realizó la postulación o está en proceso
            >
                {isPostulating ? <CircularProgress size={24} /> : (postulacionId !== null ? 'Postulado' : 'Postularme')}
            </Button>
            {error && <Typography variant="body2" color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </Box>
    );
};

export default Descripcion;
