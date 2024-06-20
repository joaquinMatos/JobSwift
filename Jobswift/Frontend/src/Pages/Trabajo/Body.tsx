import React from 'react';
import { Box, Drawer, AppBar, Toolbar, Typography, InputBase, IconButton, Grid, Paper, Button, Avatar, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { Search, Menu as MenuIcon, Favorite, Person, Work, Settings, Logout, LocationOn, AccountCircle } from '@mui/icons-material';

const Body = () => {
    return (
        <Box  sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem>
                            <Avatar alt="User" src="/path/to/user/avatar.jpg" />
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="body1">Osmar Casillas</Typography>
                                <Typography variant="body2" color="textSecondary">osmarcasillas@gmail.com</Typography>
                            </Box>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Work /></ListItemIcon>
                            <ListItemText primary="Ofertas" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Person /></ListItemIcon>
                            <ListItemText primary="Perfil" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Favorite /></ListItemIcon>
                            <ListItemText primary="Favoritos" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Settings /></ListItemIcon>
                            <ListItemText primary="Configuración" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Logout /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, bgcolor: '#00AAFF', p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <IconButton>
                        <AccountCircle sx={{ fontSize: 40 }} />
                    </IconButton>
                    <TextField
                        variant="outlined"
                        placeholder="Cargo de empleo"
                        sx={{
                            flexGrow: 1,
                            mx: 2,
                            backgroundColor: 'white',
                            borderRadius: '25px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                    />
                    <IconButton>
                        <LocationOn sx={{ fontSize: 40 }} />
                    </IconButton>
                    <TextField
                        variant="outlined"
                        placeholder="Lugar de Residencia"
                        sx={{
                            flexGrow: 1,
                            mx: 2,
                            backgroundColor: 'white',
                            borderRadius: '25px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                    />
                    <Button variant="contained" sx={{ ml: 2, backgroundColor: '#555', borderRadius: '25px' }}>
                        Buscar
                    </Button>
                </Box>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, height: '100%' }}>
                            <Typography variant="h6">Chófer de máquinas transportadoras</Typography>
                            <Typography variant="subtitle1">Transporte y Logística Futura S.A.</Typography>
                            <Typography variant="body2">Lunes a viernes: 7:00 AM - 4:00 PM</Typography>
                            <Typography variant="body2">Cancún, Benito Juárez</Typography>
                            <Typography variant="body2" sx={{ mt: 2 }}>$1200 Quincenal</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Chófer de máquinas transportadoras</Typography>
                            <Typography variant="subtitle1">Transporte y Logística Futura S.A.</Typography>
                            <Typography variant="body2">Lunes a viernes: 7:00 AM - 4:00 PM</Typography>
                            <Typography variant="body2">Sábados: 8:00 AM - 1:00 PM</Typography>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                En Transporte y Logística Futura S.A., nos encontramos en la búsqueda de un Chófer de Máquinas Transportadoras. El candidato ideal será responsable de operar y manejar diversas máquinas de transporte, asegurando la entrega oportuna y segura de mercancías en diferentes ubicaciones.
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                Postularme
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Body;
