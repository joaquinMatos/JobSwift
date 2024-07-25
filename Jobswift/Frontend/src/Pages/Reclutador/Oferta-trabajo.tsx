import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Fab,
  InputAdornment,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from '@mui/icons-material/Work';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExperienceIcon from '@mui/icons-material/School';
import { styled } from '@mui/system';

// Interface for decoded token
interface DecodedToken {
  id: number;
  usuario: string;
}

// Interface for job offer
interface JobOffer {
  idOfertaTrabajo?: number;
  titulo: string;
  urgente: boolean;
  ubicacion: string;
  descripcion: string;
  salario: string;
  jornada: string;
  contrato: string;
  requerimientos: string;
  experiencia: string;
  fecha_publicacion: string;
  fk_IdReclutador: number;
  reclutadores?: any; // Adjust the type if you have more information
}

// Interface for server response
interface JobOfferResponse {
  success: boolean;
  message: string | null;
  result: JobOffer[];
}

// Interface for job application
interface JobApplication {
  idPostulacion: number;
  fk_IdOfertaTrabajo: number;
  status: number;
  email: string;
  nTelefonico: string;
  apellidos: string;
  nombreCompleto: string;
  ciudad: string;
  fechaPublicacion: string;
  experiencia: string;
  contrato: string;
  salario: string;
  titulo: string;
}

// Interface for job applications response
interface JobApplicationsResponse {
  success: boolean;
  message: string | null;
  result: JobApplication[];
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

const JobOffers = () => {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [editingJobOffer, setEditingJobOffer] = useState<JobOffer | null>(null);
  const [viewingApplications, setViewingApplications] = useState<JobOffer | null>(null);
  const [deletingJobOffer, setDeletingJobOffer] = useState<JobOffer | null>(null);
  const userId = GetUserIdFromToken();

  useEffect(() => {
    fetchJobOffers();
  }, []);

  const fetchJobOffers = async () => {
    try {
      const response = await axios.get<JobOfferResponse>(`https://localhost:7151/OfertaTrabajo`);
      if (response.data.success) {
        setJobOffers(response.data.result);
      } else {
        setJobOffers([]);
      }
    } catch (error) {
      console.error('Error fetching job offers:', error);
      setJobOffers([]);
    }
  };

  const handleDeleteJobOffer = async (id: number | undefined) => {
    if (id !== undefined) {
      try {
        await axios.delete(`https://localhost:7151/OfertaTrabajo/${id}`);
        fetchJobOffers(); // Refresh the job offers list
        setDeletingJobOffer(null);
      } catch (error) {
        console.error('Error deleting job offer:', error);
      }
    }
  };

  return (
    <Box sx={{ bgcolor: '#E3F2FD', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container>
        <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: '20px', fontFamily: 'Roboto', fontWeight: 'bold' }}>
          Ofertas de Trabajo
        </Typography>
        <Grid container spacing={4}>
          {jobOffers.map((offer) => (
            <Grid item xs={12} sm={6} md={4} key={offer.idOfertaTrabajo}>
              <JobOfferCard offer={offer} setEditingJobOffer={setEditingJobOffer} setViewingApplications={setViewingApplications} setDeletingJobOffer={setDeletingJobOffer} />
            </Grid>
          ))}
        </Grid>
        {editingJobOffer && (
          <JobOfferForm
            offer={editingJobOffer}
            fetchJobOffers={fetchJobOffers}
            setEditingJobOffer={setEditingJobOffer}
          />
        )}
        {viewingApplications && (
          <JobApplicationsDialog
            offer={viewingApplications}
            setViewingApplications={setViewingApplications}
          />
        )}
        {deletingJobOffer && (
          <DeleteConfirmationDialog
            offer={deletingJobOffer}
            handleDeleteJobOffer={handleDeleteJobOffer}
            setDeletingJobOffer={setDeletingJobOffer}
          />
        )}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => setEditingJobOffer({
            titulo: '',
            urgente: false,
            ubicacion: '',
            descripcion: '',
            salario: '',
            jornada: '',
            contrato: '',
            requerimientos: '',
            experiencia: '',
            fecha_publicacion: new Date().toISOString(),
            fk_IdReclutador: userId || 0 // Provide a default ID
          })}
        >
          <AddIcon />
        </Fab>
      </Container>
    </Box>
  );
};

const JobOfferCard = ({ offer, setEditingJobOffer, setViewingApplications, setDeletingJobOffer }: { offer: JobOffer, setEditingJobOffer: React.Dispatch<React.SetStateAction<JobOffer | null>>, setViewingApplications: React.Dispatch<React.SetStateAction<JobOffer | null>>, setDeletingJobOffer: React.Dispatch<React.SetStateAction<JobOffer | null>> }) => (
  <StyledCard elevation={3}>
    <CardContent>
      <Typography variant="h5" sx={{ mb: 2 }}>{offer.titulo}</Typography>
      <Typography color="textSecondary" sx={{ mb: 2 }}>{offer.descripcion}</Typography>
      <Box display="flex" alignItems="center" mb={1}>
        <LocationOnIcon sx={{ mr: 1 }} />
        <Typography variant="body2">{offer.ubicacion}</Typography>
      </Box>
      <Box display="flex" alignItems="center" mb={1}>
        <MonetizationOnIcon sx={{ mr: 1 }} />
        <Typography variant="body2">{offer.salario}</Typography>
      </Box>
      <Box display="flex" alignItems="center" mb={1}>
        <AccessTimeIcon sx={{ mr: 1 }} />
        <Typography variant="body2">{offer.jornada}</Typography>
      </Box>
      <Box display="flex" alignItems="center" mb={1}>
        <WorkIcon sx={{ mr: 1 }} />
        <Typography variant="body2">{offer.contrato}</Typography>
      </Box>
    </CardContent>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
      <Button onClick={() => setEditingJobOffer(offer)} variant="contained" color="warning" sx={{ mr: 1, minWidth: '40px' }}>
        <EditIcon />
      </Button>
      <Button onClick={() => setViewingApplications(offer)} variant="contained" color="primary" sx={{ mr: 1, minWidth: '40px' }}>
        <PersonIcon />
      </Button>
      <Button onClick={() => setDeletingJobOffer(offer)} variant="contained" color="error" sx={{ minWidth: '40px' }}>
        <DeleteIcon />
      </Button>
    </Box>
  </StyledCard>
);

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const JobOfferForm = ({ offer, fetchJobOffers, setEditingJobOffer }: { offer: JobOffer, fetchJobOffers: () => void, setEditingJobOffer: React.Dispatch<React.SetStateAction<JobOffer | null>> }) => {
  const [formData, setFormData] = useState<JobOffer>(offer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.idOfertaTrabajo) {
        await axios.put(`https://localhost:7151/OfertaTrabajo/${formData.idOfertaTrabajo}`, formData);
      } else {
        await axios.post('https://localhost:7151/OfertaTrabajo', { ...formData, fk_IdReclutador: formData.fk_IdReclutador, fecha_publicacion: new Date().toISOString() });
      }
      fetchJobOffers();
      setEditingJobOffer(null);
    } catch (error) {
      console.error('Error saving job offer:', error);
      // Add additional error handling if needed
    }
  };

  return (
    <Dialog open={true} onClose={() => setEditingJobOffer(null)}>
      <DialogTitle>Editar Oferta de trabajo</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Description"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox checked={formData.urgente} onChange={(e) => setFormData({ ...formData, urgente: e.target.checked })} />}
            label="Urgent"
          />
          <TextField
            label="Location"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Salary"
            name="salario"
            value={formData.salario}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOnIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Working Hours"
            name="jornada"
            value={formData.jornada}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Contract"
            name="contrato"
            value={formData.contrato}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WorkIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Requirements"
            name="requerimientos"
            value={formData.requerimientos}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ListAltIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Experience"
            name="experiencia"
            value={formData.experiencia}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ExperienceIcon />
                </InputAdornment>
              ),
            }}
          />
          <DialogActions>
            <Button onClick={() => setEditingJobOffer(null)} color="error">Cancelar</Button>
            <Button type="submit" color="primary">Guardar</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const JobApplicationsDialog = ({ offer, setViewingApplications }: { offer: JobOffer, setViewingApplications: React.Dispatch<React.SetStateAction<JobOffer | null>> }) => {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    fetchJobApplications();
  }, []);

  const fetchJobApplications = async () => {
    try {
      const response = await axios.get<JobApplicationsResponse>(`https://localhost:7151/Postulacion?ofertaId=${offer.idOfertaTrabajo}`);
      if (response.data.success) {
        setApplications(response.data.result);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.error('Error fetching job applications:', error);
      setApplications([]);
    }
  };

  return (
    <Dialog open={true} onClose={() => setViewingApplications(null)}>
      <DialogTitle>Applications for {offer.titulo}</DialogTitle>
      <DialogContent>
        {applications.length > 0 ? (
          applications.map((application) => (
            <Card key={application.idPostulacion} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{application.nombreCompleto}</Typography>
                <Typography>Email: {application.email}</Typography>
                <Typography>Phone: {application.nTelefonico}</Typography>
                <Typography>Experience: {application.experiencia}</Typography>
                <Typography>Contract: {application.contrato}</Typography>
                <Typography>Salary: {application.salario}</Typography>
                <Typography>City: {application.ciudad}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No applications found.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setViewingApplications(null)} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteConfirmationDialog = ({ offer, handleDeleteJobOffer, setDeletingJobOffer }: { offer: JobOffer, handleDeleteJobOffer: (id: number | undefined) => void, setDeletingJobOffer: React.Dispatch<React.SetStateAction<JobOffer | null>> }) => (
  <Dialog open={true} onClose={() => setDeletingJobOffer(null)}>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <DialogContent>
      <Typography>Are you sure you want to delete the job offer "{offer.titulo}"?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setDeletingJobOffer(null)} color="secondary">Cancel</Button>
      <Button onClick={() => handleDeleteJobOffer(offer.idOfertaTrabajo)} color="error">Delete</Button>
    </DialogActions>
  </Dialog>
);

export default JobOffers;
