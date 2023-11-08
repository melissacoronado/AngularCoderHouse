import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
                children: [
                    {
                        path: 'students',
                        loadChildren: () => import('./pages/students/students.module').then((x) => x.StudentsModule)
                    },
                    {
                        path: 'courses',
                        loadChildren: () => import('./pages/courses/courses.module').then((x) => x.CoursesModule)
                    },
                    {
                        path: 'classes',
                        loadChildren: () => import('./pages/classes/classes.module').then((x) => x.ClassesModule)
                    },



                    {//hacer un home para /dashboard
                        path: '**',
                        redirectTo: ''
                    },
                ]
            }              
            
        ])
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule{

}