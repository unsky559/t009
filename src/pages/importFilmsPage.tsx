import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import FilmService from '../services/FilmService';

const ImportFilmsPage = () => {
  const navigate = useNavigate();
  const [formData, updateFormData] = useState<FormData>();
  const rq = useFetch(FilmService.import({ formData }));

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files[0];
    const fd = new FormData();
    fd.append('movies', file, file.name);
    updateFormData(fd);
  };

  const handleSubmit = () => {
    rq.fetching();
  };

  const [openDialog, changeDialogState] = useState(false);

  const handleClose = () => {
    if (rq.data) {
      navigate('/films');
    }
    if (rq.error) {
      changeDialogState(false);
    }
  };

  useEffect(() => {
    if (rq.error) {
      changeDialogState(true);
    }
  }, [rq.error]);

  useEffect(() => {
    if (rq.data) {
      changeDialogState(true);
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
          <Dialog
              open={openDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">
                  {rq.error && 'Error'}
                  {rq.data && 'Success'}
              </DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      {rq.error && 'Something went wrong. Make sure that you imoport txt file that follows format'}
                      {rq.data && 'Films was successfully imported'}
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                 <Button onClick={handleClose} autoFocus>
                     ok
                 </Button>
              </DialogActions>
          </Dialog>

          <Container maxWidth="sm">
              <Typography margin="normal" variant="h3" component="h2">
                  Import file
              </Typography>
              <Typography margin="normal" variant="body1" component="p">
                  To import file follow next structure in your txt file:
                  <pre>Title: Blazing Saddles</pre>
                  <pre>Release Year: 1974</pre>
                  <pre>Format: VHS</pre>
                  <pre>Stars: Mel Brooks, Clevon Little, Harvey Korman</pre>
              </Typography>
              <Stack>
                  <input style={{ margin: 20 }} type="file" onChange={handleChange}/>
                  <Button onClick={handleSubmit} variant="contained" disabled={!formData}>Upload</Button>
              </Stack>

          </Container>
      </>
  );
};

export default ImportFilmsPage;
