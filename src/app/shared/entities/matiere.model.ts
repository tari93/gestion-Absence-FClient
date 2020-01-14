import { Personne } from './personne.model';

export class Matiere{
    constructor(
        public id ?: string ,
        public  libelle ?:string,
        public  chargeHoraire ?:number,
        public profEnseignant ?: Personne
    ){

    }
}