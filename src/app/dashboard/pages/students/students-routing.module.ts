import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                // -> /students
                path: '',
                component: StudentsComponent,               
            },
            {
                path: ':id',
                component: StudentDetailComponent
            }            
            
        ])
    ],
    exports: [RouterModule]
})
export class StudentsRoutingModule {}