import actor from './actorType';

type film = {
    id: number,
    title: string,
    year: number,
    format: string,
    actors?: actor[]
}

export default film;
