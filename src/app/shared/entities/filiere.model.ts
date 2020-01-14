
import { Personne } from './personne.model';
import { Module } from './module.module';

export class Filiere{
    constructor(
        public id ?: string ,
        public  nom ?:string,
        public  modules ?:Module[],
        public  chefFiliere ?:Personne,
    ){

    }
}