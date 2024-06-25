import React from 'react';
import { Box } from '@mui/material';

const Circulos = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 1,  // Asegúrate de que el z-index sea mayor que el del fondo pero menor que los inputs
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          top: '10%',
          left: '5%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          bgcolor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          top: '50%',
          left: '10%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '250px',
          height: '250px',
          bgcolor: 'rgba(255, 255, 255, 0.4)',
          borderRadius: '50%',
          bottom: '20%',
          right: '5%',
        }}
      />
    </Box>
  );
};

export default Circulos;
