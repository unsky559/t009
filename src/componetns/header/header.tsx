import {
  AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';

const pages = [
  ['Sing in', '/signin'],
  ['Login', '/login'],
  ['Films', '/films'],
  ['Add film', '/add'],
];

const Header = () => {
    const navigate = useNavigate();

  return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                          mr: 2,
                          display: { xs: 'none', md: 'flex' },
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          letterSpacing: '.3rem',
                          color: 'inherit',
                          textDecoration: 'none'
                        }}
                    >
                        t009
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        {pages.map((page) => (
                            <Button
                                key={page[0]}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => {
                                    navigate(page[1]);
                                }}
                            >
                                {page[0]}
                            </Button>
                        ))}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
  );
};

export default Header;
