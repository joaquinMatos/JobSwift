import React, { useState } from 'react';
import { Box, Grid, IconButton, AppBar, Toolbar, Typography, InputBase, Button } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import Hamburguesa from './Menu';
import ListaTrabajo from './ListaTrabajos';
import Descripcion from './Descrpcion';


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
];

const Dashboard: React.FC = () => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleDrawer = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Hamburguesa open={menuOpen} toggleDrawer={toggleDrawer} />
            <Box sx={{ flexGrow: 1, ml: menuOpen ? 25 : 0, transition: 'margin 0.3s' }}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
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
                <Box sx={{ display: 'flex', p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <ListaTrabajo jobs={jobs} onSelectJob={setSelectedJob} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Descripcion job={selectedJob} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
