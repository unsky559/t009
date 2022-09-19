import React, { useEffect } from 'react';
import {
  Backdrop,
  Box, Button, CircularProgress, Container, TextField, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useFetch from '../hooks/useFetch';
import AuthService from '../services/AuthService';
import { useAppDispatch } from '../hooks/redux';
import { authSlice } from '../store/reducers/AuthSlice';
import { IAuth } from '../types/IAuth';
import useNetworkError from '../hooks/useNetworkError';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authorise } = authSlice.actions;

  const email = useInput();
  const name = useInput();
  const password = useInput();
  const password2 = useInput();

  const {
    fetching: makeReq, isLoading, error, data,
  } = useFetch<IAuth>(AuthService.register({
    email: email.value,
    name: name.value,
    password: password.value,
    confirmPassword: password2.value,
  }));

  useEffect(() => {
    if (error) {
      if (error.error?.fields) {
        if ('data/email' in error.error.fields) {
          email.updateValid(false);
        }
        if ('data/name' in error.error.fields) {
          name.updateValid(false);
        }
        if ('data/password' in error.error.fields) {
          password.updateValid(false);
        }
        if ('data/confirmPassword' in error.error.fields) {
          password2.updateValid(false);
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
                  Register
              </Typography>
              <Box
                  component="form"
                  noValidate
                  autoComplete="off"
              >
                  <TextField
                      error={!email.isValid}
                      onChange={(e) => { email.updateValue(e.target.value); }}
                      fullWidth
                      margin="normal"
                      label="Email"
                      type="email"
                      variant="outlined"/>
                  <TextField
                      error={!name.isValid}
                      onChange={(e) => { name.updateValue(e.target.value); }}
                      fullWidth
                      id="outlined-basic"
                      margin="normal"
                      label="Name"
                      variant="outlined"/>
                  <TextField
                      error={!password.isValid}
                      onChange={(e) => { password.updateValue(e.target.value); }}
                      fullWidth
                      margin="normal"
                      label="Password"
                      type="password"
                      variant="outlined"/>
                  <TextField
                      error={!password2.isValid}
                      onChange={(e) => { password2.updateValue(e.target.value); }}
                      fullWidth
                      margin="normal"
                      label="Repeat password"
                      type="password"
                      variant="outlined"/>
                  <Button disabled={isLoading} onClick={makeReq} variant="contained">Register</Button>
              </Box>
          </Container>
      </>
  );
};

export default RegisterPage;
