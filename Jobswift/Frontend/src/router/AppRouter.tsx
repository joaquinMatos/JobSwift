import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from '../View/Landingpage';
import ProtectedRoute from '../utils/ProtectedRoute';
import RegistroUser from '../Pages/RegistroUser/RegristroUser';
import Dashboard from '../View/Dcandidate';
import Login from '../Pages/authentication/Candidate-login';
import Favoritos from '../Pages/Favoritos/Favoritos'; 
import PerfilCandidato from '../Pages/Perfil/PerfilCandidato'; // Importa el componente PerfilCandidato
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Hamburguesa from '../components/Menu';
import MisPostulaciones from '../Pages/Postulado/PuestoP';

const AppRouter = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState<string>("Joaquin Zetina"); // Aquí defines el estado para data
  const location = useLocation();

  const toggleDrawer = () => {
    setMenuOpen(!menuOpen);
  };

  // Función para determinar si mostrar el menú en la ruta actual
  const shouldShowMenu = location.pathname === '/dashboard' || location.pathname === '/MisPostulaciones'  ||location.pathname === '/favoritos' || location.pathname === '/perfil-candidato';

  return (
    <>
      <Box>
        {/* Renderiza IconButton solo si shouldShowMenu es true */}
        {shouldShowMenu && (
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        )}
        {/* Renderiza Hamburguesa solo si shouldShowMenu es true */}
        {shouldShowMenu && <Hamburguesa open={menuOpen} toggleDrawer={toggleDrawer} data={userData} />}
      </Box>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/candidate-register" element={<RegistroUser />} />
        <Route path="/candidate-login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/perfil-candidato" element={<PerfilCandidato />} /> {/* Añade la ruta para PerfilCandidato */}
          <Route path="/MisPostulaciones" element={<MisPostulaciones />} /> {/* Añade la ruta para PerfilCandidato */}
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
