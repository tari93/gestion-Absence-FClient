import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Filiere } from 'src/app/shared/entities/filiere.model';
import { FiliereService } from 'src/app/shared/services/filiere.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FiliereAddComponent } from '../filiere-add/filiere-add.component';

@Component({
  selector: 'app-filiere-list',
  templateUrl: './filiere-list.component.html',
  styleUrls: ['./filiere-list.component.css']
})
export class FiliereListComponent implements OnInit {
  listData: MatTableDataSource<any>;
  filieres : Filiere[];
  displayedColumns : string[] = ['nom','chefFiliere','actions'];

  searchKey:string;
  @ViewChild(MatSort,{ static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{ static: true}) paginator: MatPaginator;
 
  constructor(
    private filiereService : FiliereService,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private notificationService:NotificationService
    ) { 
    }

  ngOnInit() {
    this.init();
    this.load();
    this.listData = new MatTableDataSource(this.filieres);
    console.log(this.listData);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;

  }
  init(){
    //this.selectedItem= this.initItem;
    this.filieres = this.route.snapshot.data.filieres;
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
    this.dialog.open(FiliereAddComponent,dialogConfig);

  }
  onEdit(row){
    console.log(row);
    this.filiereService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(FiliereAddComponent,dialogConfig);
  }
  onDelete(numero){
    if(confirm('Voulez archiver cet filiere ? ')){
      this.filiereService.delete(numero).subscribe(
        res => {
          this.notificationService.warn('Cet filiere est archivee');
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
    this.filiereService.getAll().subscribe(
      data =>{this.filieres = data},
      error => {console.log('loading employees failed !')},
      () => {console.log(this.filieres)}
    );
  }
}

