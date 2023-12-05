import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {
        // -> /users
        path: '',
        component: UsersComponent,               
    },
    {
        path: ':id',
        component: UserDetailComponent
    }            
    
])],
  exports: [RouterModule]
})
export class UsersRoutingModule { }