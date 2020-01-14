
import { Personne } from './personne.model';

export class Classe{
    constructor(
        public id ?: string ,
        public  libelle ?:string,
        public  niveau ?:string,
        public  type ?:string,
        public  etudiants ?:Personne[],
    ){

    }
}