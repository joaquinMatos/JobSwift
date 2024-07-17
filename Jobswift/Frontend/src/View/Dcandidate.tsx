import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, AppBar, Toolbar, InputBase, IconButton } from '@mui/material';
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
            if (query.trim() === '') {
                setSearchResults(jobs); // Muestra todas las ofertas si el texto de búsqueda está vacío
            } else {
                const filteredJobs = jobs.filter(job =>
                    job.titulo.toLowerCase().includes(query.toLowerCase())
                );
                setSearchResults(filteredJobs); // Actualiza los resultados de búsqueda con las ofertas filtradas
            }
        }, 300),
        [jobs]
    );

    // Solo ejecutar búsqueda si hay texto en el campo de búsqueda
    useEffect(() => {
        if (searchText.trim() !== '') {
            debouncedSearch(searchText);
        }
    }, [searchText, debouncedSearch]);

    const isSearchDisabled = searchText.trim() === ''; // Determina si el campo de búsqueda está vacío

    const handleJobSelection = (job: Job) => {
        setSelectedJob(job);
        navigate(`/dashboard`, { state: { jobId: job.idOfertaTrabajo } });
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f0f0f0', borderRadius: 1, p: 1, flexGrow: 1 }}>
                        <SearchIcon />
                        <InputBase
                            placeholder="Cargo o categoría"
                            sx={{ ml: 1, flex: 1 }}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Box>
                    <IconButton
                        color="primary"
                        disabled={isSearchDisabled}
                        onClick={() => debouncedSearch(searchText)}
                    >
                        <SearchIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', height: '100vh', p: 2, flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} md={6} sx={{ overflowY: 'auto', height: '100%' }}>
                        <ListaTrabajo jobs={searchResults} onSelectJob={handleJobSelection} />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
