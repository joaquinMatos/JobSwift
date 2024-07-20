import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number,
  usuario: string;
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