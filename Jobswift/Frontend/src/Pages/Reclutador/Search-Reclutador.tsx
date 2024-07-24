import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

// Interface for decoded token
interface DecodedToken {
  id: number;
  usuario: string;
  exp: number; // Expiry time
}

// Interface for candidate
interface Candidate {
  idCandidato: number;
  nombreCompleto: string;
  apellidos: string;
  email: string;
  telefono: string;
  puesto: string;
}

// Interface for candidate profile
interface CandidateProfile {
  idPerfilCandidato: number;
  fotoCandidato: string;
  experiencia: string;
  formacion: string;
  idiomas: string;
  habilidades: string;
  curriculumPerfil: string;
  fk_Candidato: number;
}

// Interface for server response
interface CandidateResponse {
  success: boolean;
  message: string | null;
  result: Candidate[];
}

// Interface for profile response
interface CandidateProfileResponse {
  success: boolean;
  message: string | null;
  result: CandidateProfile;
}

// Get access token from localStorage
const getAccessToken = (): string | null => {
  const tokenData = localStorage.getItem('accessToken');
  if (tokenData) {
    const { accessToken } = JSON.parse(tokenData);
    return accessToken;
  }
  return null;
};

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode<DecodedToken>(accessToken);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.error('Token has expired');
        return;
      }
      fetchCandidates(accessToken);
    } else {
      console.error('Token not found');
    }
  }, [accessToken]);

  const fetchCandidates = async (token: string) => {
    try {
      const response = await axios.get<CandidateResponse>('https://localhost:7151/Candidato', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setCandidates(response.data.result);
      } else {
        setCandidates([]);
        console.error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching candidates:', error.message);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
      } else {
        console.error('Unexpected error:', error);
      }
      setCandidates([]);
    }
  };

  const fetchCandidateProfile = async (candidateId: number) => {
    if (!candidateId) {
      console.error('candidateId is undefined');
      return;
    }

    console.log(`Fetching profile for candidateId: ${candidateId}`);

    try {
      const response = await axios.get<CandidateProfileResponse>(`https://localhost:7151/PerfilCandidato/${candidateId}`);

      console.log('API Response:', response.data);  // Agregar registro de la respuesta completa

      if (response.data.success) {
        setCandidateProfile(response.data.result);
        console.log('Fetched profile:', response.data.result);  // Registrar el perfil obtenido
      } else {
        setCandidateProfile(null);
        console.error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching candidate profile:', error.message);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
      } else {
        console.error('Unexpected error:', error);
      }
      setCandidateProfile(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCandidateClick = (candidate: Candidate) => {
    if (!candidate.idCandidato) {
      console.error('Candidate ID is undefined:', candidate);
      return;
    }

    setSelectedCandidate(candidate);
    fetchCandidateProfile(candidate.idCandidato).then(() => {
      setOpenDialog(true);
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCandidateProfile(null);
  };

  const filteredCandidates = candidates.filter(candidate =>
    (candidate.nombreCompleto && candidate.nombreCompleto.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (candidate.apellidos && candidate.apellidos.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (candidate.email && candidate.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (candidate.puesto && candidate.puesto.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Candidate Search</Typography>
      <TextField
        label="Search Candidates"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
      />
      <Grid container spacing={4} style={{ marginTop: '20px' }}>
        {filteredCandidates.map(candidate => (
          <Grid item xs={12} sm={6} md={4} key={candidate.idCandidato}>
            <Card onClick={() => handleCandidateClick(candidate)} style={{ cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h5">{candidate.nombreCompleto} {candidate.apellidos}</Typography>
                <Typography color="textSecondary">{candidate.puesto}</Typography>
                <Typography>{candidate.email}</Typography>
                <Typography>{candidate.telefono}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Candidate Profile</DialogTitle>
        <DialogContent>
          {candidateProfile ? (
            <Box display="flex" flexDirection="column" alignItems="center">
              <img src={candidateProfile.fotoCandidato} alt="Foto del Candidato" style={{ width: '150px', height: '150px', marginBottom: '20px' }} />
              <Typography variant="h6"><strong>ID:</strong> {candidateProfile.idPerfilCandidato}</Typography>
              <Typography variant="h6"><strong>Nombre Completo:</strong> {selectedCandidate?.nombreCompleto} {selectedCandidate?.apellidos}</Typography>
              <Typography variant="h6"><strong>Experiencia:</strong> {candidateProfile.experiencia}</Typography>
              <Typography variant="h6"><strong>Formación:</strong> {candidateProfile.formacion}</Typography>
              <Typography variant="h6"><strong>Idiomas:</strong> {candidateProfile.idiomas}</Typography>
              <Typography variant="h6"><strong>Habilidades:</strong> {candidateProfile.habilidades}</Typography>
              <Typography variant="h6"><strong>Curriculum:</strong> <a href={candidateProfile.curriculumPerfil} target="_blank" rel="noopener noreferrer">Ver CV</a></Typography>
            </Box>
          ) : (
            <Typography variant="body1">Cargando...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CandidateSearch;
