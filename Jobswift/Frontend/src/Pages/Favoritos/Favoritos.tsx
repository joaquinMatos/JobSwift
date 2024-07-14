import React, { useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Box } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';


type UsuarioType = 'reclutador' | 'candidato';

interface Candidato {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
    favorito: boolean;
}

interface Puesto {
    id: number;
    titulo: string;
    empresa: string;
    ubicacion: string;
    favorito: boolean;
}

const Favoritos = ({ usuario }: { usuario: UsuarioType }) => {
    const [candidatosFavoritos, setCandidatosFavoritos] = useState<Candidato[]>([
        { id: 1, nombre: 'Juan Perez', email: 'juan.perez@example.com', telefono: '1234567890', favorito: true },
        { id: 2, nombre: 'Ana Garcia', email: 'ana.garcia@example.com', telefono: '0987654321', favorito: false },
    ]);

    const [puestosFavoritos, setPuestosFavoritos] = useState<Puesto[]>([
        { id: 1, titulo: 'Desarrollador Frontend', empresa: 'Tech Solutions', ubicacion: 'Ciudad de México', favorito: true },
        { id: 2, titulo: 'Ingeniero de Software', empresa: 'Innovatech', ubicacion: 'Guadalajara', favorito: false },
    ]);

    

    const handleToggleFavorito = (id: number, type: 'candidato' | 'puesto') => {
        if (type === 'candidato') {
            const updatedCandidatos = candidatosFavoritos.map((candidato) =>
                candidato.id === id ? { ...candidato, favorito: !candidato.favorito } : candidato
            );
            setCandidatosFavoritos(updatedCandidatos);
        } else if (type === 'puesto') {
            const updatedPuestos = puestosFavoritos.map((puesto) =>
                puesto.id === id ? { ...puesto, favorito: !puesto.favorito } : puesto
            );
            setPuestosFavoritos(updatedPuestos);
        }
    };



    return (
        <>
            <Box sx={{ position: 'relative', bgcolor: '#f0f0f0', borderBottom: '10px solid #2196f3', zIndex: 0 }}>
                <Box
                    sx={{
                        height: '150px',
                        backgroundColor: '#2196f3',
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h4" style={{ color: 'white', marginBottom: '10px' }}>
                        Favoritos
                    </Typography>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0), rgba(0,0,0,0.3))`,
                            zIndex: -1
                        }}
                    />
                </Box>
            </Box>
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: 'auto', marginTop: '20px', marginBottom: '50px' }}>
                {usuario === 'reclutador' && (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Candidatos Favoritos
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Teléfono</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {candidatosFavoritos.map((candidato) => (
                                        <TableRow key={candidato.id}>
                                            <TableCell>{candidato.nombre}</TableCell>
                                            <TableCell>{candidato.email}</TableCell>
                                            <TableCell>{candidato.telefono}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleToggleFavorito(candidato.id, 'candidato')}>
                                                    {candidato.favorito ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
                {usuario === 'candidato' && (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Puestos Favoritos
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Título</TableCell>
                                        <TableCell>Empresa</TableCell>
                                        <TableCell>Ubicación</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {puestosFavoritos.map((puesto) => (
                                        <TableRow key={puesto.id}>
                                            <TableCell>{puesto.titulo}</TableCell>
                                            <TableCell>{puesto.empresa}</TableCell>
                                            <TableCell>{puesto.ubicacion}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleToggleFavorito(puesto.id, 'puesto')}>
                                                    {puesto.favorito ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Paper>
        </>
    );
}

export default Favoritos;
