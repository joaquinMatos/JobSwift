import React from 'react';
import { Box, Grid, Typography, Link, IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BlogIcon from '@mui/icons-material/RssFeed'; // You might need to import a suitable icon

const Footer = () => {
    return (
        <Box sx={{ bgcolor: '#f9f9f9', p: 4, borderTop: '1px solid #e0e0e0' }}>
            <Box mt={4} textAlign="center">
                <IconButton href="#" color="inherit"><TwitterIcon /></IconButton>
                <IconButton href="#" color="inherit"><InstagramIcon /></IconButton>
                <IconButton href="#" color="inherit"><FacebookIcon /></IconButton>
                <IconButton href="#" color="inherit"><LinkedInIcon /></IconButton>
                <Box mt={2}>
                    <Typography align="center" sx={{ fontSize: '10px', fontWeight: '900', marginBottom: '20px' }}>
                        ©JobSwift. 2024
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
