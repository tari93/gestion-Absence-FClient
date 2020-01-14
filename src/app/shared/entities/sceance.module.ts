import { Matiere } from './matiere.model';
import { Classe } from './classe.model';
import { Module } from './module.module';

export class Sceance{
    constructor(
        public id ?: string ,
        public  dateDebut ?:string,
        public  dateFin ?:string,
        public  classe ?:Classe,
        public  module ?:Module,
        public  matiere ?:Matiere,
    ){

    }
}