import React, { useState } from 'react';
import { Typography, Link, TextField, Button } from '@mui/material';

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); */



  return (
    <form>
      <div>
        <Typography variant="h4" fontWeight="bold">
          Welcome
        </Typography>
        <Typography variant="body2" color="textSecondary" mt={1}>
          or use your email account:
        </Typography>
        {/* {error && (
                        <Alert variant="outlined" severity="error">
                            {errorMessage}
                        </Alert>
                    )} */}
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
