/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response } from 'express';
import axios from 'axios';
import { IMovie } from 'src/interfaces/IMovie';

class CharacterController {
  private base = 'https://swapi.dev/api';

  public getCharacters = async (req: Request, res: Response) => { // complexity: O(n)
    const url = `${this.base}/people`;

    const response = await axios.get(url);
    const characters = <Array<any>>response.data.results;

    const filmsArray = films.map((film: IMovie) => ({
      title: film.title,
      episode_id: film.episode_id,
      opening_crawl: film.opening_crawl,
      director: film.director,
      producer: film.producer,
      release_date: film.release_date,
      url: film.url
    }));

    const sortedFields = filmsArray.sort((a, b) => (
      Number(new Date(b.release_date)) - Number(new Date(b.release_date))
    ));

    // TODO: include comments in response

    return res.json({ data: sortedFields });
  };

}
export const characterController = new CharacterController();