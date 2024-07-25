import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Container,
  TextField,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  styled,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

interface DecodedToken {
  id: number;
  usuario: string;
}

interface Candidato {
  nombreCompleto: string;
  apellidos: string;
  email: string;
  contrasena: string;
  codigoP: string;
  ciudad: string;
  nTelefonico: string;
  token: string;
}

export function GetUsernameFromToken(): string | null {
  const tokenData = localStorage.getItem('accessToken');
  if (tokenData) {
    const { accessToken } = JSON.parse(tokenData);
    const decodedToken = jwtDecode<DecodedToken>(accessToken);
    return decodedToken.usuario;
  }
  return null;
}

// Styled component for the card with hover effect
const ProfileCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const ActualizarCandidato = () => {
  const [candidato, setCandidato] = useState<Candidato>({
    nombreCompleto: '',
    apellidos: '',
    email: '',
    contrasena: '',
    codigoP: '',
    ciudad: '',
    nTelefonico: '',
    token: '',
  });

  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    const tokenData = localStorage.getItem('accessToken');
    if (tokenData) {
      const { accessToken } = JSON.parse(tokenData);
      const decodedToken = jwtDecode<DecodedToken>(accessToken);
      setId(decodedToken.id);
      fetchCandidato(decodedToken.id);
    }
  }, []);

  const fetchCandidato = async (id: number) => {
    try {
      const response = await axios.get(`https://localhost:7151/Candidato/${id}`);
      setCandidato(response.data);
    } catch (error) {
      console.error('Error fetching candidato:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCandidato((prevCandidato) => ({
      ...prevCandidato,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id !== null) {
      try {
        await axios.put(`https://localhost:7151/Candidato/${id}`, candidato);
        alert('Candidato actualizado con éxito');
      } catch (error) {
        console.error('Error updating candidato:', error);
      }
    }
  };

  return (
    <Box sx={{minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 3 }}>
      <Container>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontFamily: 'Arial', fontWeight: 'bold', marginTop: '20px' }}>
          Configuración
        </Typography>
        <ProfileCard>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 1000, mx: 'auto',  }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Nombre Completo"
                    name="nombreCompleto"
                    value={candidato.nombreCompleto}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Apellidos"
                    name="apellidos"
                    value={candidato.apellidos}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={candidato.email}
                    onChange={handleChange}
                    type="email"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Contraseña"
                    name="contrasena"
                    value={candidato.contrasena}
                    onChange={handleChange}
                    type="password"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Código Postal"
                    name="codigoP"
                    value={candidato.codigoP}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Ciudad"
                    name="ciudad"
                    value={candidato.ciudad}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCityIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Número Telefónico"
                    name="nTelefonico"
                    value={candidato.nTelefonico}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Token"
                    name="token"
                    value={candidato.token}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button variant="contained" color="primary" type="submit" sx={{ mx: 1 }}>Actualizar</Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </ProfileCard>
      </Container>
    </Box>
  );
};

export default ActualizarCandidato;
