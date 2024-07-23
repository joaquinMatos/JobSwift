import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Box, Button, Card, Grid, Typography, Avatar, CircularProgress, IconButton, TextField, Paper } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EditIcon from '@mui/icons-material/Edit';

interface PerfilCandidato {
  idPerfilCandidato: number;
  fotoCandidato: string;
  experiencia: string;
  formacion: string;
  idiomas: string;
  habilidades: string;
  curriculumPerfil: string;
  fk_Candidato: number;
}

interface DecodedToken {
  id: number;
  usuario: string;
}

const GetUserIdFromToken = (): number | null => {
  const tokenData = localStorage.getItem('accessToken');
  if (tokenData) {
    const { accessToken } = JSON.parse(tokenData);
    const decodedToken = jwtDecode<DecodedToken>(accessToken);
    return decodedToken.id;
  }
  return null;
};

const ProfileCard = () => {
  const [data, setData] = useState<PerfilCandidato | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userId = GetUserIdFromToken();

  useEffect(() => {
    if (userId) {
      fetchPerfilCandidato(userId);
    }
  }, [userId]);

  const fetchPerfilCandidato = async (id: number) => {
    try {
      const response = await axios.get(`https://localhost:7151/PerfilCandidato/${id}`);
      if (response.data) {
        setData(response.data);
      } else {
        setError('No data available');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && data) {
      try {
        const formData = new FormData();
        formData.append('experiencia', data.experiencia);
        formData.append('formacion', data.formacion);
        formData.append('idiomas', data.idiomas);
        formData.append('habilidades', data.habilidades);
        if (selectedFile) {
          formData.append('file', selectedFile);
        }

        await axios.put(`https://localhost:7151/PerfilCandidato/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        alert('Perfil actualizado con éxito');
        setEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
        setError('Error updating profile');
      }
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><Typography>{error}</Typography></Box>;
  }

  if (!data) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><Typography>No data available</Typography></Box>;
  }

  return (
    <Box sx={{ bgcolor: '#E3F2FD', minHeight: '100vh', padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card sx={{ padding: '20px', borderRadius: '12px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  alt="Profile Picture"
                  src={data.fotoCandidato}
                  sx={{ width: 80, height: 80, marginRight: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  {editing ? (
                    <>
                      <TextField
                        label="Experiencia"
                        name="experiencia"
                        value={data.experiencia}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Formación"
                        name="formacion"
                        value={data.formacion}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Idiomas"
                        name="idiomas"
                        value={data.idiomas}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Habilidades"
                        name="habilidades"
                        value={data.habilidades}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                    </>
                  ) : (
                    <>
                      <Typography variant="h6" component="div">{data.experiencia}</Typography>
                      <Typography variant="subtitle1" color="textSecondary">{data.formacion}</Typography>
                    </>
                  )}
                </Box>
                <IconButton color="primary" onClick={() => setEditing(!editing)}>
                  <EditIcon />
                </IconButton>
              </Box>
              {editing && (
                <>
                  <input type="file" onChange={handleFileChange} />
                  <Button variant="contained" color="primary" type="submit">Guardar Cambios</Button>
                </>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: '20px', borderRadius: '12px' }}>
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>Documentos adjuntos</Typography>
              {data.curriculumPerfil && (
                <Button
                  variant="contained"
                  startIcon={<UploadFileIcon />}
                  sx={{ bgcolor: '#007AFF', color: '#FFFFFF' }}
                  href={data.curriculumPerfil}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Curriculum
                </Button>
              )}
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProfileCard;
