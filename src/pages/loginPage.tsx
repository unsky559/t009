import React, { useEffect } from 'react';
import {
  Backdrop,
  Box, Button, CircularProgress, Container, TextField, Typography,
} from '@mui/material';
import useFetch from '../hooks/useFetch';
import AuthService from '../services/AuthService';
import useInput from '../hooks/useInput';
import { useAppDispatch } from '../hooks/redux';
import { authSlice } from '../store/reducers/AuthSlice';
import { IAuth } from '../types/IAuth';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { authorise } = authSlice.actions;

  const onNetworkError = useNetworkError();

  const {
    value: login, updateValue: updateLogin, isValid: loginValid, updateValid: setLoginValid,
  } = useInput();
  const {
    value: password,
    updateValue: updatePassword,
    isValid: passwordValid,
    updateValid: setPasswordValid,
  } = useInput();

  const {
    fetching: makeReq, isLoading, error, data,
  } = useFetch<IAuth>(AuthService.login({
    email: login,
    password,
  }));

  useEffect(() => {
    if (error) {
      if (error.error?.fields) {
        if ('email' in error.error.fields) {
          setLoginValid(false);
        }
        if ('password' in error.error.fields) {
          setPasswordValid(false);
        }
      }
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      if (data.token) {
        dispatch(authorise(String(data.token)));
      }
    }
  }, [data]);

  return (
      <>
          <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
          >
              <CircularProgress color="inherit" />
          </Backdrop>
          <Container maxWidth="sm">
              <Typography variant="h3" margin="normal" component="h2">
                  Log in
              </Typography>
              <Box
                  component="form"
                  autoComplete="off">
                  <TextField
                      fullWidth
                      margin="normal"
                      label="Login"
                      variant="outlined"
                      error={!loginValid}
                      onChange={(e) => updateLogin(e.target.value)}/>
                  <TextField
                      fullWidth
                      margin="normal"
                      label="Password"
                      type="password"
                      variant="outlined"
                      error={!passwordValid}
                      onChange={(e) => updatePassword(e.target.value)}/>
                  <Button variant="contained" onClick={makeReq} disabled={isLoading}>Login</Button>
              </Box>
          </Container>
      </>
  );
};

export default LoginPage;
