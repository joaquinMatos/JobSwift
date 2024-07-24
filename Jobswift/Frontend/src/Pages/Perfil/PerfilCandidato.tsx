import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Box, Button, Card, Grid, Typography, Avatar, CircularProgress, IconButton, TextField, Paper, styled } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AttachFileIcon from '@mui/icons-material/AttachFile';

// Interface for PerfilCandidato
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

// Interface for DecodedToken
interface DecodedToken {
  id: number;
  usuario: string;
}

// Get user ID from token
const GetUserIdFromToken = (): number | null => {
  const tokenData = localStorage.getItem('accessToken');
  if (tokenData) {
    const { accessToken } = JSON.parse(tokenData);
    const decodedToken = jwtDecode<DecodedToken>(accessToken);
    return decodedToken.id;
  }
  return null;
};

// Styled component for the card with hover effect
const ProfileCardStyled = styled(Card)(({ theme }) => ({
  padding: '20px',
  borderRadius: '12px',
  boxShadow: theme.shadows[2],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const ProfileCard = () => {
  const [data, setData] = useState<PerfilCandidato | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const userId = GetUserIdFromToken();

  useEffect(() => {
    if (userId) {
      fetchPerfilCandidato(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (selectedImage) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(data?.fotoCandidato ? `https://localhost:7151/${data.fotoCandidato}` : null);
    }
  }, [selectedImage, data?.fotoCandidato]);

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
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else if (file.type.startsWith('image/')) {
        setSelectedImage(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && data) {
      setSubmitting(true);
      try {
        const formData = new FormData();
        formData.append('experiencia', data.experiencia);
        formData.append('formacion', data.formacion);
        formData.append('idiomas', data.idiomas);
        formData.append('habilidades', data.habilidades);
        formData.append('fk_Candidato', userId.toString());

        if (selectedImage) {
          formData.append('fotoCandidato', selectedImage);
        } else {
          formData.append('fotoCandidato', data.fotoCandidato || '');
        }

        if (selectedFile) {
          formData.append('curriculumPerfil', selectedFile);
        } else {
          formData.append('curriculumPerfil', data.curriculumPerfil || '');
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
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><Typography color="error">{error}</Typography></Box>;
  }

  if (!data) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><Typography>No data available</Typography></Box>;
  }

  return (
    <Box sx={{ bgcolor: '#E3F2FD', minHeight: '100vh', padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <ProfileCardStyled>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  alt="Profile Picture"
                  src={imagePreview || undefined}
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
                      <Typography variant="body2" color="textSecondary">{data.idiomas}</Typography>
                      <Typography variant="body2" color="textSecondary">{data.habilidades}</Typography>
                    </>
                  )}
                </Box>
                <IconButton color="primary" onClick={() => setEditing(!editing)}>
                  <EditIcon />
                </IconButton>
              </Box>
              {editing && (
                <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button variant="contained" component="span" fullWidth startIcon={<AttachFileIcon />}>
                      Actualiza tu imagen
                    </Button>
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="contained" component="span" fullWidth startIcon={<AttachFileIcon />}>
                      Actualiza tu CV
                    </Button>
                  </label>
                  <Button variant="contained" color="primary" type="submit" fullWidth disabled={submitting} startIcon={submitting ? <CircularProgress size={24} /> : null}>
                    {submitting ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
                </Box>
              )}
            </ProfileCardStyled>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: '20px', borderRadius: '12px' }}>
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>Documentos adjuntos</Typography>
              {data.curriculumPerfil && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 2 }}>CV Actual</Typography>
                  <Button href={`https://localhost:7151/${data.curriculumPerfil}`} target="_blank" variant="contained">
                    Descargar CV
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProfileCard;
