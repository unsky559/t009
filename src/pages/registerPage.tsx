import React from 'react';
import {
  Box, Button, Container, TextField, Typography,
} from '@mui/material';

const RegisterPage = () => (
        <Container maxWidth="sm">
            <Typography variant="h3" margin="normal" component="h2">
                Register
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
                <TextField fullWidth id="outlined-basic" margin="normal" label="Email" type="email" variant="outlined" />
                <TextField fullWidth id="outlined-basic" margin="normal" label="Login" variant="outlined" />
                <TextField fullWidth id="outlined-basic" margin="normal" label="Password" type="password" variant="outlined" />
                <TextField fullWidth id="outlined-basic" margin="normal" label="Repeat password" type="password" variant="outlined" />
                <Button variant="contained">Register</Button>
            </Box>
        </Container>
);

export default RegisterPage;
