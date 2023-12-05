import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { adminGuard } from "../core/guards/admin.guard";
import { HomeComponent } from "./pages/home/home.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
                children: [
                    {
                        path: 'home', // /dashboard/home
                        component: HomeComponent,
                      },
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
                    {
                        path: 'users',
                        canActivate: [adminGuard],
                        loadChildren: () => import('./pages/users/users.module').then((x) => x.UsersModule)
                    },
                    {
                        path: 'enrollments',
                        //canActivate: [adminGuard],
                        loadChildren: () => import('./pages/enrollments/enrollments.module').then((x) => x.EnrollmentsModule)
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