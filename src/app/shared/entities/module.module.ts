import { Matiere } from './matiere.model';

export class Module{
    constructor(
        public id ?: string ,
        public  libelle ?:string,
        public  chargeHoraire ?:number,
        public  matieres ?:Matiere[],
    ){

    }
}