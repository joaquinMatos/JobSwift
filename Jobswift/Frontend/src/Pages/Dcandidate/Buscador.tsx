import React from 'react';
import { Box, AppBar, Toolbar, Typography, InputBase, Button, Menu, MenuItem } from '@mui/material';
import { Search } from '@mui/icons-material';

const Buscador = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    /* const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }; */

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        JobSwift
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f0f0f0', borderRadius: 1, p: 1 }}>
                        <Search />
                        <InputBase placeholder="Cargo o categoría" sx={{ ml: 1, flex: 1 }} />
                        <InputBase placeholder="Lugar" sx={{ ml: 1, flex: 1 }} />
                        <Button variant="contained" color="primary" sx={{ ml: 1 }}>
                            Buscar
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2, bgcolor: '#fff', boxShadow: 1 }}>
                <Button aria-controls="simple-menu" aria-haspopup="true"/*  onClick={handleClick} */>
                    Ordenar
                </Button>
                <Button aria-controls="simple-menu" aria-haspopup="true"/*  onClick={handleClick} */>
                    Fecha
                </Button>
                <Button aria-controls="simple-menu" aria-haspopup="true"/*  onClick={handleClick} */>
                    Lugar de trabajo
                </Button>
                <Button aria-controls="simple-menu" aria-haspopup="true"/*  onClick={handleClick} */>
                    Experiencia
                </Button>
                <Button aria-controls="simple-menu" aria-haspopup="true"/*  onClick={handleClick} */>
                    Salario
                </Button>
                <Button aria-controls="simple-menu" aria-haspopup="true"/*  onClick={handleClick} */>
                    Jornada
                </Button>
                <Button aria-controls="simple-menu" aria-haspopup="true"/*  onClick={handleClick} */>
                    Contrato
                </Button>
                <Button aria-controls="simple-menu" aria-haspopup="true"/*  onClick={handleClick} */>
                    Discapacidad
                </Button>
            </Box>

            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Option 1</MenuItem>
                <MenuItem onClick={handleClose}>Option 2</MenuItem>
                <MenuItem onClick={handleClose}>Option 3</MenuItem>
            </Menu>
        </Box>
    );
};

export default Buscador;
