import React, { useState } from 'react';
import { Box, Grid, IconButton, AppBar, Toolbar, Typography, InputBase, Button } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import ListaTrabajo from '../Pages/Dcandidate/ListaTrabajos';
import Descripcion from '../Pages/Dcandidate/Descrpcion';
import { useAuth } from '../context/AuthLogin';


interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    time: string;
    description: string;
}

const jobs: Job[] = [
    {
        id: 1,
        title: 'Analista de Infraestructura /Gestión de Servidores Windows Server y Linux',
        company: 'Group Cos México',
        location: 'Nuevo León, Monterrey',
        time: 'Hace 2 horas',
        description: 'Administrador consola SCCM...',
    },
    {
        id: 2,
        title: 'Market Pricing Analyst Sr. de Giro Electrónico con Manejo de Sistemas Power BI y SQL',
        company: 'Worken',
        location: 'Jalisco, San Pedro Tlaquepaque',
        time: 'Hace 2 horas',
        description: 'Descripción del trabajo...',
    },
    {
        id: 3,
        title: 'Matos',
        company: 'Worken',
        location: 'Jalisco, San Pedro Tlaquepaque',
        time: 'Hace 2 horas',
        description: 'Descripción del trabajo...',
    },
    {
        id: 4,
        title: 'Osmar',
        company: 'Worken',
        location: 'Jalisco, San Pedro Tlaquepaque',
        time: 'Hace 2 horas',
        description: 'Descripción del trabajo...',
    }
];

interface DashboardProps {
    toggleDrawer: () => void; // Definición de la prop toggleDrawer
}

const Dashboard = () => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    // lectura de token
    const { getAccessToken } = useAuth();
    const token = getAccessToken();
    console.log(token)

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            JobSwift
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f0f0f0', borderRadius: 1, p: 1 }}>
                            <SearchIcon />
                            <InputBase placeholder="Cargo o categoría" sx={{ ml: 1, flex: 1 }} />
                            <InputBase placeholder="Lugar" sx={{ ml: 1, flex: 1 }} />
                            <Button variant="contained" color="primary" sx={{ ml: 1 }}>
                                Buscar
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={{ display: 'flex', height: '100vh', p: 2 }}>
                    <Grid container spacing={2} bgcolor={'#21bbff'} sx={{ flexGrow: 1 }}>
                        <Grid item xs={12} md={6} sx={{ overflowY: 'auto', height: '100%' }}>
                            <ListaTrabajo jobs={jobs} onSelectJob={setSelectedJob} />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Descripcion job={selectedJob} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
