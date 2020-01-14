import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Personne } from '../entities/personne.model';
import { API_URLS } from 'src/app/config/url.config';
import { Utilisateur } from '../entities/utilisateur.model';
import { Matiere } from '../entities/matiere.model';

@Injectable()
export class MatiereService{

    public selectedMatiere : Matiere;
    constructor(
        private http:HttpClient,
        ){

    }
    
    add( matiere : Matiere) : Observable<any>{
        return this.http.post(API_URLS.MATIERES_URL,matiere);
    }
    update( matiere : Matiere) : Observable<any>{
        return this.http.put(API_URLS.MATIERES_URL,matiere);
    }
    delete(id : string) : Observable<any>{
        return this.http.delete(API_URLS.MATIERES_URL+'/'+id);
    }
    getAll() : Observable<any>{
        return this.http.get(API_URLS.MATIERES_URL);
    }
    populateForm(matiere) {
        this.selectedMatiere = matiere ;
      }
}