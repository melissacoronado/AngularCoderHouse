import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ClassesComponent } from './classes.component';
import { ClassesDetailComponent } from './components/classes-detail/classes-detail.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                // -> /classes y
                path: '',
                component: ClassesComponent,               
            },
            {
                path: ':id',
                component: ClassesDetailComponent
            }            
            
        ])
    ],
    exports: [RouterModule]
})
export class ClassesRoutingModule {}