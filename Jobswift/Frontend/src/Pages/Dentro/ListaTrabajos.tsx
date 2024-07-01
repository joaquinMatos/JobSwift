import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  time: string;
  description: string;
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
          <Grid item xs={12} key={job.id}>
            <Card onClick={() => onSelectJob(job)}>
              <CardContent>
                <Typography variant="h5">{job.title}</Typography>
                <Typography variant="body2">{job.company}</Typography>
                <Typography variant="body2">{job.location}</Typography>
                <Typography variant="body2">{job.time}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListaTrabajo;
