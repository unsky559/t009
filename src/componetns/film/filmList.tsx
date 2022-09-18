import React from 'react';
import FilmCard from './filmCard';
import IFilm from '../../types/IFilm';

type propType = {
    films: IFilm[]
}

const FilmList = (props: propType) => (<>
        {
            props.films?.map((currentFilm) => <FilmCard key={currentFilm.id} film={currentFilm}/>)
        }
    </>);

export default FilmList;
