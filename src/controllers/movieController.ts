/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response } from 'express';
import axios from 'axios';
import { IMovie } from 'src/interfaces/IMovie';

class MovieController {
  private base = 'https://swapi.dev/api';
  public getMovies = async (req: Request, res: Response) => { // complexity: O(n)
    const url = `${this.base}/films`;

    const response = await axios.get(url);
    const films = <Array<any>>response.data.results;

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
  }; // getFilms

} // FilmsController

export const movieController = new MovieController();