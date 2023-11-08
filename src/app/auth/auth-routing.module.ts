import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AuthComponent } from './auth.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                // -> /classes y
                path: '',
                component: AuthComponent, 
                children: [
                    {
                      path: 'login',
                      loadChildren: () =>
                        import('./pages/login/login.module').then((m) => m.LoginModule),
                    },
                    {
                      path: '**',
                      redirectTo: 'login',
                    },
                  ],              
            },
            {
                path: '**',
                redirectTo: 'login',
              },        
            
        ])
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule {}