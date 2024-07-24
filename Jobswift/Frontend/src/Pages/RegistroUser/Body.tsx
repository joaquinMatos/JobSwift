import React, { useState } from 'react';
import axios from 'axios';
import { Box, Grid, TextField, Button, Typography, Alert, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Circulos from './Circulos';
import { useNavigate } from 'react-router-dom';

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

  const [formErrors, setFormErrors] = useState({
    nombreCompleto: '',
    apellidos: '',
    email: '',
    contrasena: '',
    codigoP: '',
    ciudad: '',
    nTelefonico: ''
  });

  const [emailError, setEmailError] = useState('');
  const [candidateData, setCandidateData] = useState<CandidateData | null>(null);

  const navigate = useNavigate(); // Hook para la navegación

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
    // Clear error message for the specific field when its value changes
    setFormErrors({ ...formErrors, [name]: '' });
    if (name === 'email') {
      setEmailError(''); // Reset email error when the user changes the email field
      setCandidateData(null); // Reset candidate data when the user changes the email field
    }
  };

  const validateForm = () => {
    const errors: any = {};
    if (!formValues.nombreCompleto) errors.nombreCompleto = 'El nombre completo es obligatorio.';
    if (!formValues.apellidos) errors.apellidos = 'Los apellidos son obligatorios.';
    if (!formValues.email) errors.email = 'El email es obligatorio.';
    if (!formValues.contrasena) errors.contrasena = 'La contraseña es obligatoria.';
    if (!formValues.codigoP) errors.codigoP = 'El código postal es obligatorio.';
    if (!formValues.ciudad) errors.ciudad = 'La ciudad es obligatoria.';
    if (!formValues.nTelefonico) errors.nTelefonico = 'El número telefónico es obligatorio.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      return;
    }

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
        height: '100%', 
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
        <IconButton
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            color: 'black',
          }}
          onClick={() => navigate('/')}
        >
          <ArrowBackIcon />
        </IconButton>
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
                    placeholder="Nombre completo"
                    name="nombreCompleto"
                    value={formValues.nombreCompleto}
                    onChange={handleChange}
                    InputProps={{ style: { backgroundColor: 'white' } }}
                    error={!!formErrors.nombreCompleto}
                    helperText={formErrors.nombreCompleto}
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
                    error={!!formErrors.apellidos}
                    helperText={formErrors.apellidos}
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
                    error={!!formErrors.email || !!emailError}
                    helperText={formErrors.email || emailError}
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
                    error={!!formErrors.contrasena}
                    helperText={formErrors.contrasena}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Código Postal"
                    name="codigoP"
                    value={formValues.codigoP}
                    onChange={handleChange}
                    InputProps={{ style: { backgroundColor: 'white' } }}
                    error={!!formErrors.codigoP}
                    helperText={formErrors.codigoP}
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
                    error={!!formErrors.ciudad}
                    helperText={formErrors.ciudad}
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
                    error={!!formErrors.nTelefonico}
                    helperText={formErrors.nTelefonico}
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
              {(emailError || Object.values(formErrors).some(error => error)) && (
                <Box mt={2}>
                  <Alert severity="error">
                    {emailError || 'Por favor, complete todos los campos obligatorios.'}
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
                  ¡Únete a nosotros y encuentra la mejor oferta de empleo!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Body;
