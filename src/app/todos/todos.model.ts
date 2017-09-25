import {Author} from '../user/author.model';

export class Todos {
  constructor(public _id?: string,public _v?: number, public title?: string, public description?: string, public status?: string, public author?: Author) {

  }
}
