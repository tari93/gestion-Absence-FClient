import { Injectable } from '@angular/core';
import { Filiere } from '../entities/filiere.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/config/url.config';

@Injectable()
export class FiliereService{

    public selectedFiliere : Filiere;
    constructor(
        private http:HttpClient,
        ){

    }
    
    add( filiere : Filiere) : Observable<any>{
        return this.http.post(API_URLS.FILIERES_URL,filiere);
    }
    update( filiere : Filiere) : Observable<any>{
        return this.http.put(API_URLS.FILIERES_URL,filiere);
    }
    delete(id : string) : Observable<any>{
        return this.http.delete(API_URLS.FILIERES_URL+'/'+id);
    }
    getAll() : Observable<any>{
        return this.http.get(API_URLS.FILIERES_URL);
    }
    populateForm(filiere) {
        this.selectedFiliere = filiere ;
      }
}