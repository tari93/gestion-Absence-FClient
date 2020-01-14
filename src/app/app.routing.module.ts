import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { UtilisateursComponent } from './component/utilisateurs/utilisateurs.component';
import { UtilisateurResolver } from './shared/resolvers/utilisateur.resolver';
import { PersonnesComponent } from './component/personnes/personnes.component';
import { RolesComponent } from './component/roles/roles.component';
import { RoleResolver } from './shared/resolvers/role.resolver';
import { DepartementsComponent } from './component/departements/departements.component';
import { DepartementResolver } from './shared/resolvers/departement.resolver';
import { PersonneResolver } from './shared/resolvers/personne.resolver';
import { MatiereComponent } from './component/matiere/matiere.component';
import { MatiereResolver } from './shared/resolvers/matiere.resolver';
import { ModulesComponent } from './component/modules/modules.component';
import { ModuleResolver } from './shared/resolvers/module.resolver';
import { FilieresComponent } from './component/filieres/filieres.component';
import { FiliereResolver } from './shared/resolvers/filiere.resolver';

export const appRoutes: Routes = [
    {
        path : 'home',
        component: HomeComponent,
        children:[
            {
                path:'personne',
                component: PersonnesComponent,
                resolve:{personnes: PersonneResolver},
                outlet:"contentOutlet",
            },
            {
                path:'roles',
                component: RolesComponent,
                resolve:{roles: RoleResolver},
                outlet:"contentOutlet",
            },
            {
                path:'dept',
                component: DepartementsComponent,
                resolve:{departements: DepartementResolver},
                outlet:"contentOutlet",
            },  
            {
                path:'matieres',
                component: MatiereComponent,
                resolve:{matieres : MatiereResolver},
                outlet:"contentOutlet",
            },
            {
                path:'modules',
                component: ModulesComponent,
                resolve:{modules : ModuleResolver},
                outlet:"contentOutlet",
            },
            {
                path:'filieres',
                component: FilieresComponent,
                resolve:{filieres : FiliereResolver},
                outlet:"contentOutlet",
            },  
                        
        ]
    },
    {path : 'login',component: LoginComponent},
    //{path : 'employeeManagement',component: EmployeeComponent,resolve:{employees: EmployeeResolver}},
    //{path: '',redirectTo:'/dashboard',pathMatch:'full'}
];

@NgModule({
    imports:[
        RouterModule.forRoot(
            appRoutes,
            {enableTracing:true}
        )
    ],
    exports: [RouterModule],
    providers: [
        PersonneResolver,
        RoleResolver,
        MatiereResolver,
        ModuleResolver,
        FiliereResolver
    ]
})
export class AppRoutingModule{
    
}