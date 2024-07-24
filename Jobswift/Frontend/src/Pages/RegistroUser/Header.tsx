import React from 'react';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <IconButton 
                        color="inherit" 
                        onClick={() => navigate('/')}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
