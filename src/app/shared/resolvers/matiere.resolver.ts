import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatiereService } from '../services/matiere.service';


@Injectable()
export class   MatiereResolver implements Resolve<any>{
    
    constructor(private matiereService : MatiereService){

    }

    resolve(){
        return this.matiereService.getAll();
    }
}