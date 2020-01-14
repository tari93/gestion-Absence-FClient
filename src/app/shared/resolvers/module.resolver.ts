import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatiereService } from '../services/matiere.service';
import { ModuleService } from '../services/module.service';


@Injectable()
export class   ModuleResolver implements Resolve<any>{
    
    constructor(private moduleService : ModuleService){

    }

    resolve(){
        return this.moduleService.getAll();
    }
}