import { Injectable } from '@angular/core';
import { Sceance } from '../entities/sceance.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/config/url.config';

@Injectable()
export class SceanceService{

    public selectedSceance :Sceance;
    constructor(
        private http:HttpClient,
        ){

    }
    
    add( sceance: Sceance) : Observable<any>{
        return this.http.post(API_URLS.SEANCES_URL,sceance);
    }
    update( sceance: Sceance) : Observable<any>{
        return this.http.put(API_URLS.SEANCES_URL,sceance);
    }
    delete(id : string) : Observable<any>{
        return this.http.delete(API_URLS.SEANCES_URL+'/'+id);
    }
    getAll() : Observable<any>{
        return this.http.get(API_URLS.SEANCES_URL);
    }
    populateForm(sceance) {
        this.selectedSceance= sceance ;
      }
}