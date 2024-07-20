import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from '../View/Landingpage';
import ProtectedRoute from '../utils/ProtectedRoute';
import RegistroUser from '../Pages/RegistroUser/RegristroUser';
import Dashboard from '../View/Dcandidate';
import Login from '../Pages/authentication/Candidate-login';
import Favoritos from '../Pages/Favoritos/Favoritos'; 
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Hamburguesa from '../components/Menu';
import MisPostulaciones from '../Pages/Postulado/PuestoP';
import PerfilCandidato from '../Pages/Perfil/PerfilCandidato';
import ActualizarCandidato from '../Pages/Perfil/Configuracion';
import BienvenidoReclutador from '../Pages/Reclutador/vistas';
import LoginComponent from '../Pages/authentication/Login';
import { GetUsernameFromToken } from '../utils/Information'; 

const AppRouter = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState<string | null>(null); // Estado para almacenar el nombre de usuario
  const location = useLocation();

  useEffect(() => {
    const username = GetUsernameFromToken();
    setUserData(username);
  }, []);

  const toggleDrawer = () => {
    setMenuOpen(!menuOpen);
  };

  const shouldShowMenu = location.pathname === '/dashboard' || location.pathname === '/MisPostulaciones' || location.pathname === '/favoritos' || location.pathname === '/perfil-candidato' || location.pathname === '/Actualiza-candidato';

  return (
    <>
      <Box>
        {shouldShowMenu && (
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        )}
        {shouldShowMenu && <Hamburguesa open={menuOpen} toggleDrawer={toggleDrawer} data={userData || 'Default User'} />} {/* Proporciona un valor por defecto */}
      </Box>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/candidate-register" element={<RegistroUser />} />
        <Route path="/candidate-login" element={<Login />} /> 
        <Route path="/reclutador-login" element={<LoginComponent />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/perfil-candidato" element={<PerfilCandidato />} />
          <Route path="/MisPostulaciones" element={<MisPostulaciones />} /> 
          <Route path="/Reclutador-home" element={<BienvenidoReclutador />} /> 
          <Route path="/Actualiza-candidato" element={<ActualizarCandidato />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
