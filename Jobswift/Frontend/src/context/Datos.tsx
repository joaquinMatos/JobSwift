// Importa React y jwt-decode
import React from 'react';

import { useAuth } from './AuthLogin'; // Asegúrate de que la ruta a useAuth sea correcta
import { jwtDecode } from 'jwt-decode';

// Componente que decodifica el JWT y obtiene el id
const JwtDecoder = () => {
  const { getAccessToken } = useAuth();
  const token = getAccessToken();
  let userId;

 
  return (
    <div>
      <p>User ID: {userId}</p>
    </div>
  );
};

export default JwtDecoder;
