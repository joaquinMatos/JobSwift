import React, { useState, useEffect } from 'react';
import { Box, Grid, AppBar, Toolbar, Typography, InputBase, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ListaTrabajo from '../Pages/Dcandidate/ListaTrabajos';
import Descripcion from '../Pages/Dcandidate/Descrpcion';
import { useAuth } from '../context/AuthLogin';
import axios from 'axios';

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

const Dashboard = () => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [searchText, setSearchText] = useState<string>('');
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

            setSearchResults(response.data.result); // Actualiza los resultados de búsqueda con los datos obtenidos
            console.log(response.data.result); // Asegúrate de que los datos sean correctos en la consola
        } catch (error) {
            console.error('Error al obtener las ofertas de trabajo:', error);
            // Puedes manejar el error según tus necesidades (por ejemplo, mostrar un mensaje al usuario)
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f0f0f0', borderRadius: 1, p: 1 }}>
                        <SearchIcon />
                        <InputBase
                            placeholder="Cargo o categoría"
                            sx={{ ml: 1, flex: 1 }}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ ml: 1 }}
                            onClick={() => fetchJobs(token as string)} // Llama a la función de búsqueda al hacer clic en el botón
                        >
                            Buscar
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', height: '100vh', p: 2 }}>
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} md={6} sx={{ overflowY: 'auto', height: '100%' }}>
                        <ListaTrabajo jobs={searchResults} onSelectJob={setSelectedJob} />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Descripcion job={selectedJob} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Dashboard;
