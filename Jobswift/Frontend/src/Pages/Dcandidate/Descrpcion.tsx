import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, IconButton, Alert } from '@mui/material';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Job {
    idOfertaTrabajo: number;
    titulo: string;
    urgente: boolean;
    ubicacion: string;
    descripcion: string;
    salario: string;
    jornada: string;
    contrato: string;
    requerimientos: string;
    experiencia: string;
    fecha_publicacion: string;
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

            if (response.status === 201) {
                setPostulacionId(response.data.result[0].idPostulacion);
            } else {
                setError('Error al procesar la postulación');
            }
        } catch (error) {
            console.error('Error al postular:', error);
            setError('Error al procesar la postulación');
        } finally {
            setIsPostulating(false);
        }
    };

    return (
        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
            {job.urgente && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    ¡Este trabajo es urgente!
                </Alert>
            )}
            <Typography variant="h4" sx={{ mb: 1 }}>{job.titulo}</Typography>
            <Typography variant="h6" sx={{ mb: 1, color: 'gray' }}>{job.ubicacion}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{job.jornada} | {job.contrato}</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{job.salario}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>{job.descripcion}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}><strong>Requerimientos:</strong> {job.requerimientos}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}><strong>Experiencia:</strong> {job.experiencia}</Typography>
            <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>Publicado el: {new Date(job.fecha_publicacion).toLocaleDateString()}</Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handlePostular}
                disabled={postulacionId !== null || isPostulating}
            >
                {isPostulating ? <CircularProgress size={24} /> : (postulacionId !== null ? 'Postulado' : 'Postularme')}
            </Button>
            {error && <Typography variant="body2" color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </Box>
    );
};

export default Descripcion;
