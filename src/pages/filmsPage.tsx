/* eslint-disable dot-notation */
import React, { useEffect, useState } from 'react';
import {
  Backdrop, Button, CircularProgress, Container, Pagination, TextField,
} from '@mui/material';
import FilmList from '../componetns/film/filmList';
import useFetch from '../hooks/useFetch';
import FilmService from '../services/FilmService';
import IFilm from '../types/IFilm';
import { errorConvert } from '../tools/errorConvert';
import useInput from '../hooks/useInput';

const FilmsPage = () => {
  const searchFild = useInput();
  const [page, updatePage] = useState(1);
  const [pageCount, updatePageCount] = useState(1);
  const req = useFetch<{ data: IFilm[], meta: { total: number } }>(FilmService.movies(searchFild.value !== '' && { search: searchFild.value }, page));
  const [films, updateFilms] = useState([]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    updatePage(value);
  };

  useEffect(() => {
    req.fetching();
  }, [page]);

  useEffect(() => {
    if (req.data) {
      updateFilms(req.data.data as IFilm[]);
      updatePageCount(Math.ceil(req.data.meta.total / 10));
    }
  }, [req.data]);

  useEffect(() => {
    if (req.error) {
      if (req.error.error?.fields) {
        if ('search' in req.error.error.fields) {
          searchFild.updateValid(false);
          searchFild.updateHelperText(errorConvert(req.error.error.fields['search']));
        }
      }
    }
  }, [req.error]);

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
          <TextField
              error={!searchFild.isValid}
              helperText={searchFild.helperText}
              onChange={(e) => { searchFild.updateValue(e.target.value || null); }}
              margin="normal"
              fullWidth
              label="Search"
              placeholder="Enter film or actor"
              id="fullWidth"/>
          <Button onClick={makeSearch} variant="contained" >Search</Button>
          <FilmList films={films}/>
          <Pagination onChange={handleChange} count={pageCount} />
        </Container>
      </>

  );
};

export default FilmsPage;
