import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { CoursesDetailComponent } from './components/courses-detail/courses-detail.component';
import { MatDialog } from '@angular/material/dialog';



@NgModule({
  declarations: [
    CoursesComponent,
    CoursesTableComponent,
    CoursesDialogComponent,
    CoursesDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule {
  constructor(public dialog: MatDialog) {}
 }
