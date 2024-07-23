import React from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Divider, Badge, Alert } from '@mui/material';
import { Close as CloseIcon, Settings, Description, Search, Send, Favorite, Notifications, Visibility, AccountCircle, VisibilityOff, Logout, Person } from '@mui/icons-material';
import { useAuth } from '../context/AuthLogin';
import { useNavigate } from 'react-router';

interface HamburguesaProps {
    open: boolean;
    toggleDrawer: () => void;
    data: string;
}

const MenuReclutador: React.FC<HamburguesaProps> = ({ open, toggleDrawer, data }) => {
    const { logoutUser } = useAuth(); 
    const navigate = useNavigate();

    
    const handleNavigateFavoritos = () => {
        navigate('/JobOffers');
        toggleDrawer();
    }

    const handleNavigateSearch = () => {
        navigate('/CandidateSearch');
        toggleDrawer();
    }

    return (
        <Drawer anchor="left" open={open} onClose={toggleDrawer}>
            <Box sx={{ width: 250 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                    <Avatar alt="Osmar Casillas" src="/path/to/avatar.jpg" />
                    <Typography variant="body1">{data}</Typography>
                    <IconButton onClick={toggleDrawer}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <List>
                    {/* <ListItem button onClick={handleNavigateConfiguracion}>
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText primary="Configuración" />
                    </ListItem> */}
                    <ListItem button onClick={handleNavigateFavoritos}>
                        <ListItemIcon>
                            <Favorite />
                        </ListItemIcon>
                        <ListItemText primary="Mis Ofertas" />
                    </ListItem>
                    <ListItem button onClick={handleNavigateSearch}>
                        <ListItemIcon>
                            <Favorite />
                        </ListItemIcon>
                        <ListItemText primary="Candidatos" />
                    </ListItem>
                    <ListItem button onClick={logoutUser}>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default MenuReclutador;
