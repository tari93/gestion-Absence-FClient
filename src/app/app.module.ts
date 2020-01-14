import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {FileUploadModule} from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { UtilisateursComponent } from './component/utilisateurs/utilisateurs.component';
import { UtilisateurListComponent } from './component/utilisateurs/utilisateur-list/utilisateur-list.component';
import { UtilisateurAddComponent } from './component/utilisateurs/utilisateur-add/utilisateur-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonnesComponent } from './component/personnes/personnes.component';
import { PersonneAddComponent } from './component/personnes/personne-add/personne-add.component';
import { PersonneListComponent } from './component/personnes/personne-list/personne-list.component';
import { RolesComponent } from './component/roles/roles.component';
import { RoleAddComponent } from './component/roles/role-add/role-add.component';
import { RoleListComponent } from './component/roles/role-list/role-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';
import { UtilisateurService } from './shared/services/utilisateur.service';
import { RoleService } from './shared/services/role.service';
import { AppService } from './app.service';
import { PersonneService } from './shared/services/personne.service';
import { CookieService } from 'ngx-cookie-service';
import { userPrincipalReducer } from './shared/userPrincipal.reducer';
import { XhrInterceptor } from './xhr.interceptor';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ContentComponent } from './component/content/content.component';
import { DepartementsComponent } from './component/departements/departements.component';
import { DepartementService } from './shared/services/departement.service';
import { MatiereComponent } from './component/matiere/matiere.component';
import { MatiereListComponent } from './component/matiere/matiere-list/matiere-list.component';
import { MatiereAddComponent } from './component/matiere/matiere-add/matiere-add.component';
import { MatiereService } from './shared/services/matiere.service';
import { FilieresComponent } from './component/filieres/filieres.component';
import { FiliereListComponent } from './component/filieres/filiere-list/filiere-list.component';
import { FiliereAddComponent } from './component/filieres/filiere-add/filiere-add.component';
import { ModulesComponent } from './component/modules/modules.component';
import { ModuleListComponent } from './component/modules/module-list/module-list.component';
import { ModuleAddComponent } from './component/modules/module-add/module-add.component';
import { ModuleService } from './shared/services/module.service';
import { AbsenceComponent } from './component/absence/absence.component';
import { AbsenceAddComponent } from './component/absence/absence-add/absence-add.component';
import { AbsenceListComponent } from './component/absence/absence-list/absence-list.component';
import { SeanceComponent } from './component/seance/seance.component';
import { SeanceListComponent } from './component/seance/seance-list/seance-list.component';
import { SeanceAddComponent } from './component/seance/seance-add/seance-add.component';
import { FiliereService } from './shared/services/filiere.service';


@NgModule({
  declarations: [
    AppComponent,
    UtilisateursComponent,
    UtilisateurListComponent,
    UtilisateurAddComponent,
    PersonnesComponent,
    PersonneAddComponent,
    PersonneListComponent,
    RolesComponent,
    RoleAddComponent,
    RoleListComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ContentComponent,
    DepartementsComponent,
    MatiereComponent,
    MatiereListComponent,
    MatiereAddComponent,
    FilieresComponent,
    FiliereListComponent,
    FiliereAddComponent,
    ModulesComponent,
    ModuleListComponent,
    ModuleAddComponent,
    AbsenceComponent,
    AbsenceAddComponent,
    AbsenceListComponent,
    SeanceComponent,
    SeanceListComponent,
    SeanceAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    //Material design
    MaterialModule,
    StoreModule.forRoot({userPrincipal : userPrincipalReducer }),
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    UtilisateurService,
    RoleService,
    PersonneService,
    DepartementService,
    MatiereService,
    ModuleService,
    AppService,
    FiliereService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: XhrInterceptor,
      multi:true
    },
    CookieService, 
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents:[
    PersonneAddComponent,
    RoleAddComponent,
    UtilisateurAddComponent,
    UtilisateursComponent,
    MatiereAddComponent,
    ModuleAddComponent,
    FiliereAddComponent
  ]
})
export class AppModule { }
