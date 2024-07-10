import axios from "axios";
import API_URL from "../utils/api";

interface AuthProviderProps {
    children: React.ReactNode;
}
  
export function Candidate_info({ children }: AuthProviderProps) {

    async function UserData() {
        try {
            // Petición login API
            const response = await axios.get(`${API_URL}/Candidato`);
            const { result: datos } = response.data;
            console.log(datos);
        } catch (error) {
            console.error("Error al obtener datos del candidato:", error);
        }
    }

    // Llama a UserData cuando sea necesario
    UserData();

    return (
        <div>
            {children}
        </div>
    );
}
