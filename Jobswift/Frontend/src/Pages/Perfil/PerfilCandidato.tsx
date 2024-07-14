import React, { useState } from 'react';
import { Grid, TextField, Typography, Paper, Button, IconButton, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const PerfilCandidato = () => {
    // Datos del candidato (simulación)
    const candidato = {
        IdCandidato: 1,
        NombreCompleto: "Juan Perez",
        Apellidos: "Perez Lopez",
        Email: "juan.perez@example.com",
        Contrasena: "password123",
        CodigoP: "12345",
        Ciudad: "Ciudad de México",
        NTelefonico: "1234567890",
        Token: "sometoken123",
        FotoPerfil: "https://img.freepik.com/foto-gratis/worldface-hombre-espanol-fondo-blanco_53876-139733.jpg" // Ruta a la foto de perfil del candidato
    };

    const [menuOpen, setMenuOpen] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handlePasswordChange = () => {
        // Aquí implementarías la lógica para enviar los datos al backend
        // En lugar de imprimir en consola, enviarías una solicitud HTTP (POST o PUT) al endpoint correspondiente para actualizar la contraseña del usuario.
        // Ejemplo:
        // fetch('http://tu-backend.com/api/actualizar-contrasena', {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         // Incluir cualquier token de autenticación si es necesario
        //     },
        //     body: JSON.stringify({
        //         oldPassword: oldPassword,
        //         newPassword: newPassword,
        //         confirmPassword: confirmPassword
        //     })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     // Manejar la respuesta del backend según sea necesario
        //     console.log('Contraseña actualizada correctamente', data);
        // })
        // .catch(error => {
        //     // Manejar errores de la solicitud al backend
        //     console.error('Error al actualizar contraseña', error);
        // });
        console.log("Cambiando contraseña...");
    };

    const showPasswordChangeForm = () => {
        setShowPasswordForm(true);
    };

    return (
        <>
            {/* Header */}
            <Box sx={{ position: 'relative', bgcolor: '#f0f0f0', borderBottom: '10px solid #2196f3', zIndex: 0 }}>
                {/* Franja azul (como hero section) */}
                <Box
                    sx={{
                        height: '200px',  // Aumentamos la altura de la franja azul
                        backgroundColor: '#2196f3',
                        position: 'relative',  // Cambiamos a posición relativa para alinear elementos internamente
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h4" style={{ color: 'white', marginBottom: '10px' }}>
                        Perfil del Candidato
                    </Typography>
                    {/* Banner detrás de la imagen de perfil */}
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
                {/* Imagen de perfil a la izquierda */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '10%',  // Ajustamos la posición izquierda para colocarla al lado
                        transform: 'translate(-50%, -50%)',
                        zIndex: 2,
                        border: '5px solid white',
                        borderRadius: '50%'
                    }}
                >
                    <img
                        src={candidato.FotoPerfil}
                        alt="Foto de perfil"
                        style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            marginLeft: '-75px'  // Ajustamos el margen izquierdo según sea necesario
                        }}
                    />
                </Box>
                {/* Contenido del perfil del candidato */}
                <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: 'auto', marginTop: '20px', marginBottom: '50px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nombre Completo"
                                defaultValue={candidato.NombreCompleto}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Apellidos"
                                defaultValue={candidato.Apellidos}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                defaultValue={candidato.Email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{ marginRight: '10px' }}
                                onClick={showPasswordChangeForm}
                            >
                                Cambiar Contraseña
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Código Postal"
                                defaultValue={candidato.CodigoP}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Ciudad"
                                defaultValue={candidato.Ciudad}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Teléfono"
                                defaultValue={candidato.NTelefonico}
                            />
                        </Grid>
                        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                            Guardar
                        </Button>
                    </Grid>
                </Paper>
                {/* Formulario para cambiar la contraseña */}
                {showPasswordForm && (
                    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '20px', marginBottom: '50px' }}>
                        <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>
                            Cambiar Contraseña
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Antigua Contraseña"
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nueva Contraseña"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Confirmar Contraseña"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handlePasswordChange}
                                    fullWidth
                                >
                                    Guardar Nueva Contraseña
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
            </Box>
        </>
    );
}

export default PerfilCandidato;
