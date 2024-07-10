import React, { useEffect, useState } from 'react';
import { AppBar, Box, Grid, Toolbar } from '@mui/material';
import CustomButton from './ButtonLogin';
import logo from '../logo.svg';
import reclutador from '..//img/user.svg';
import candidato from '..//img/candidate2.svg';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const [zIndex, setZIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setZIndex(100);
      } else {
        setZIndex(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/candidate-login');
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: 'sticky',
        top: 0,
        zIndex: zIndex,
        transition: 'z-index 0.5s ease-in-out, box-shadow 0.5s ease-in-out',
        boxShadow: zIndex === 100 ? '0px 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
      }}
    >
      <AppBar position="sticky" sx={{ backgroundColor: '#21bbff' }}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
            {/* Logo o título a la izquierda */}
            <Grid item>
              <img src={logo} alt="Logo" style={{ height: '40px', marginLeft: '30px' }} />
            </Grid>
            {/* Botones a la derecha */}
            <Grid item>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <CustomButton
                    onClick={handleLoginClick}
                    sx={{
                      minWidth: '120px',
                      fontSize: '10px',
                      padding: '5px',
                      background: 'white',
                      color: '#000000',
                      borderRadius: '10px',
                      border: '2px solid #000000',
                    }}
                    tooltipText="Login reclutadores"
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={candidato} alt="" style={{ width: '20px', marginRight: '5px' }} />
                      Login
                    </Box>
                  </CustomButton>
                </Grid>
                <Grid item>
                  <CustomButton
                    onClick={handleLoginClick}
                    sx={{
                      minWidth: '120px',
                      fontSize: '10px',
                      padding: '5px',
                      background: '#000000',
                      color: '#21bbff',
                      borderRadius: '10px',
                    }}
                    tooltipText="Login reclutadores"
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={reclutador} alt="" style={{ width: '20px', marginRight: '5px' }} />
                      Login
                    </Box>
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
