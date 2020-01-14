import { Component, OnInit } from '@angular/core';
import { Matiere } from 'src/app/shared/entities/matiere.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatiereService } from 'src/app/shared/services/matiere.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Personne } from 'src/app/shared/entities/personne.model';
import { PersonneService } from 'src/app/shared/services/personne.service';


export interface stateProf{
  index:String;
  value:Personne;
}

@Component({
  selector: 'app-matiere-add',
  templateUrl: './matiere-add.component.html',
  styleUrls: ['./matiere-add.component.css']
})
export class MatiereAddComponent implements OnInit {
  
  matieres:Matiere[];
  matiereForm : FormGroup;
  enseignantList : Personne[];
  profControl  = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(
    private matiereService :MatiereService,
    private fb:FormBuilder,
    private notifactionService:NotificationService,
    private personneService:PersonneService,
   // private employeeService:EmployeeService,
    public dialogRef:MatDialogRef<MatiereAddComponent>
  ) { 
    this.createForm();
  }


  ngOnInit() {
    /*this.personneService.getAll().subscribe(
      res =>{
        console.log(res);
        this.personnes=res
      }
    );*/
    this.load();
    /*this.filteredOptions = this.profControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );*/ 
  }

  createForm(){
    this.matiereForm=new FormGroup({
      id: new FormControl(null),
      libelle: new FormControl('',Validators.required),
      chargeHoraire: new FormControl('',Validators.required),
      profEnseignant : new FormControl('',Validators.required ),

      //pieceJUrl: new FormControl(null),
      //provenance:new FormControl(0),
      //  typeCourrier:new FormControl('courrierArrive'),
    });
   if(this.matiereService.selectedMatiere !=null){
     this.matiereForm.setValue(this.matiereService.selectedMatiere);
   }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(this.enseignantList);
    return this.enseignantList.map(item =>item.nom).filter(
      option => option.toLowerCase().includes(filterValue)
      );
  }
  
  load(){
    this.personneService.getAll().subscribe(
        data => {
          console.log(data);
           this.enseignantList = data;
        },
        error => {console.log('loading profs failed !')},
        //() => {console.log(this.enseignantsList)}
    );
  }
  getProfName(personne:Personne):string{
    return personne!=null ?personne.nom + ' '+personne.prenom:null;
  }
  onSubmit(){
    if(this.matiereForm.valid){
    //  this.changeDateFormat();
      const p =this.matiereForm.value;
    console.log(p);
    this.matiereService.add(p).subscribe(
      res => {
        //this.notifactionService.add(res,p.destinataire).subscribe(
         // res=>{
            this.notifactionService.success('cet matiere est ajoutee avec succes');
          },
       // );
      //},
      error =>{
        this.notifactionService.success('Error d\'envoi');

      }
    );
    }
    this.onClose();
  }

  onClose(){
    this.matiereForm.reset;
    this.matiereService.selectedMatiere=null;
    this.createForm();
    this.dialogRef.close();
  }

}
