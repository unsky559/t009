import React from 'react';
import {Box, Button, Container, TextField, Typography} from '@mui/material';

const LoginPage = () => (
        <Container maxWidth="sm">
            <Typography variant="h3" margin="normal" component="h2">
                Log in
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
                <TextField fullWidth id="outlined-basic" margin="normal" label="Login" variant="outlined" />
                <TextField fullWidth id="outlined-basic" margin="normal" label="Password" type="password" variant="outlined" />
                <Button variant="contained">Login</Button>
            </Box>
        </Container>
);

export default LoginPage;
