import React from 'react';
import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          <Grid container justifyContent="space-evenly">
            <Grid item>
              <Button href="#home" sx={{ color: '#fff', fontWeight: 'bold', '&:hover': { color: '#ddd' } }}>
                Home
              </Button>
            </Grid>
            <Grid item>
              <Button href="#puestos" sx={{ color: '#fff', fontWeight: 'bold', '&:hover': { color: '#ddd' } }}>
                Puestos
              </Button>
            </Grid>
            <Grid item>
              <Button href="#services" sx={{ color: '#fff', fontWeight: 'bold', '&:hover': { color: '#ddd' } }}>
                Our Services
              </Button>
            </Grid>
            <Grid item>
              <Button href="#team" sx={{ color: '#fff', fontWeight: 'bold', '&:hover': { color: '#ddd' } }}>
                Our Team
              </Button>
            </Grid>
            <Grid item>
              <Button href="#contact" sx={{ color: '#fff', fontWeight: 'bold', '&:hover': { color: '#ddd' } }}>
                Contact us
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
