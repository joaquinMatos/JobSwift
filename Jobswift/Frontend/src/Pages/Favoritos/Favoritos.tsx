import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, CardActions, Button, IconButton, Box } from '@mui/material';
import { Favorite as FavoriteIcon, Star as StarIcon } from '@mui/icons-material';
import axios from 'axios';
import fav from '../../img/Fav.webp'

interface Favorito {
    tituloOferta: string;
    ubicacionOferta: string;
    urgencia: boolean;
    fechaPublicacion: string;
    empresa: string;
    rating: number;
}

const Favoritos = () => {
    const [favoritos, setFavoritos] = useState<Favorito[]>([]);

    useEffect(() => {
        fetchFavoritos(); // Carga los favoritos al cargar la página
    }, []);

    const fetchFavoritos = async () => {
        try {
            const response = await axios.get<any>('https://localhost:7151/favorito'); // Cambia la URL según tu API
            const favoritosData = response.data;
            setFavoritos(favoritosData);
        } catch (error) {
            console.error('Error al obtener favoritos:', error);
        }
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
                                <Button variant="contained" color="primary">
                                    Postular
                                </Button>
                                <IconButton aria-label="favorito">
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
        </Box>
    );
};

export default Favoritos;
