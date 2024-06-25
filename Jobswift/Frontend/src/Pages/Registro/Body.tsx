import React from 'react';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
// Asegúrate de ajustar la ruta según sea necesario
import Circulos from './Circulos';

const Body = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',  // Ocupa el 100% de la altura de la pantalla
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #00BFFF, #00BFFF)',
        p: 4,
        color: 'black',
      }}
    >
      <Circulos />
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,  // Asegúrate de que el z-index sea mayor que el de los círculos
          width: '100%',
          maxWidth: '1200px',
          p: 4,
          borderRadius: 2,

        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
          Registra la Oferta
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}> {/* Aumenta el valor de spacing aquí */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Nombre y apellidos"
                  InputProps={{ style: { backgroundColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Selecciona el sector"
                  InputProps={{ style: { backgroundColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="E-mail de acceso"
                  InputProps={{ style: { backgroundColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Contraseña"
                  type="password"
                  InputProps={{ style: { backgroundColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Nombre Comercial"
                  InputProps={{ style: { backgroundColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Razón social"
                  InputProps={{ style: { backgroundColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="México"
                  InputProps={{ style: { backgroundColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="RFC"
                  InputProps={{ style: { backgroundColor: 'white' } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Código Postal"
                  InputProps={{ style: { backgroundColor: 'white' } }}
                />
              </Grid>
            </Grid>
            <Box mt={4} textAlign="center">
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'black',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'grey',
                  },
                }}
              >
                Únete ahora
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                p: 2,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
                ¡Únete a nosotros y publica tus ofertas de forma gratuita!
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                Optimiza tiempo y recursos en tus procesos de selección y encuentra al candidato idóneo de manera ágil y eficaz.
              </Typography>
              <Box
                component="img"
                src="img/14.png" // Cambia esto a la ruta de tu imagen
                alt="Ilustración"
                sx={{ width: '100%', maxWidth: '250px', mt: 2 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Body;
