import React, { useState } from 'react';
import { Box, Typography, Grid, Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Beneficios = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const beneficios = [
        {
            src: "img/job 1.png",
            title: "Trasparencia",

        },
        {
            src: "img/job2.png",
            title: "Ágilidad",

        },
        {
            src: "img/job3.png",
            title: "Selectividad",

        }
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? beneficios.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === beneficios.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">Nosotros te ofrecemos </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={handlePrev}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton onClick={handleNext}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2, display: currentIndex === 0 ? 'block' : 'none' }}>
                        <img src={beneficios[0].src} alt={beneficios[0].title} style={{ width: '100%', height: 'auto' }} />
                        <Box sx={{ position: 'absolute', bottom: 16, left: 16 }}>
                            <Typography sx={{
                                color: 'white',
                                fontSize: { xs: '30px', md: '30px' }, // Ajusta los tamaños de fuente aquí
                                fontWeight: '900',
                                textTransform: 'uppercase',
                                lineHeight: '1.2',
                                WebkitTextStroke: '3px black'
                            }}>{beneficios[0].title}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2, display: currentIndex === 1 ? 'block' : 'none' }}>
                        <img src={beneficios[1].src} alt={beneficios[1].title} style={{ width: '100%', height: 'auto' }} />
                        <Box sx={{ position: 'absolute', bottom: 16, left: 16 }}>
                            <Typography sx={{
                                color: 'white',
                                fontSize: { xs: '30px', md: '30px' }, // Ajusta los tamaños de fuente aquí
                                fontWeight: '900',
                                textTransform: 'uppercase',
                                lineHeight: '1.2',
                                WebkitTextStroke: '3px black'
                            }}>{beneficios[1].title}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2, display: currentIndex === 2 ? 'block' : 'none' }}>
                        <img src={beneficios[2].src} alt={beneficios[2].title} style={{ width: '100%', height: 'auto' }} />
                        <Box sx={{ position: 'absolute', bottom: 16, left: 16 }}>
                            <Typography sx={{
                                color: 'white',
                                fontSize: { xs: '30px', md: '30px' }, // Ajusta los tamaños de fuente aquí
                                fontWeight: '900',
                                textTransform: 'uppercase',
                                lineHeight: '1.2',
                                WebkitTextStroke: '3px black'
                            }}>{beneficios[2].title}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Beneficios;