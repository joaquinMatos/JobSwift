import { Typography, Button } from "@mui/material";
import { useAuth } from "../../context/AuthLogin";


const DashboardCandidate = () => {

    // Obtener la función logoutUser del contexto
    const { logoutUser } = useAuth(); 
    

    return (
        <>
            <h1>Bienvenido</h1>
            <Button variant="contained" onClick={logoutUser}>Logout</Button>
            <Typography>Hola</Typography>
        </>
    );
};

export default DashboardCandidate;
