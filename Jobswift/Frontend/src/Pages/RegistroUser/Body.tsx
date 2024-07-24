import React, { useState } from 'react';
import axios from 'axios';
import { Box, Grid, TextField, Button, Typography, Alert } from '@mui/material';
import Circulos from './Circulos';

// Define la interfaz para los datos del candidato
interface CandidateData {
  idCandidato: number;
  nombreCompleto: string;
  apellidos: string;
  email: string;
  contrasena: string;
  codigoP: string;
  ciudad: string;
  nTelefonico: string;
  token: string;
}

const Body = () => {
  const [formValues, setFormValues] = useState({
    nombreCompleto: '',
    apellidos: '',
    email: '',
    contrasena: '',
    codigoP: '',
    ciudad: '',
    nTelefonico: '',
    token: ''
  });

  const [emailError, setEmailError] = useState('');
  const [candidateData, setCandidateData] = useState<CandidateData | null>(null);

  const handleChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      setEmailError(''); // Reset email error when the user changes the email field
      setCandidateData(null); // Reset candidate data when the user changes the email field
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Check if email already exists
    try {
      const emailCheckResponse = await axios.get(`https://localhost:7151/Candidato/obtener?email=${formValues.email}`);
      const candidates = emailCheckResponse.data.result;

      const emailExists = candidates.some((candidate: CandidateData) => candidate.email === formValues.email);

      if (emailExists) {
        setEmailError('El correo electrónico ya está registrado.');
        setCandidateData(candidates.find((candidate: CandidateData) => candidate.email === formValues.email) || null);
        return;
      }
    } catch (emailCheckError) {
      console.error('Error checking email:', emailCheckError);
      setEmailError('Error verificando el correo electrónico.');
      return;
    }

    // If email doesn't exist, proceed to register the user
    try {
      const response = await axios.post('https://localhost:7151/Candidato', formValues);
      console.log('Response:', response.data);
      setEmailError(''); // Clear any previous email errors
      setCandidateData(null); // Clear any previous candidate data
      // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error:', error);
      setEmailError('Error registrando el usuario.');
    }
  };

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
          Registra tu perfil
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Nombre y apellidos"
                    name="nombreCompleto"
                    value={formValues.nombreCompleto}
                    onChange={handleChange}
                    InputProps={{ style: { backgroundColor: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Apellidos"
                    name="apellidos"
                    value={formValues.apellidos}
                    onChange={handleChange}
                    InputProps={{ style: { backgroundColor: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="E-mail de acceso"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    InputProps={{ style: { backgroundColor: 'white' } }}
                    error={!!emailError}
                    helperText={emailError}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Contraseña"
                    type="password"
                    name="contrasena"
                    value={formValues.contrasena}
                    onChange={handleChange}
                    InputProps={{ style: { backgroundColor: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Codigo Postal"
                    name="codigoP"
                    value={formValues.codigoP}
                    onChange={handleChange}
                    InputProps={{ style: { backgroundColor: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Ciudad"
                    name="ciudad"
                    value={formValues.ciudad}
                    onChange={handleChange}
                    InputProps={{ style: { backgroundColor: 'white' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Número Telefónico"
                    name="nTelefonico"
                    value={formValues.nTelefonico}
                    onChange={handleChange}
                    InputProps={{ style: { backgroundColor: 'white' } }}
                  />
                </Grid>
              </Grid>
              <Box mt={4} textAlign="center">
                <Button
                  type="submit"
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
              {emailError && (
                <Box mt={2}>
                  <Alert severity="error">{emailError}</Alert>
                </Box>
              )}
              {candidateData && (
                <Box mt={2}>
                  <Alert severity="info">
                    <Typography variant="body1"><strong>ID:</strong> {candidateData.idCandidato}</Typography>
                    <Typography variant="body1"><strong>Nombre Completo:</strong> {candidateData.nombreCompleto}</Typography>
                    <Typography variant="body1"><strong>Apellidos:</strong> {candidateData.apellidos}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {candidateData.email}</Typography>
                    <Typography variant="body1"><strong>Contraseña:</strong> {candidateData.contrasena}</Typography>
                    <Typography variant="body1"><strong>Código Postal:</strong> {candidateData.codigoP}</Typography>
                    <Typography variant="body1"><strong>Ciudad:</strong> {candidateData.ciudad}</Typography>
                    <Typography variant="body1"><strong>Teléfono:</strong> {candidateData.nTelefonico}</Typography>
                    <Typography variant="body1"><strong>Token:</strong> {candidateData.token}</Typography>
                  </Alert>
                </Box>
              )}
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
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'White' }}>
                  ¡Únete a nosotros y encuentra ofertas de forma gratuita!
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  Optimiza el tiempo, recursos en tus procesos de selección y encuentra tu empresa de manera ágil y eficaz.
                </Typography>
                <Box
                  component="img"
                  src="img/24.png" // Cambia esto a la ruta de tu imagen
                  alt="Ilustración"
                  sx={{ width: '100%', maxWidth: '250px', mt: 2 }}
                />
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Body;
