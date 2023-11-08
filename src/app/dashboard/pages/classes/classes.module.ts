import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes.component';
import { ClassesTableComponent } from './components/classes-table/classes-table.component';
import { ClassesDialogComponent } from './components/classes-dialog/classes-dialog.component';
import { ClassesDetailComponent } from './components/classes-detail/classes-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { ClassesRoutingModule } from './classes-routing.module';



@NgModule({
  declarations: [
    ClassesComponent,
    ClassesTableComponent,
    ClassesDialogComponent,
    ClassesDetailComponent,    
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClassesRoutingModule,
  ],
  exports: [
    ClassesComponent,
    
  ]
})
export class ClassesModule { 
  constructor(public dialog: MatDialog) {}
}



                                


