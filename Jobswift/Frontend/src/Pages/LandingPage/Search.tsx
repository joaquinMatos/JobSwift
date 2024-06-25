
import React from 'react';
import { AppBar, Toolbar, Box, Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#003366'}}>
      <Box sx={{ textAlign: 'center', marginY: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'white', padding: 2, borderRadius: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Cargo o categoría"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ marginRight: 2 }}
          />
          <TextField
            variant="outlined"
            placeholder="Lugar"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ marginRight: 2 }}
          />
          <Button variant="contained" color="primary">Buscar empleos</Button>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Search;
