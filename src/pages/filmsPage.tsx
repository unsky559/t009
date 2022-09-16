import React from 'react';
import {Container, TextField} from '@mui/material';
import FilmList from '../componetns/film/filmList';

const films = [{
  id: 5,
  title: 'Casablanca',
  year: 1942,
  format: 'DVD',
  actors: [
    {
      id: 7,
      name: 'Humphrey Bogart',
    },
    {
      id: 8,
      name: 'Kiril Duril',
    },
  ],
},
{
  id: 6,
  title: 'Dudosik',
  year: 1545,
  format: 'DVD'
},
];

const FilmsPage = () => (
        <Container>
          <TextField margin="normal" fullWidth label="Search" placeholder="Enter film or actor" id="fullWidth" />
          <FilmList films={films}/>
        </Container>
);

export default FilmsPage;
