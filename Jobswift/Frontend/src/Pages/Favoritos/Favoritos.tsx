import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, IconButton, Snackbar, CircularProgress } from '@mui/material';
import { Favorite as FavoriteIcon, Star as StarIcon } from '@mui/icons-material';
import axios from 'axios';
import fav from '../../img/Fav.webp';

interface Favorito {
    id: number;
    tituloOferta: string;
    ubicacionOferta: string;
    urgencia: boolean;
    fechaPublicacion: string;
    empresa: string;
    rating: number;
    fk_IdOfertaTrabajo: number;
}

interface Postulacion {
    idPostulacion: number;
    fk_IdOfertaTrabajo: number;
    status: number;
}

const Favoritos = () => {
    const [favoritos, setFavoritos] = useState<Favorito[]>([]);
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
    const [postulacionId, setPostulacionId] = useState<{ [key: number]: number | null }>({});
    const [isPostulating, setIsPostulating] = useState<{ [key: number]: boolean }>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFavoritos(); // Carga los favoritos al cargar la página
    }, []);

    const fetchFavoritos = async () => {
        try {
            const response = await axios.get<Favorito[]>('https://localhost:7151/Favorito');
            setFavoritos(response.data);

            // Verificar postulaciones para los favoritos cargados
            response.data.forEach(favorito => {
                checkIfPostulated(favorito.fk_IdOfertaTrabajo);
            });
        } catch (error) {
            console.error('Error al obtener favoritos:', error);
        }
    };

    const checkIfPostulated = async (fk_IdOfertaTrabajo: number) => {
        try {
            const response = await axios.get<{ success: boolean; result: Postulacion[] }>(`https://localhost:7151/Postulacion`);

            const postulacion = response.data.result.find(p => p.fk_IdOfertaTrabajo === fk_IdOfertaTrabajo);

            if (postulacion) {
                setPostulacionId(prev => ({ ...prev, [fk_IdOfertaTrabajo]: postulacion.idPostulacion }));
            } else {
                setPostulacionId(prev => ({ ...prev, [fk_IdOfertaTrabajo]: null }));
            }
        } catch (error) {
            console.error('Error al verificar la postulación:', error);
        }
    };

    const handlePostular = async (fk_IdOfertaTrabajo: number) => {
        if (!fk_IdOfertaTrabajo) {
            setError('Error: ID de la oferta de trabajo no definido');
            return;
        }
        
        try {
            setIsPostulating(prev => ({ ...prev, [fk_IdOfertaTrabajo]: true }));

            const fk_Candidato = 1; // Reemplaza con la lógica para obtener el ID del candidato actual
            const status = 0;

            const response = await axios.post(`https://localhost:7151/Postulacion`, {
                status,
                fk_Candidato,
                fk_IdOfertaTrabajo,
                fk_IdReclutador: 0
            });

            if (response.status === 201 && response.data.result && response.data.result.length > 0) {
                setPostulacionId(prev => ({ ...prev, [fk_IdOfertaTrabajo]: response.data.result[0].idPostulacion }));
                setSnackbarMessage('Postulación exitosa');
            } else {
                setSnackbarMessage('Postulación exitosa');
            }
        } catch (error) {
            console.error('Error al postular:', error);
            setError(`Error al procesar la postulación: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsPostulating(prev => ({ ...prev, [fk_IdOfertaTrabajo]: false }));
        }
    };

    const handleDespostular = async (fk_IdOfertaTrabajo: number) => {
        if (!fk_IdOfertaTrabajo || !postulacionId[fk_IdOfertaTrabajo]) {
            setError('Error: ID de la postulación no definido');
            return;
        }

        try {
            setIsPostulating(prev => ({ ...prev, [fk_IdOfertaTrabajo]: true }));

            await axios.delete(`https://localhost:7151/Postulacion/${postulacionId[fk_IdOfertaTrabajo]}`);

            setPostulacionId(prev => ({ ...prev, [fk_IdOfertaTrabajo]: null }));
            setSnackbarMessage('Despostulación exitosa');
        } catch (error) {
            console.error('Error al despostular:', error);
            setError(`Error al procesar la despostulación: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsPostulating(prev => ({ ...prev, [fk_IdOfertaTrabajo]: false }));
        }
    };

    const handleRemoveFavorite = async (id: number) => {
        if (!id) {
            setSnackbarMessage('Error: ID del favorito no definido');
            return;
        }
        
        try {
            console.log(`Deleting favorite with ID: ${id}`); // Log to ensure ID is correct
            await axios.delete(`https://localhost:7151/Favorito/${id}`);
            setFavoritos(prev => prev.filter(favorito => favorito.id !== id));
            setSnackbarMessage('Favorito eliminado');
        } catch (error) {
            console.error('Error al eliminar favorito:', error);
            setSnackbarMessage(`Error al eliminar favorito: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarMessage(null);
    };

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: '20px' }}>
                Mis Favoritos
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {favoritos.map((favorito, index) => (
                    <Grid item key={index} xs={12} md={8}>
                        <Card sx={{ borderRadius: '15px', backgroundColor: 'white', marginBottom: '10px' }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {favorito.tituloOferta}
                                </Typography>
                                <Typography color="textSecondary">
                                    {favorito.empresa} <StarIcon fontSize="small" sx={{ verticalAlign: 'middle' }} /> {favorito.rating}
                                </Typography>
                                <Typography color="textSecondary">
                                    {favorito.ubicacionOferta}
                                </Typography>
                                {favorito.urgencia && (
                                    <Typography color="error" sx={{ fontWeight: 'bold' }}>
                                        ¡URGENTE!
                                    </Typography>
                                )}
                                <Typography color="textSecondary">
                                    Publicado el: {new Date(favorito.fechaPublicacion).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={postulacionId[favorito.fk_IdOfertaTrabajo] !== null ? () => handleDespostular(favorito.fk_IdOfertaTrabajo) : () => handlePostular(favorito.fk_IdOfertaTrabajo)}
                                    disabled={isPostulating[favorito.fk_IdOfertaTrabajo] || false}
                                    startIcon={isPostulating[favorito.fk_IdOfertaTrabajo] ? <CircularProgress size={24} /> : null}
                                >
                                    {isPostulating[favorito.fk_IdOfertaTrabajo] ? 'Procesando...' : (postulacionId[favorito.fk_IdOfertaTrabajo] !== null ? 'Despostularme' : 'Postularme')}
                                </Button>
                                <IconButton aria-label="favorito" onClick={() => handleRemoveFavorite(favorito.id)}>
                                    <FavoriteIcon color="error" />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: '15px', backgroundColor: 'white', textAlign: 'center', padding: '20px' }}>
                        <CardContent>
                            <img src={fav} alt="Search Jobs" style={{ maxWidth: '100%', marginBottom: '20px' }} />
                            <Typography>
                                Guarda con un <FavoriteIcon color="error" sx={{ verticalAlign: 'middle' }} /> las ofertas de empleo que más te interesan y postúlate cuando lo desees
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button variant="contained" color="primary">
                                Buscar empleos
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <Snackbar
                open={snackbarMessage !== null}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default Favoritos;
