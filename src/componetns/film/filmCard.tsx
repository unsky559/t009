import React from 'react';
import {
  Button, Card, CardActions, CardContent, Chip, Typography,
} from '@mui/material';
import film from '../../types/filmType';

type propType = {
    film: film
}

const FilmCard = (props: propType) => (
    <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {props.film.year} - {props.film.format}
            </Typography>
            <Typography variant="h5" component="div">
                {props.film.title}
            </Typography>
            {props.film.actors?.map((actor) => <Chip key={actor.id} label={actor.name} variant="outlined" />)}
            <CardActions>
                <Button>About film</Button>
                <Button>Delete id: {props.film.id}</Button>
            </CardActions>
        </CardContent>
    </Card>
);

export default FilmCard;
