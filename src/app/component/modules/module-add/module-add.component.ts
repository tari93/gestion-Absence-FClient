import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Module } from 'src/app/shared/entities/module.module';
import { ModuleService } from 'src/app/shared/services/module.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { PersonneService } from 'src/app/shared/services/personne.service';
import { Personne } from 'src/app/shared/entities/personne.model';
import { Matiere } from 'src/app/shared/entities/matiere.model';
import { MatiereService } from 'src/app/shared/services/matiere.service';

export interface Engineer {
  fullName: string;
  employeeId: number;
}
@Component({
  selector: 'app-module-add',
  templateUrl: './module-add.component.html',
  styleUrls: ['./module-add.component.css']
})
export class ModuleAddComponent implements OnInit {
    modules:Module[];
  moduleForm : FormGroup;
  matieresList : Matiere[];
  profControl  = new FormControl();
  filteredOptions: Observable<string[]>;
  public allMatieres: Matiere[] ;
  public chipSelectedMatieres: Matiere[] = [];
  public filteredMatieres: Observable<String[]>;

  //
  // Set this to false to ensure engineers are from allEngineers list only.
  // Set this to true to also allow 'free text' engineers.
  //
  private allowFreeTextAddEngineer = false;

  public matiereControl = new FormControl();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  @ViewChild('matiereInput',{static:false}) matiereInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',{static:false}) matAutocomplete: MatAutocomplete;

  
  public addMatiere(event: MatChipInputEvent): void {
    if (!this.allowFreeTextAddEngineer) {
      // only allowed to select from the filtered autocomplete list
      const input = event.input;
      const value = event.value;
      console.log(event);
      console.log('allowFreeTextAddEngineer is false');
      return;
    }

    //
    // Only add when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    //
    if (this.matAutocomplete.isOpen) {
      return;
    }

     // Add our engineer
     const value = event.value;
     if ((value || '').trim()) {
      this.selectEngineerByName(value.trim());
    }

    this.resetInputs();
  }

  public removeMatiere(matiere: Matiere): void {
    const index = this.chipSelectedMatieres.indexOf(matiere);
    if (index >= 0) {
      this.chipSelectedMatieres.splice(index, 1);
      this.resetInputs();
    }
  }

  public matiereSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectEngineerByName(event.option.value);
    this.resetInputs();
  }

  private resetInputs() {
    // clear input element
    this.matiereInput.nativeElement.value = '';
    // clear control value and trigger engineerControl.valueChanges event 
    this.matiereControl.setValue(null); 
  }

  //
  // Compute a new autocomplete list each time control value changes
  //
  private filterOnValueChange(matiereLibelle: string | null): String[] {
    let result: String[] = [];
    //
    // Remove the engineers we have already selected from all engineers to
    // get a starting point for the autocomplete list.
    //
    let allMatieresLessSelected = this.allMatieres.filter(matiere => this.chipSelectedMatieres.indexOf(matiere) < 0);
    if (matiereLibelle) {
      result = this.filterMatiere(allMatieresLessSelected, matiereLibelle);
    } else {
      result = allMatieresLessSelected.map(matiere => matiere.libelle);
    }
    return result;
  }

  private filterMatiere(matiereList: Matiere[], libelle: String): String[] {
    let filteredMatiereList: Matiere[] = [];
    const filterValue = libelle.toLowerCase();
    let engineersMatchingEngineerName = matiereList.filter(matiere => matiere.libelle.toLowerCase().indexOf(filterValue) === 0);
    if (engineersMatchingEngineerName.length || this.allowFreeTextAddEngineer) {
      filteredMatiereList = engineersMatchingEngineerName;
    } else {
      filteredMatiereList = matiereList;
    }
    return filteredMatiereList.map(matiere => matiere.libelle);
  }

  private selectEngineerByName(libelle) {
    let foundMatiere = this.allMatieres.filter(engineer => engineer.libelle == libelle);
    if (foundMatiere.length) {
      this.chipSelectedMatieres.push(foundMatiere[0]);
    } else {
       this.chipSelectedMatieres.push({ libelle:libelle, });
    }
  }

  constructor(
    private moduleService :ModuleService,
    private notifactionService:NotificationService,
    private matiereService:MatiereService,
    public dialogRef:MatDialogRef<ModuleAddComponent>
   ) { 
    this.createForm();
    this.load();
    
  }


  ngOnInit() {
    
  }

  createForm(){
    this.moduleForm=new FormGroup({
      id: new FormControl(null),
      libelle: new FormControl('',Validators.required),
      chargeHoraire: new FormControl('',Validators.required),
      matieres : new FormControl(this.matieresList),

      //pieceJUrl: new FormControl(null),
      //provenance:new FormControl(0),
      //  typeCourrier:new FormControl('courrierArrive'),
    });
   if(this.moduleService.selectedModule !=null){
     this.moduleForm.setValue(this.moduleService.selectedModule);
   }
  }
  
  load(){
    this.matiereService.getAll().subscribe(
        data => {
          console.log(data);
           this.matieresList = data;
            this.allMatieres = data;
          //  this.filteredMatieres = this.matiereCtrl.valueChanges.pipe(
          //   startWith(null),
          //   map((matiere: string | null) => matiere ? this._filter(matiere) : this.allMatieres.slice()));
          this.filteredMatieres = this.matiereControl.valueChanges.pipe(
            startWith(null),
            map(engineerName => this.filterOnValueChange(engineerName))
          );
        },
        error => {console.log('loading matieres failed !')},
        //() => {console.log(this.enseignantsList)}
    );
  }

  onSubmit(){
    if(this.moduleForm.valid){
    //  this.changeDateFormat();
      const p =this.moduleForm.value;
      p.matieres=this.chipSelectedMatieres;
    console.log(p);
    this.moduleService.add(p).subscribe(
      res => {
        //this.notifactionService.add(res,p.destinataire).subscribe(
         // res=>{
            this.notifactionService.success('cet module est ajoutee avec succes');
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
    this.moduleForm.reset;
    this.moduleService.selectedModule=null;
    this.createForm();
    this.dialogRef.close();
  }
 
}
