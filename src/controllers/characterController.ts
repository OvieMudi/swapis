/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response } from 'express';
import axios from 'axios';
import { ICharacter } from 'src/interfaces/ICharacters';

class CharacterController {
  private base = 'https://swapi.dev/api';

  public getCharacters = async (req: Request, res: Response) => {
    const url = `${this.base}/people`;

    const { sortBy, gender } = req.query;

    const response = await axios.get(url);
    let characters: ICharacter[] = <Array<any>>response.data.results;

    switch (sortBy) {
      case 'name':
        characters = this.sortByName(characters);
        break;
      case 'gender':
        characters = this.sortByGender(characters);
        break;
      case 'height':
        characters = this.sortByHeight(characters);
        break;
      default:
        break;
    }

    characters = this.filterByGender(characters, <string>gender);

    const { totalHeightInCM, totalHeightInFt } = this.computeTotalHeight(characters);

    return res.json({
      data: characters,
      metadata: {
        resultsCount: characters.length,
        totalHeightInCM,
        totalHeightInFt,
      },
    });
  };

  private sortByName = (characters: ICharacter[]): ICharacter[] => {
    const sortedByName = characters.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });

    return sortedByName;
  };

  private sortByGender = (characters: ICharacter[]): ICharacter[] => {
    const sortedByGender = characters.sort((a, b) => {
      if (a.gender > b.gender) return 1;
      if (a.gender < b.gender) return -1;
      return 0;
    });

    return sortedByGender;
  };

  private sortByHeight = (characters: ICharacter[]): ICharacter[] => {
    const sortedByHeight = characters.sort((a, b) => Number(b.height) - Number(a.height));
    return sortedByHeight;
  };

  private filterByGender = (characters: ICharacter[], gender: string): ICharacter[] => {
    if (!gender || !['male', 'female'].includes(gender)) return characters;

    const filteredCharacters = characters.filter((character) => character.gender === gender);
    return filteredCharacters;
  };


  private computeTotalHeight = (characters: ICharacter[]) => {
    const totalHeightInCM = characters.reduce(
      (accumulator, character) => accumulator + Number(character.height), 0
    );

    const totalHeightInFt = (totalHeightInCM / 30.48).toFixed(2);

    return { totalHeightInCM: `${totalHeightInCM}cm`, totalHeightInFt: `${totalHeightInFt}ft` };
  };
}
export const characterController = new CharacterController();
