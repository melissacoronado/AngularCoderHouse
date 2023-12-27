import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentsComponent } from './enrollments.component';
import { EnrollemntDetailComponent } from './components/enrollment-detail/enrollment-detail.component';

const routes: Routes = [];

@NgModule({
  imports: [ RouterModule.forChild([
    {
        // -> /enrollments
        path: '',
        component: EnrollmentsComponent,               
    },
    {
        path: ':id',
        component: EnrollemntDetailComponent
    } 
])],
  exports: [RouterModule]
})
export class EnrollmentsRoutingModule { }
