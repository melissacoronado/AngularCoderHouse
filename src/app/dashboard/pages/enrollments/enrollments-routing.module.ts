import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentsComponent } from './enrollments.component';

const routes: Routes = [];

@NgModule({
  imports: [ RouterModule.forChild([
    {
        // -> /enrollments
        path: '',
        component: EnrollmentsComponent,               
    } 
])],
  exports: [RouterModule]
})
export class EnrollmentsRoutingModule { }
