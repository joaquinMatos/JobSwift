import React from 'react';
import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#333' }}>
                <Toolbar>
                    <Grid container justifyContent="space-evenly">
                        
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
