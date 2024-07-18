import React from 'react';
import { Box, Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Opcion = () => {
    return (
        <Box sx={{ bgcolor: '#FFFFFF', padding: '50px 20px' }}>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                        <img
                            src="img/yo.jpg" // Cambia esto a la ruta de tu imagen
                            alt="Mujer sonriente"
                            style={{
                                width: '70%',
                                borderRadius: '20px',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '-20px',
                                left: { xs: 'calc(50% - 150px)', md: '50px' },
                                width: '300px',
                                height: '300px',
                                bgcolor: 'pink',
                                borderRadius: '50%',
                                zIndex: 0,
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Typography variant="h4" gutterBottom>
                        Si buscas trabajo ¡JobSwift es tu mejor aliado!
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Muchas de ofertas de empleo están esperándote
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Te ayudamos a encontrar un empleo mejor
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Haz que tu currículum sea visible para miles de empresas
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <CheckCircleIcon style={{ color: 'green' }} />
                            </ListItemIcon>
                            <ListItemText primary="Registro gratuito. Encuentra tu próximo trabajo hoy." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckCircleIcon style={{ color: 'green' }} />
                            </ListItemIcon>
                            <ListItemText primary="Ofertas cada día. Empleos que se ajustan a tu perfil." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckCircleIcon style={{ color: 'green' }} />
                            </ListItemIcon>
                            <ListItemText primary="Alertas personalizadas. Tú crea alertas de empleo y nosotros te avisaremos." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckCircleIcon style={{ color: 'green' }} />
                            </ListItemIcon>
                            <ListItemText primary="Completa tu perfil. Muéstrate profesional y ganarás visibilidad." />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Opcion;
