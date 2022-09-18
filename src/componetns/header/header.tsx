import {
  AppBar, Box, Button, Container, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

let pages = [];

const Header = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.authReducer.auth);

  if (isAuth) {
    pages = [
      ['Films', '/films'],
      ['Add film', '/add'],
    ];
  } else {
    pages = [
      ['Sing in', '/signin'],
      ['Login', '/login'],
    ];
  }

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
                          textDecoration: 'none',
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
