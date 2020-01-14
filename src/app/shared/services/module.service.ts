import { Injectable } from '@angular/core';
import { Module } from '../entities/module.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/config/url.config';


@Injectable()
export class ModuleService{
    
    public selectedModule : Module;
    constructor(
        private http:HttpClient,
        ){

    }
    
    add( module : Module) : Observable<any>{
        return this.http.post(API_URLS.MODULES_URL,module);
    }
    update( module : Module) : Observable<any>{
        return this.http.put(API_URLS.MODULES_URL,module);
    }
    delete(id : string) : Observable<any>{
        return this.http.delete(API_URLS.MODULES_URL+'/'+id);
    }
    getAll() : Observable<any>{
        return this.http.get(API_URLS.MODULES_URL);
    }
    populateForm(module) {
        this.selectedModule = module ;
      }
}