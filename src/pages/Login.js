import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Login({ onLoginSuccess }) {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const response = await authService.login(usernameOrEmail, password);
            if (response) {
                onLoginSuccess();
                navigate('/');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError(err.message || 'Login failed. An unexpected error occurred.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 400, mx: 'auto', p: 3 }}>
        <Typography component="h1" variant="h5">
        Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
        margin="normal"
        required
        fullWidth
        id="usernameOrEmail"
        label="Username or Email"
        name="usernameOrEmail"
        autoComplete="usernameOrEmail"
        autoFocus
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        />
        <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        >
        Login
        </Button>
        </Box>
    );
}

export default Login;  //Default EXPORT
