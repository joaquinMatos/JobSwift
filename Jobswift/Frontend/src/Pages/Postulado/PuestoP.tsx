import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, styled } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthLogin';

interface Postulacion {
    idPostulacion: number;
    fk_IdOfertaTrabajo: number;
    status: number;
    fechaPublicacion: string;
    descripcion: string;
    experiencia: string;
    contrato: string;
    salario: number;
    titulo: string;
}

// Styled component for the card with hover effect
const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:hover': { backgroundColor: '#f9f9f9' },
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.02)',
    },
}));

const MisPostulaciones = () => {
    const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
    const [selectedPostulacion, setSelectedPostulacion] = useState<Postulacion | null>(null);
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const navigate = useNavigate();
    const { getAccessToken } = useAuth();

    useEffect(() => {
        fetchPostulaciones(); // Carga las postulaciones al cargar la página
    }, []);

    const fetchPostulaciones = async () => {
        try {
            const token = await getAccessToken();
            const response = await axios.get(`https://localhost:7151/Postulacion`, {
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

    const handleDeleteClick = (postulacion: Postulacion) => {
        setSelectedPostulacion(postulacion);
        setOpenDialog(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedPostulacion) return;
        try {
            const token = await getAccessToken();
            await axios.delete(`https://localhost:7151/Postulacion/${selectedPostulacion.idPostulacion}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPostulaciones(prev => prev.filter(p => p.idPostulacion !== selectedPostulacion.idPostulacion));
            setSnackbarMessage('Despostulación exitosa');
        } catch (error) {
            console.error('Error al despostularse:', error);
            setSnackbarMessage('Error al despostularse');
        } finally {
            setOpenDialog(false);
            setSelectedPostulacion(null);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarMessage(null);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPostulacion(null);
    };

    const getStatusText = (status: number) => {
        switch (status) {
            case 0:
                return 'En proceso';
            case 1:
                return 'CV Visto';
            case 2:
                return 'Entrevista';
            case 3:
                return 'Ofrecido';
            case 4:
                return 'Contratado';
            default:
                return 'Desconocido';
        }
    };

    const getStatusPercentage = (status: number) => {
        return (status / 4) * 100;
    };

    return (
        <Box sx={{bgcolor: '#E3F2FD',minHeight: '100vh', p: 2, flexGrow: 1 }}>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, mb: 2 }}>
                Mis Postulaciones
            </Typography>
            <Grid container spacing={2}>
                {postulaciones.map((postulacion) => (
                    <Grid item key={postulacion.idPostulacion} xs={12}>
                        <StyledBox onClick={() => handlePostulacionClick(postulacion.fk_IdOfertaTrabajo)}>
                            <Box sx={{ flexGrow: 1, cursor: 'pointer' }}>
                                <Typography variant="h6">{postulacion.titulo}</Typography>
                                <Typography variant="body2" color="textSecondary">{`Publicado: ${new Date(postulacion.fechaPublicacion).toLocaleDateString()}`}</Typography>
                                <Typography variant="body2" color="textSecondary">{postulacion.descripcion}</Typography>
                                <Typography variant="body2" color="textSecondary">{`Experiencia: ${postulacion.experiencia}`}</Typography>
                                <Typography variant="body2" color="textSecondary">{`Contrato: ${postulacion.contrato}`}</Typography>
                                <Typography variant="body2" color="textSecondary">{`Salario: $${postulacion.salario.toLocaleString()}`}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px', ml: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    {getStatusText(postulacion.status)}
                                </Typography>
                                <LinearProgress variant="determinate" value={getStatusPercentage(postulacion.status)} sx={{ width: '100%' }} />
                            </Box>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={(e) => {
                                    e.stopPropagation(); // Evita que se dispare el evento onClick del contenedor
                                    handleDeleteClick(postulacion);
                                }}
                                sx={{ ml: 2 }}
                            >
                                Despostularme
                            </Button>
                        </StyledBox>
                    </Grid>
                ))}
            </Grid>
            <Snackbar
                open={snackbarMessage !== null}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirmar Despostulación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que quieres despostularte de esta oferta de trabajo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error">
                        Despostularme
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MisPostulaciones;
