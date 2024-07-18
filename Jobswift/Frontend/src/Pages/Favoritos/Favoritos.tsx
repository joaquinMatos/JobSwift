import React, { useState, useEffect } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import axios from 'axios';

interface Favorito {
    tituloOferta: string;
    ubicacionOferta: string;
    urgencia: boolean;
    fechaPublicacion: string;
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
        <>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '20px' }}>
                Favoritos
            </Typography>
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: 'auto', marginTop: '20px', marginBottom: '50px' }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Título de la Oferta</TableCell>
                                <TableCell>Ubicación</TableCell>
                                <TableCell>Urgente</TableCell>
                                <TableCell>Fecha de Publicación</TableCell>
                                <TableCell>Acciones</TableCell> {/* Nueva columna para acciones */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {favoritos.map((favorito, index) => (
                                <TableRow key={index}>
                                    <TableCell>{favorito.tituloOferta}</TableCell>
                                    <TableCell>{favorito.ubicacionOferta}</TableCell>
                                    <TableCell>{favorito.urgencia ? "Sí" : "No"}</TableCell>
                                    <TableCell>{new Date(favorito.fechaPublicacion).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="favorito">
                                            <FavoriteIcon color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default Favoritos;
