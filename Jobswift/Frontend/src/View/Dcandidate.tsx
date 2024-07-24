import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, AppBar, Toolbar, InputBase, IconButton, MenuItem, Select, InputLabel, FormControl, TextField, SelectChangeEvent } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ListaTrabajo from '../Pages/Dcandidate/ListaTrabajos';
import Descripcion from '../Pages/Dcandidate/Descrpcion';
import { useAuth } from '../context/AuthLogin';
import axios from 'axios';
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
    reclutadores: any;
}

// Implementación personalizada de debounce
function debounce(func: (...args: any[]) => void, wait: number): (...args: any[]) => void {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

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
        <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
            <AppBar position="static" sx={{ bgcolor: 'black' }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f0f0f0', borderRadius: 1, p: 1, flexGrow: 1 }}>
                        <SearchIcon />
                        <InputBase
                            placeholder="Cargo o categoría"
                            sx={{ ml: 1, flex: 1 }}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <TextField
                            label="Ubicación"
                            variant="outlined"
                            margin="normal"
                            value={locationFilter}
                            onChange={handleLocationFilterChange}
                            sx={{ ml: 1, flex: 1 }}
                        />
                        <FormControl variant="outlined" sx={{ ml: 1, flex: 1 }}>
                            <InputLabel>Experiencia</InputLabel>
                            <Select
                                value={experienceFilter}
                                onChange={handleExperienceFilterChange}
                                label="Experiencia"
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
                    <IconButton
                        color="inherit"
                        disabled={isSearchDisabled}
                        onClick={() => debouncedSearch(searchText)}
                    >
                        <SearchIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', height: '100vh', p: 2, flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} md={4} sx={{ overflowY: 'auto', height: '100%' }}>
                        <ListaTrabajo jobs={searchResults} onSelectJob={handleJobSelection} />
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

export default Dashboard;
