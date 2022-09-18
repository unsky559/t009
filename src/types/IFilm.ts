import actor from './IActor';

interface IFilm {
    id: number,
    title: string,
    year: number,
    format: string,
    actors?: actor[]
}

export default IFilm;
