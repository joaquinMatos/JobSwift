import React, { useState, useEffect } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import axios from 'axios';

interface Favorito {
    idFavoritos: number;
    fk_IdCandidato: number;
    fk_IdOfertaTrabajo: number;
}

const Favoritos = () => {
    const [favoritos, setFavoritos] = useState<Favorito[]>([]);

    useEffect(() => {
        fetchFavoritos(); // Carga los favoritos al cargar la página
    }, []);

    const fetchFavoritos = async () => {
        try {
            const response = await axios.get<any>('https://localhost:7151/favorito'); // Cambia la URL según tu API
            const favoritosData = response.data.result;
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
                                <TableCell>ID Favoritos</TableCell>
                                <TableCell>FK ID Candidato</TableCell>
                                <TableCell>FK ID Oferta Trabajo</TableCell>
                                <TableCell>Acciones</TableCell> {/* Nueva columna para acciones */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {favoritos.map((favorito) => (
                                <TableRow key={favorito.idFavoritos}>
                                    <TableCell>{favorito.idFavoritos}</TableCell>
                                    <TableCell>{favorito.fk_IdCandidato}</TableCell>
                                    <TableCell>{favorito.fk_IdOfertaTrabajo}</TableCell>
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
