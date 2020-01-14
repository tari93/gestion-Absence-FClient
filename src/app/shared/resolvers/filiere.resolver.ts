import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { FiliereService } from '../services/filiere.service';


@Injectable()
export class   FiliereResolver implements Resolve<any>{
    
    constructor(private filiereService : FiliereService){

    }

    resolve(){
        return this.filiereService.getAll();
    }
}