import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Module } from 'src/app/shared/entities/module.module';
import { ModuleService } from 'src/app/shared/services/module.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ModuleAddComponent } from '../module-add/module-add.component';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {
  listData: MatTableDataSource<any>;
  modules : Module[];
  displayedColumns : string[] = ['libelle','chargeHoraire','actions'];

  searchKey:string;
  @ViewChild(MatSort,{ static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{ static: true}) paginator: MatPaginator;
 
  constructor(
    private moduleService : ModuleService,
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
    this.listData = new MatTableDataSource(this.modules);
    this.listData.sort = this.sort;
    console.log(this.listData);
    this.listData.paginator = this.paginator;

  }
  init(){
    //this.selectedItem= this.initItem;
    this.modules = this.route.snapshot.data.modules;
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
    this.dialog.open(ModuleAddComponent,dialogConfig);

  }
  onEdit(row){
    console.log(row);
    this.moduleService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ModuleAddComponent,dialogConfig);
  }
  onDelete(numero){
    if(confirm('Voulez archiver ce module ? ')){
      this.moduleService.delete(numero).subscribe(
        res => {
          this.notificationService.warn('Cet module est archivee');
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
    this.moduleService.getAll().subscribe(
      data =>{this.modules = data},
      error => {console.log('loading modules failed !')},
      () => {console.log(this.modules)}
    );
  }
}

