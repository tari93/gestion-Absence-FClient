import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { Matiere } from 'src/app/shared/entities/matiere.model';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatiereService } from 'src/app/shared/services/matiere.service';
import { MatiereAddComponent } from '../matiere-add/matiere-add.component';

@Component({
  selector: 'app-matiere-list',
  templateUrl: './matiere-list.component.html',
  styleUrls: ['./matiere-list.component.css']
})
export class MatiereListComponent implements OnInit {
  listData: MatTableDataSource<any>;
  matieres : Matiere[];
  displayedColumns : string[] = ['libelle','chargeHoraire','profEnseignant','actions'];

  searchKey:string;
  @ViewChild(MatSort,{ static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{ static: true}) paginator: MatPaginator;
 
  constructor(
    private matiereService : MatiereService,
    private fb : FormBuilder,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private notificationService:NotificationService
    ) { 
    }

  ngOnInit() {
    // this.courrierService.getAll().subscribe(
    //   data => {this.courriers=data},
    //   error => {console.log('An error was occured ')},
    //   () => {console.log('Loading data was done ')}
    // );
    this.init();
    this.load();
    this.listData = new MatTableDataSource(this.matieres);
    console.log(this.listData);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;

  }
  init(){
    //this.selectedItem= this.initItem;
    this.matieres = this.route.snapshot.data.matieres;
  }
  
  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }
  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(MatiereAddComponent,dialogConfig);

  }
  onEdit(row){
    console.log(row);
    this.matiereService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(MatiereAddComponent,dialogConfig);
  }
  onDelete(numero){
    if(confirm('Voulez archiver cet matiere ? ')){
      this.matiereService.delete(numero).subscribe(
        res => {
          this.notificationService.warn('Cet matiere est archivee');
       //   this.init();
          this.load();
        },
        error =>{
          this.notificationService.success('Error d\'envoi');
  
        }
      );
    }
  }

  load(){
    this.matiereService.getAll().subscribe(
      data =>{this.matieres = data},
      error => {console.log('loading employees failed !')},
      () => {console.log(this.matieres)}
    );
  }
}

