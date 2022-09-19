/* eslint-disable dot-notation */
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
import { errorConvert } from '../tools/errorConvert';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { authorise } = authSlice.actions;

  const login = useInput();
  const password = useInput();

  const rq = useFetch<IAuth>(AuthService.login({
    email: login.value,
    password: password.value,
  }));

  useEffect(() => {
    if (rq.error) {
      if (rq.error.error?.fields) {
        if ('email' in rq.error.error.fields) {
          login.updateValid(false);
          login.updateHelperText(errorConvert(rq.error.error.fields['email']));
        }
        if ('password' in rq.error.error.fields) {
          password.updateValid(false);
          password.updateHelperText(errorConvert(rq.error.error.fields['password']));
        }
      }
    }
  }, [rq.error]);

  useEffect(() => {
    if (rq.data) {
      if (rq.data.token) {
        dispatch(authorise(String(rq.data.token)));
      }
    }
  }, [rq.data]);

  return (
      <>
          <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={rq.isLoading}
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
                      error={!login.isValid}
                      helperText={login.helperText}
                      onChange={(e) => login.updateValue(e.target.value)}/>
                  <TextField
                      fullWidth
                      margin="normal"
                      label="Password"
                      type="password"
                      variant="outlined"
                      error={!password.isValid}
                      helperText={password.helperText}
                      onChange={(e) => password.updateValue(e.target.value)}/>
                  <Button variant="contained" onClick={rq.fetching} disabled={rq.isLoading}>Login</Button>
              </Box>
          </Container>
      </>
  );
};

export default LoginPage;
