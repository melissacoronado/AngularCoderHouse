import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardRoutingModule } from './dashboard-routing.modules';
import { HomeComponent } from './pages/home/home.component';




@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent,
    SidenavComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule, 
    SharedModule, 
    DashboardRoutingModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { 
  
}
