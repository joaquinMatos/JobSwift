import React from 'react';
import { Toolbar, AppBar, Button, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: '#142F3C' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box
          sx={{
            width: 300,
            height: 70,
            bgcolor: '#FFFFFF',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            '& > *': {
              marginRight: '6em', // Usa un margen relativo en lugar de un valor fijo
            },
          }}
        >
          <Button color="inherit">Home</Button>
          <Button color="inherit">Candidatos</Button>
          <Button color="inherit">Vacantes</Button>
        </Box>
        <Box>
          <Button onClick={() => navigate('/login')}
            color="inherit"
            sx={{
              bgcolor: '#FFFFFF',
              color: '#050505',
              borderRadius: '35px'
            }}><strong> LOGIN </strong></Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
