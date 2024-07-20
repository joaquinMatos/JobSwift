import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
  usuario: string;
}

interface Candidato {
  nombreCompleto: string;
  apellidos: string;
  email: string;
  contrasena: string;
  codigoP: string;
  ciudad: string;
  nTelefonico: string;
  token: string;
}

export function GetUsernameFromToken(): string | null {
  const tokenData = localStorage.getItem('accessToken');
  if (tokenData) {
    const { accessToken } = JSON.parse(tokenData);
    const decodedToken = jwtDecode<DecodedToken>(accessToken);
    return decodedToken.usuario;
  }
  return null;
}

const ActualizarCandidato = () => {
  const [candidato, setCandidato] = useState<Candidato>({
    nombreCompleto: '',
    apellidos: '',
    email: '',
    contrasena: '',
    codigoP: '',
    ciudad: '',
    nTelefonico: '',
    token: '',
  });

  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    const tokenData = localStorage.getItem('accessToken');
    if (tokenData) {
      const { accessToken } = JSON.parse(tokenData);
      const decodedToken = jwtDecode<DecodedToken>(accessToken);
      setId(decodedToken.id);
      fetchCandidato(decodedToken.id);
    }
  }, []);

  const fetchCandidato = async (id: number) => {
    try {
      const response = await axios.get(`https://localhost:7151/Candidato/${id}`);
      setCandidato(response.data);
    } catch (error) {
      console.error('Error fetching candidato:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCandidato((prevCandidato) => ({
      ...prevCandidato,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id !== null) {
      try {
        await axios.put(`https://localhost:7151/Candidato/${id}`, candidato);
        alert('Candidato actualizado con éxito');
      } catch (error) {
        console.error('Error updating candidato:', error);
      }
    }
  };

  return (
    <div>
      <h2>Actualizar Candidato</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre Completo</label>
          <input
            type="text"
            name="nombreCompleto"
            value={candidato.nombreCompleto}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={candidato.apellidos}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={candidato.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="contrasena"
            value={candidato.contrasena}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Código Postal</label>
          <input
            type="text"
            name="codigoP"
            value={candidato.codigoP}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ciudad</label>
          <input
            type="text"
            name="ciudad"
            value={candidato.ciudad}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Número Telefónico</label>
          <input
            type="text"
            name="nTelefonico"
            value={candidato.nTelefonico}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Token</label>
          <input
            type="text"
            name="token"
            value={candidato.token}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default ActualizarCandidato;
