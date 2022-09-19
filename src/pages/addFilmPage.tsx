import React, { useEffect, useState } from 'react';
import {
  Autocomplete, Backdrop,
  Box,
  Button,
  Chip, CircularProgress,
  Container,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useFetch from '../hooks/useFetch';
import FilmService from '../services/FilmService';

const AddFilmPage = () => {
  const navigate = useNavigate();

  const title = useInput();
  const year = useInput();
  const format = useInput();
  const [actors, updateActors] = useState<string[]>([]);
  const [actorsValid, updateActorsValid] = useState(true);

  const [dialogOpen, openDialog] = useState(false);

  const rq = useFetch<{status: number}>(FilmService.create({
    title: String(title.value),
    year: Number(year.value),
    format: String(format.value),
    actors,
  }));

  useEffect(() => {
    console.log(actors);
  }, [actors]);

  useEffect(() => {
    if (rq.data?.status === 1) {
      openDialog(true);
    }
  }, [rq.data]);

  const handleClose = () => {
    openDialog(false);
  };

  useEffect(() => {
    if (rq.error) {
      if (rq.error.error?.fields) {
        if ('title' in rq.error.error.fields) {
          title.updateValid(false);
        }
        if ('year' in rq.error.error.fields) {
          year.updateValid(false);
        }
        if ('format' in rq.error.error.fields) {
          format.updateValid(false);
        }
        if ('actors' in rq.error.error.fields) {
          updateActorsValid(false);
        }
      }
    }
  }, [rq.error]);

  return (
      <>
          <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={rq.isLoading}
          >
              <CircularProgress color="inherit" />
          </Backdrop>
          <Dialog
              open={dialogOpen}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">
                  {'Success'}
              </DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      Film was successfully added
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                      ok
                  </Button>
              </DialogActions>
          </Dialog>

          <Container maxWidth="sm">
              <Typography variant="h3" margin="normal" component="h2">
                  Add film
              </Typography>
              <Box
                  component="form"
                  noValidate
                  autoComplete="off"
              >
                  <TextField error={!title.isValid} onChange={(e) => { title.updateValue(e.target.value); }} fullWidth margin="normal" label="Title" variant="outlined"/>
                  <TextField error={!year.isValid} onChange={(e) => { year.updateValue(e.target.value); }} fullWidth margin="normal" label="Year" type="number" variant="outlined"/>
                  <TextField error={!format.isValid} onChange={(e) => { format.updateValue(e.target.value); }} fullWidth margin="normal" label="Format" variant="outlined"/>
                  <Autocomplete
                      multiple
                      id="tags-filled"
                      freeSolo
                      options={[]}
                      renderTags={
                          (value: readonly string[], getTagProps) => value.map((option: string, index: number) => (<Chip variant="outlined" label={option} {...getTagProps({ index })} />)) }
                      onChange={(event, newValue) => {
                        updateActors([...newValue]);
                      }}
                      renderInput={(params) => (
                          <TextField
                              error={!actorsValid}
                              {...params}
                              variant="outlined"
                              margin="normal"
                              label="Actors"
                              placeholder="Enter to add"
                          />
                      )}
                  />

                  <Button disabled={rq.isLoading} onClick={() => {
                    rq.fetching();
                  }} variant="contained" >Add</Button>
                  <Button onClick={() => {
                    navigate('/import');
                  }}>Import File</Button>
              </Box>
          </Container>
      </>

  );
};

export default AddFilmPage;
