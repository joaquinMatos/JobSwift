import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    time: string;
    description: string;
}

interface JobDescriptionProps {
    job: Job | null;
}

const Descripcion: React.FC<JobDescriptionProps> = ({ job }) => {
    if (!job) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">Selecciona un trabajo para ver los detalles</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4">{job.title}</Typography>
            <Typography variant="h6">{job.company}</Typography>
            <Typography variant="body2">{job.location}</Typography>
            <Typography variant="body2">{job.time}</Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>{job.description}</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Postularme
            </Button>
        </Box>
    );
};

export default Descripcion;
