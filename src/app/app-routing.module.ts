import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { CoursesComponent } from './dashboard/pages/courses/courses.component';
import { StudentsComponent } from './dashboard/pages/students/students.component';
import { StudentDetailComponent } from './dashboard/pages/students/components/student-detail/student-detail.component';
import { ClassesComponent } from './dashboard/pages/classes/classes.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children:[
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        path: 'students/detail/:id',
        component: StudentDetailComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent
      },
      {
        path: 'classes',
        component: ClassesComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      },
    ]
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  { path: '**', 
    redirectTo: 'dashboard', 
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}

/*
RouterModule.forRoot para rutas base
*/
