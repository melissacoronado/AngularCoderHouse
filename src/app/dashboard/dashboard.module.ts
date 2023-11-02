import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { StudentsModule } from './pages/students/students.module';
import { CoursesModule } from './pages/courses/courses.module';
import { ClassesModule } from './pages/classes/classes.module';




@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule, 
    SharedModule,
    StudentsModule,
    CoursesModule,    
    RouterModule,
    ClassesModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { 
  
}
