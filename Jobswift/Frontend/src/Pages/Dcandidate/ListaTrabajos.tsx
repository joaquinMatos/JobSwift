import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

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

interface JobListProps {
    jobs: Job[];
    onSelectJob: (job: Job) => void;
}

const ListaTrabajo: React.FC<JobListProps> = ({ jobs, onSelectJob }) => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6">17,994 Trabajos de sistemas</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {jobs.map((job) => (
                    <Grid item xs={12} key={job.idOfertaTrabajo}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} onClick={() => onSelectJob(job)}>
                            <CardContent>
                                <Typography variant="h5">{job.titulo}</Typography>
                                <Typography variant="body2">{job.ubicacion}</Typography>
                                <Typography variant="body2">{job.jornada}</Typography>
                                <Typography variant="body2">{job.salario}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ListaTrabajo;
