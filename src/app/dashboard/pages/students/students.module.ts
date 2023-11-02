import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentsDialogComponent,
    StudentsTableComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,    
    SharedModule,    
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { 
  constructor(public dialog: MatDialog) {}

}
