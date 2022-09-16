import React from 'react';
import film from '../../types/filmType';
import FilmCard from './filmCard';

type propType = {
    films: film[]
}

const FilmList = (props: propType) => (<>
    {
        props.films.map((currentFilm) => <FilmCard film={currentFilm}/>)
    }
    </>);

export default FilmList;
