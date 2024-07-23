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
} from '@mui/material';

// Interface for decoded token
interface DecodedToken {
  id: number;
  usuario: string;
  exp: number; // Expiry time
}

// Interface for candidate
interface Candidate {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  puesto: string;
}

// Interface for server response
interface CandidateResponse {
  success: boolean;
  message: string | null;
  result: Candidate[];
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
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCandidates = candidates.filter(candidate =>
    (candidate.nombre && candidate.nombre.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (candidate.apellido && candidate.apellido.toLowerCase().includes(searchQuery.toLowerCase())) ||
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
          <Grid item xs={12} sm={6} md={4} key={candidate.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{candidate.nombre} {candidate.apellido}</Typography>
                <Typography color="textSecondary">{candidate.puesto}</Typography>
                <Typography>{candidate.email}</Typography>
                <Typography>{candidate.telefono}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CandidateSearch;
