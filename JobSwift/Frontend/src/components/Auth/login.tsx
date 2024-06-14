// LoginComponent.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';

export default function LoginComponent() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    try{
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error logging in');
      }

      console.log('Success:', result);

    }catch(error){
      console.error('Error:', error);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#60A5FA"
    >
      <Box
        display="flex"
        maxWidth="1000px"
        borderRadius="16px"
        bgcolor="white"
        boxShadow={3}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p={6}
          width="50%"
        >
          <form onSubmit={handleSubmit}>
            <div>
              <Typography variant="h4" fontWeight="bold">
                Welcome
              </Typography>
              <Typography variant="body2" color="textSecondary" mt={1}>
                or use your email account:
              </Typography>
            </div>
            <Box mt={2} mb={2}>
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
            </Box>
            <Link href="#" variant="body2" color="primary">
              Forgot Your Password?
            </Link>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              LOGIN
            </Button>
          </form>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={6}
          width="50%"
          bgcolor="#3B82F6"
          borderRadius="0 16px 16px 0"
          color="white"
          position="relative"
        >
          <div>
            <Typography variant="h4" fontWeight="bold">
              Hello Reclutador!
            </Typography>
            <Typography variant="body2" mt={1}>
              Register with your personal account to use this app
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, bgcolor: 'white', color: '#3B82F6' }}
            >
              REGISTER
            </Button>
          </div>
          <Box
            position="absolute"
            top="0"
            right="0"
            width="90px"
            height="90px"
            bgcolor="white"
            borderRadius="50%"
            sx={{ transform: 'translate(50%, -50%)' }}
          />
          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="60px"
            height="60px"
            bgcolor="white"
            borderRadius="50%"
            sx={{ transform: 'translate(-50%, 50%)' }}
          />
        </Box>
      </Box>
    </Box>
  );
}
