import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Navbar({ isLoggedIn, onLogout }) {
    return (
        <AppBar position="static">
        <Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Box>
        <Button color="inherit" component={Link} to="/">Home</Button>
        </Box>
        <Box>
        {isLoggedIn ? (
            <Button color="inherit" onClick={onLogout}>Logout</Button>
        ) : (
            <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
        )}
        </Box>
        </Box>
        </Toolbar>
        </AppBar>
    );
}

export default Navbar;  //Default EXPORT
