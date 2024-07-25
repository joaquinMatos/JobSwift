import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import SkillIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionIcon from '@mui/icons-material/Description';
import { styled } from '@mui/system';

// Interface for decoded token
interface DecodedToken {
  id: number;
  usuario: string;
  exp: number; // Expiry time
}

// Interface for candidate
interface Candidate {
  idCandidato: number;
  nombreCompleto?: string;
  apellidos?: string;
  email?: string;
  telefono?: string;
  puesto?: string;
  experiencia?: string;
  habilidades?: string;
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

// Styled component for the job card
const JobCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

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
  const [experienceFilter, setExperienceFilter] = useState('');
  const [skillsFilter, setSkillsFilter] = useState('');
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
      const response = await axios.get(`https://localhost:7151/PerfilCandidato/${candidateId}`);

      console.log('API Response:', response.data);  // Agregar registro de la respuesta completa

      // Directly setting the response data to state as it's already the candidate profile
      setCandidateProfile(response.data);
      console.log('Fetched profile:', response.data);  // Registrar el perfil obtenido

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

  const handleExperienceFilterChange = (e: SelectChangeEvent<string>) => {
    setExperienceFilter(e.target.value as string);
  };

  const handleSkillsFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillsFilter(e.target.value);
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

  const filteredCandidates = candidates.filter(candidate => {
    const matchName = (candidate.nombreCompleto?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.apellidos?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchExperience = experienceFilter === '' || candidate.experiencia === experienceFilter;
    const matchSkills = skillsFilter === '' || candidate.habilidades?.toLowerCase().includes(skillsFilter.toLowerCase());
    return matchName && matchExperience && matchSkills;
  });

  return (
    <Box sx={{ bgcolor: '#E3F2FD', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontFamily: 'Arial', fontWeight: 'bold', marginTop: '20px' }}>
          Busca tus candidatos
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search Candidates"
              variant="outlined"
              fullWidth
              margin="normal"
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Experiencia</InputLabel>
              <Select
                value={experienceFilter}
                onChange={handleExperienceFilterChange}
                label="Experiencia"
                startAdornment={
                  <InputAdornment position="start">
                    <WorkIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="1 año">1 año</MenuItem>
                <MenuItem value="2 años">2 años</MenuItem>
                <MenuItem value="3 años">3 años</MenuItem>
                <MenuItem value="4 años">4 años</MenuItem>
                <MenuItem value="5 años">5 años</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Habilidades"
              variant="outlined"
              fullWidth
              margin="normal"
              value={skillsFilter}
              onChange={handleSkillsFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SkillIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} style={{ marginTop: '20px' }}>
          {filteredCandidates.map(candidate => (
            <Grid item xs={12} sm={6} md={4} key={candidate.idCandidato}>
              <JobCard elevation={3} onClick={() => handleCandidateClick(candidate)}>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 2 }}>{candidate.nombreCompleto} {candidate.apellidos}</Typography>
                  <Typography color="textSecondary" sx={{ mb: 2 }}>{candidate.puesto}</Typography>
                  <Typography>{candidate.email}</Typography>
                </CardContent>
              </JobCard>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>Candidate Profile</DialogTitle>
          <DialogContent>
            {candidateProfile ? (
              <Box display="flex" flexDirection="column" alignItems="flex-start" textAlign="left">
                <img src={`https://localhost:7151/${candidateProfile.fotoCandidato}`} alt="Foto del Candidato" style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '20px' }} />
                <Typography variant="h6" sx={{ mb: 2 }}><PersonIcon /><strong> Nombre Completo:</strong> {selectedCandidate?.nombreCompleto} {selectedCandidate?.apellidos}</Typography>
                <Typography variant="h6" sx={{ mb: 2 }}><WorkIcon /><strong> Experiencia:</strong> {candidateProfile.experiencia}</Typography>
                <Typography variant="h6" sx={{ mb: 2 }}><SchoolIcon /><strong> Formación:</strong> {candidateProfile.formacion}</Typography>
                <Typography variant="h6" sx={{ mb: 2 }}><LanguageIcon /><strong> Idiomas:</strong> {candidateProfile.idiomas}</Typography>
                <Typography variant="h6" sx={{ mb: 2 }}><SkillIcon /><strong> Habilidades:</strong> {candidateProfile.habilidades}</Typography>
                <Typography variant="h6" sx={{ mb: 2 }}><DescriptionIcon /><strong> Curriculum:</strong> <a href={`https://localhost:7151/${candidateProfile.curriculumPerfil}`} target="_blank" rel="noopener noreferrer">Ver CV</a></Typography>
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
    </Box>
  );
};

export default CandidateSearch;
