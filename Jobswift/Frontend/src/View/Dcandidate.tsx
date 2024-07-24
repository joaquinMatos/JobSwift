import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Grid,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    SelectChangeEvent,
    InputAdornment,
    Card,
    CardContent,
    Typography,
    styled,
    Button,
    IconButton,
    CircularProgress,
    Alert,
    Snackbar,
} from '@mui/material';
import {
    Search as SearchIcon,
    LocationOn as LocationOnIcon,
    Work as WorkIcon,
    MonetizationOn as MonetizationOnIcon,
    Description as DescriptionIcon,
    Schedule as ScheduleIcon,
    School as SchoolIcon,
    CalendarToday as CalendarTodayIcon,
    Favorite as FavoriteIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthLogin';
import { useLocation, useNavigate } from 'react-router-dom';

interface Job {
    idOfertaTrabajo: number;
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
}

// Implementación personalizada de debounce
function debounce(func: (...args: any[]) => void, wait: number): (...args: any[]) => void {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Styled component for the job card
const JobCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.02)',
    },
}));

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedJobId = location.state?.jobId || null;

    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [jobs, setJobs] = useState<Job[]>([]);
    const [searchResults, setSearchResults] = useState<Job[]>([]);
    const [locationFilter, setLocationFilter] = useState<string>('');
    const [experienceFilter, setExperienceFilter] = useState<string>('');
    const { getAccessToken } = useAuth();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const fetchedToken = await getAccessToken();
                if (typeof fetchedToken === 'string') {
                    setToken(fetchedToken);
                    fetchJobs(fetchedToken); // Llama a la función para obtener los trabajos cuando se obtiene el token
                } else {
                    console.error('Error: Token no disponible o inválido');
                }
            } catch (error) {
                console.error('Error al obtener el token:', error);
            }
        };

        fetchToken();
    }, [getAccessToken]);

    const fetchJobs = async (token: string) => {
        try {
            const response = await axios.get(`https://localhost:7151/OfertaTrabajo`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setJobs(response.data.result); // Guarda todas las ofertas de trabajo
            setSearchResults(response.data.result); // Inicializa los resultados de búsqueda con todas las ofertas

            if (selectedJobId) {
                const selectedJob = response.data.result.find((job: Job) => job.idOfertaTrabajo === selectedJobId);
                setSelectedJob(selectedJob || null);
            }
        } catch (error) {
            console.error('Error al obtener las ofertas de trabajo:', error);
        }
    };

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            applyFilters(query, locationFilter, experienceFilter);
        }, 300),
        [jobs, locationFilter, experienceFilter]
    );

    const applyFilters = (query: string, location: string, experience: string) => {
        let filteredJobs = jobs;

        if (query.trim() !== '') {
            filteredJobs = filteredJobs.filter(job =>
                job.titulo.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (location.trim() !== '') {
            filteredJobs = filteredJobs.filter(job =>
                job.ubicacion.toLowerCase().includes(location.toLowerCase())
            );
        }

        if (experience.trim() !== '') {
            filteredJobs = filteredJobs.filter(job =>
                job.experiencia.toLowerCase().includes(experience.toLowerCase())
            );
        }

        setSearchResults(filteredJobs);
    };

    // Solo ejecutar búsqueda si hay texto en el campo de búsqueda
    useEffect(() => {
        debouncedSearch(searchText);
    }, [searchText, debouncedSearch]);

    const isSearchDisabled = searchText.trim() === ''; // Determina si el campo de búsqueda está vacío

    const handleJobSelection = (job: Job) => {
        setSelectedJob(job);
        navigate(`/dashboard`, { state: { jobId: job.idOfertaTrabajo } });
    };

    const handleLocationFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocationFilter(e.target.value);
        applyFilters(searchText, e.target.value, experienceFilter);
    };

    const handleExperienceFilterChange = (e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        setExperienceFilter(value);
        applyFilters(searchText, locationFilter, value);
    };

    return (
        <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', backgroundColor:'#E3F2FD' }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TextField
                    placeholder="Cargo o categoría"
                    variant="outlined"
                    margin="normal"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{ ml: 1, flex: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Ubicación"
                    variant="outlined"
                    margin="normal"
                    value={locationFilter}
                    onChange={handleLocationFilterChange}
                    sx={{ ml: 1, flex: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <FormControl variant="outlined" sx={{ ml: 1, flex: 1 }}>
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
            </Box>
            <Box sx={{ display: 'flex', height: '100vh', p: 2, flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} md={4} sx={{ overflowY: 'auto', height: '100%' }}>
                        <Box sx={{ p: 2 }}>
                            {searchResults.map((job) => (
                                <JobCard key={job.idOfertaTrabajo} onClick={() => handleJobSelection(job)} sx={{ cursor: 'pointer' }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            {job.titulo}
                                        </Typography>
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <LocationOnIcon sx={{ mr: 1 }} />
                                            <Typography color="textSecondary">
                                                {job.ubicacion}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <ScheduleIcon sx={{ mr: 1 }} />
                                            <Typography color="textSecondary">
                                                {job.jornada}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" mb={1}>
                                            <MonetizationOnIcon sx={{ mr: 1 }} />
                                            <Typography variant="body2">
                                                {job.salario}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </JobCard>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Descripcion job={selectedJob} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

interface JobDescriptionProps {
    job: Job | null;
}

interface Postulacion {
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

const Descripcion: React.FC<JobDescriptionProps> = ({ job }) => {
    const [postulacionId, setPostulacionId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPostulating, setIsPostulating] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

    useEffect(() => {
        if (job) {
            checkIfPostulated();
        }
    }, [job]);

    const checkIfPostulated = async () => {
        try {
            const response = await axios.get<{ success: boolean; result: Postulacion[] }>(`https://localhost:7151/Postulacion`);

            const postulacion = response.data.result.find(p => p.fk_IdOfertaTrabajo === job?.idOfertaTrabajo);

            if (postulacion) {
                setPostulacionId(postulacion.idPostulacion);
            } else {
                setPostulacionId(null);
            }
        } catch (error) {
            console.error('Error al verificar la postulación:', error);
        }
    };

    const handlePostular = async () => {
        try {
            setIsPostulating(true);

            const fk_Candidato = 1; // Reemplaza con la lógica para obtener el ID del candidato actual
            const status = 0;

            const response = await axios.post(`https://localhost:7151/Postulacion`, {
                status,
                fk_Candidato,
                fk_IdOfertaTrabajo: job!.idOfertaTrabajo,
                fk_IdReclutador: 1
            });

            if (response.status === 201 && response.data.result && response.data.result.length > 0) {
                setPostulacionId(response.data.result[0].idPostulacion);
                setSnackbarMessage('Postulación exitosa');
            } else {
                setSnackbarMessage('Postulacion exitosa');
            }
        } catch (error) {
            console.error('Error al postular:', error);
            setError('Error al procesar la postulación');
        } finally {
            setIsPostulating(false);
        }
    };

    const handleDespostular = async () => {
        try {
            setIsPostulating(true);

            await axios.delete(`https://localhost:7151/Postulacion/${postulacionId}`);

            setPostulacionId(null);
            setSnackbarMessage('Despostulación exitosa');
        } catch (error) {
            console.error('Error al despostular:', error);
            setError('Error al procesar la despostulación');
        } finally {
            setIsPostulating(false);
        }
    };

    const handleAddToFavorites = async () => {
        try {
            const fk_Candidato = 1; // Reemplaza con la lógica para obtener el ID del candidato actual

            const response = await axios.post(`https://localhost:7151/Favorito`, {
                fk_IdCandidato: fk_Candidato,
                fk_IdOfertaTrabajo: job!.idOfertaTrabajo
            });

            if (response.status === 201) {
                setIsFavorite(true);
                setSnackbarMessage('Trabajo añadido a favoritos');
            } else {
                setError('Error al añadir a favoritos');
            }
        } catch (error) {
            console.error('Error al añadir a favoritos:', error);
            setError('Error al añadir a favoritos');
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarMessage(null);
    };

    if (!job) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Selecciona un trabajo para ver los detalles</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
            {job.urgente && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    ¡Este trabajo es urgente!
                </Alert>
            )}
            <Typography variant="h4" sx={{ mb: 1 }}>{job.titulo}</Typography>
            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <LocationOnIcon sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ color: 'gray' }}>{job.ubicacion}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <ScheduleIcon sx={{ mr: 1 }} />
                <Typography variant="body2">{job.jornada} | {job.contrato}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <MonetizationOnIcon sx={{ mr: 1 }} />
                <Typography variant="body1">{job.salario}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <DescriptionIcon sx={{ mr: 1 }} />
                <Typography variant="body2">{job.descripcion}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                <SchoolIcon sx={{ mr: 1 }} />
                <Typography variant="body2"><strong>Requerimientos:</strong> {job.requerimientos}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <WorkIcon sx={{ mr: 1 }} />
                <Typography variant="body2"><strong>Experiencia:</strong> {job.experiencia}</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <CalendarTodayIcon sx={{ mr: 1 }} />
                <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>Publicado el: {new Date(job.fecha_publicacion).toLocaleDateString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={postulacionId !== null ? handleDespostular : handlePostular}
                    disabled={isPostulating}
                    startIcon={isPostulating ? <CircularProgress size={24} /> : null}
                >
                    {isPostulating ? 'Procesando...' : (postulacionId !== null ? 'Despostularme' : 'Postularme')}
                </Button>
                <IconButton color="secondary" onClick={handleAddToFavorites} disabled={isFavorite}>
                    <FavoriteIcon />
                </IconButton>
            </Box>
            {error && <Typography variant="body2" color="error" sx={{ mt: 2 }}>{error}</Typography>}
            <Snackbar
                open={snackbarMessage !== null}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default Dashboard;
