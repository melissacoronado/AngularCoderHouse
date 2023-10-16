import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { StudentsModule } from './pages/students/students.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


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
    StudentsModule,
    SharedModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { 
  
}
