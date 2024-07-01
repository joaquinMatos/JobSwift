import React from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Divider, Badge, Alert } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, Settings, Description, Search, Send, Favorite, Notifications, Visibility, AccountCircle, VisibilityOff } from '@mui/icons-material';

interface HamburgerMenuProps {
    open: boolean;
    toggleDrawer: () => void;
}

const Hamburguesa: React.FC<HamburgerMenuProps> = ({ open, toggleDrawer }) => {
    return (
        <Drawer anchor="left" open={open} onClose={toggleDrawer}>
            <Box sx={{ width: 250 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                    <Avatar alt="Osmar Casillas" src="/path/to/avatar.jpg" />
                    <Typography variant="body1">Osmar Casillas</Typography>
                    <IconButton onClick={toggleDrawer}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText primary="Configuración" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Description />
                        </ListItemIcon>
                        <ListItemText primary="Mi CV" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>
                            <Search />
                        </ListItemIcon>
                        <ListItemText primary="Buscar ofertas" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Send />
                        </ListItemIcon>
                        <ListItemText primary="Mis postulaciones" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Favorite />
                        </ListItemIcon>
                        <ListItemText primary="Mis favoritos" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Alert />
                        </ListItemIcon>
                        <ListItemText primary="Mis Alertas" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Visibility />
                        </ListItemIcon>
                        <ListItemText primary="Quién vio mi perfil" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <Badge badgeContent={13} color="error">
                                <Notifications />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary="Notificaciones" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <VisibilityOff />
                        </ListItemIcon>
                        <ListItemText primary="Ofertas ocultas" />
                        <Box sx={{ ml: 1, bgcolor: 'yellow', borderRadius: 1, p: '0 8px' }}>
                            <Typography variant="caption" color="textPrimary">Nuevo</Typography>
                        </Box>
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary="Buscar empresas" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default Hamburguesa;
