import React, { useEffect, useState } from 'react';
import {
  Backdrop, Button, CircularProgress, Container, TextField,
} from '@mui/material';
import FilmList from '../componetns/film/filmList';
import useFetch from '../hooks/useFetch';
import FilmService from '../services/FilmService';
import IFilm from '../types/IFilm';

const FilmsPage = () => {
  const [searchReq, updateSeatchReq] = useState<string>();
  const req = useFetch<{ data: IFilm[] }>(FilmService.movies(searchReq && { search: searchReq }));
  const [films, updateFilms] = useState([]);
  useEffect(() => {
    req.fetching();
  }, []);

  useEffect(() => {
    if (req.data) {
      updateFilms(req.data.data as IFilm[]);
    }
  }, [req.data]);

  const makeSearch = () => {
    req.fetching();
  };

  return (
      <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={req.isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Container>
          <TextField onChange={(e) => { updateSeatchReq(e.target.value || null); }} margin="normal" fullWidth label="Search" placeholder="Enter film or actor" id="fullWidth"/>
          <Button onClick={makeSearch} variant="contained" >Search</Button>
          <FilmList films={films}/>

        </Container>
      </>

  );
};

export default FilmsPage;
