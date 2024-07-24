import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, IconButton, Alert, Snackbar } from '@mui/material';
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

interface Postulacion {
    idPostulacion: number;
    fk_IdOfertaTrabajo: number;
    status: number;
    email: string;
    nTelefonico: string;
    apellidos: string;
    nombreCompleto: string;
    ciudad: string;
    fechaPublicacion: string;
    experiencia: string;
    contrato: string;
    salario: string;
    titulo: string;
}

const Descripcion: React.FC<JobDescriptionProps> = ({ job }) => {
    const [postulacionId, setPostulacionId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPostulating, setIsPostulating] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

    useEffect(() => {
        if (job) {
            checkIfPostulated();
        }
    }, [job]);

    const checkIfPostulated = async () => {
        try {
            const response = await axios.get<{ success: boolean; result: Postulacion[] }>(`https://localhost:7151/Postulacion`);

            const postulacion = response.data.result.find(p => p.fk_IdOfertaTrabajo === job?.idOfertaTrabajo);

            if (postulacion) {
                setPostulacionId(postulacion.idPostulacion);
            } else {
                setPostulacionId(null);
            }
        } catch (error) {
            console.error('Error al verificar la postulación:', error);
        }
    };

    const handlePostular = async () => {
        try {
            setIsPostulating(true);

            const fk_Candidato = 1; // Reemplaza con la lógica para obtener el ID del candidato actual
            const status = 0;

            const response = await axios.post(`https://localhost:7151/Postulacion`, {
                status,
                fk_Candidato,
                fk_IdOfertaTrabajo: job!.idOfertaTrabajo,
                fk_IdReclutador: 1
            });

            if (response.status === 201 && response.data.result && response.data.result.length > 0) {
                setPostulacionId(response.data.result[0].idPostulacion);
                setSnackbarMessage('Postulación exitosa');
            } else {
                setSnackbarMessage('Postulacion exitosa');
            }
        } catch (error) {
            console.error('Error al postular:', error);
            setError('Error al procesar la postulación');
        } finally {
            setIsPostulating(false);
        }
    };

    const handleDespostular = async () => {
        try {
            setIsPostulating(true);

            await axios.delete(`https://localhost:7151/Postulacion/${postulacionId}`);

            setPostulacionId(null);
            setSnackbarMessage('Despostulación exitosa');
        } catch (error) {
            console.error('Error al despostular:', error);
            setError('Error al procesar la despostulación');
        } finally {
            setIsPostulating(false);
        }
    };

    const handleAddToFavorites = async () => {
        try {
            const fk_Candidato = 1; // Reemplaza con la lógica para obtener el ID del candidato actual

            const response = await axios.post(`https://localhost:7151/Favorito`, {
                fk_IdCandidato: fk_Candidato,
                fk_IdOfertaTrabajo: job!.idOfertaTrabajo
            });

            if (response.status === 201) {
                setIsFavorite(true);
                setSnackbarMessage('Trabajo añadido a favoritos');
            } else {
                setError('Error al añadir a favoritos');
            }
        } catch (error) {
            console.error('Error al añadir a favoritos:', error);
            setError('Error al añadir a favoritos');
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarMessage(null);
    };

    if (!job) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Selecciona un trabajo para ver los detalles</Typography>
            </Box>
        );
    }

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
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={postulacionId !== null ? handleDespostular : handlePostular}
                    disabled={isPostulating}
                    startIcon={isPostulating ? <CircularProgress size={24} /> : null}
                >
                    {isPostulating ? 'Procesando...' : (postulacionId !== null ? 'Despostularme' : 'Postularme')}
                </Button>
                <IconButton color="secondary" onClick={handleAddToFavorites} disabled={isFavorite}>
                    <FavoriteIcon />
                </IconButton>
            </Box>
            {error && <Typography variant="body2" color="error" sx={{ mt: 2 }}>{error}</Typography>}
            <Snackbar
                open={snackbarMessage !== null}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default Descripcion;
