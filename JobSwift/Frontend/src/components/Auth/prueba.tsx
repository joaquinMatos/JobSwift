import React, { useState } from 'react';
import { Typography, Link, TextField, Button, Alert } from '@mui/material';

export default function LoginComponent({ setUser }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const authenticateUser = async (email: string, password: string) => {
        try {
            // Simulación de la respuesta de la API
            const data = {
                success: true,
                result: [
                    {
                        id_candidato: 1,
                        nombrecompleto: "Juan Perez",
                        apellidos: "Perez Lopez",
                        email: "juan.perez@example.com",
                        contrasena: "password123",
                        codigop: "12345",
                        ciudad: "Ciudad de México",
                        ntelefonico: "1234567890",
                        token: "sometoken123"
                    }
                ]
            };

            if (data.success) {
                setUser(data.result[0]); // Establece al usuario en el estado
                // Redirige al usuario al dashboard
                // Aquí agregarías la redirección a tu ruta de dashboard
                // por ejemplo: history.push("/dashboard");
            } else {
                setError(true);
                setErrorMessage("Invalid email or password.");
            }
        } catch (error) {
            setError(true);
            setErrorMessage("Failed to authenticate user.");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);
        setErrorMessage("");

        // Autentica al usuario con el correo electrónico y la contraseña proporcionados
        authenticateUser(email, password);
    };

    return (
        <form onSubmit={handleSubmit}>
                <div>
                    <Typography variant="h4" fontWeight="bold">
                        Welcome
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mt={1}>
                        or use your email account:
                    </Typography>
                    {error && (
                        <Alert variant="outlined" severity="error">
                            {errorMessage}
                        </Alert>
                    )}
                </div>
                <div style={{ marginTop: '2em', marginBottom: '2em' }}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Link href="#" variant="body2" color="primary">
                    Forgot Your Password?
                </Link>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, bgcolor: 'white', color: '#3B82F6' }}
                >
                    LOGIN
                </Button>
        </form>
    );
}
