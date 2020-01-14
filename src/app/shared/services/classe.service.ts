import { Injectable } from '@angular/core';
import { Classe } from '../entities/classe.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/config/url.config';

@Injectable()
export class ClasseService{

    public selectedClasse :Classe;
    constructor(
        private http:HttpClient,
        ){

    }
    
    add( classe : Classe) : Observable<any>{
        return this.http.post(API_URLS.CLASSES_URL,classe);
    }
    update( classe: Classe) : Observable<any>{
        return this.http.put(API_URLS.CLASSES_URL,classe);
    }
    delete(id : string) : Observable<any>{
        return this.http.delete(API_URLS.CLASSES_URL+'/'+id);
    }
    getAll() : Observable<any>{
        return this.http.get(API_URLS.CLASSES_URL);
    }
    populateForm(classe) {
        this.selectedClasse= classe ;
      }
}