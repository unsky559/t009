import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import IFilm from '../../types/IFilm';
import useFetch from '../../hooks/useFetch';
import FilmService from '../../services/FilmService';

type propType = {
    film: IFilm
}

const FilmCard = (props: propType) => {
  const rq = useFetch(FilmService.delete({ id: props.film.id }));
  const rqInfo = useFetch<{ data: IFilm }>(FilmService.show({ id: props.film.id }));
  const [dialogOpen, updateDialogOpen] = useState(false);

  const deleteClick = () => {
    rq.fetching();
  };

  const infoClick = () => {
    rqInfo.fetching();
  };

  const handleClose = () => {
    updateDialogOpen(false);
  };

  useEffect(() => {
    if (rqInfo.data) {
      updateDialogOpen(true);
      console.log(rqInfo.data);
    }
  }, [rqInfo.data]);

  return !rq.data && (
      <>
          <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={rqInfo.isLoading}
          >
              <CircularProgress color="inherit" />
          </Backdrop>
          <Dialog
              open={dialogOpen}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">
                  { rqInfo.data?.data.title }
              </DialogTitle>
              <DialogContent>
                  <DialogContentText>
                      Format: { rqInfo.data?.data.format }
                  </DialogContentText>
                  <DialogContentText>
                      Year: { rqInfo.data?.data.year }
                  </DialogContentText>
                  <DialogContentText>
                      Actors:
                  </DialogContentText>
                  { rqInfo.data?.data.actors.map((actor) => <Chip variant="outlined" key={actor.id} label={actor.name} />) }

              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                      ok
                  </Button>
              </DialogActions>
          </Dialog>

          <Card sx={{ minWidth: 275, margin: 2 }}>
              <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {props.film.year} - {props.film.format}
                  </Typography>
                  <Typography variant="h5" component="div">
                      {props.film.title}
                  </Typography>
                  {props.film.actors?.map((actor) => <Chip key={actor.id} label={actor.name} variant="outlined"/>)}
                  <CardActions>
                      <Button onClick={infoClick} disabled={rq.isLoading || rqInfo.isLoading}>About film</Button>
                      <Button
                          disabled={rq.isLoading || rqInfo.isLoading}
                          onClick={deleteClick}>
                          Delete id: {props.film.id}
                      </Button>
                  </CardActions>
              </CardContent>
          </Card>
      </>
  );
};

export default FilmCard;
