import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IUser } from '../dashboard/pages/users/models/user';
import { Router } from '@angular/router';
import { IAuth } from './models/IAuth';
import { environment } from '../environments/environment.local';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth/auth.actions';
import { selectAuthUser } from '../store/auth/auth.selectors';






@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    //private _authUser$ = new BehaviorSubject<IUser | null>(null);  
    public authUser$ = this.store.select(selectAuthUser) //this._authUser$.asObservable();


  
    constructor(private httpClient: HttpClient, private router: Router, private store: Store) {}
  
    private handleAuthUser(authUser: IUser): void {
      this.store.dispatch(AuthActions.setAuthUser({ data: authUser }));
      localStorage.setItem('token', authUser.token);
    }

    login(payload: IAuth): void {

      this.httpClient
        .get<IUser[]>(
          `${environment.baseUrl}/users?email=${payload.email}&password=${payload.password}`
        )
        .subscribe({
          next: (response) => {
            if (!response.length) {
              Swal.fire({
                title: `Usuario o contrasena invalidos`,
              });
            } else { 
              //console.log( response);
              const authUser = response[0];
              //console.log(authUser);
              this.handleAuthUser(authUser);
              //this._authUser$.next(authUser);
              //localStorage.setItem('token', authUser.token);
              this.router.navigate(['/dashboard/home']);
            }
          },
          error: (err) => {
            alert('Error de conexion');
          },
        });
    }
  
    verifyToken(): Observable<boolean> {

      return this.httpClient
        .get<IUser[]>(
          `${environment.baseUrl}/users?token=${localStorage.getItem('token')}`
        )
        .pipe(
          map((users) => {
            if (!users.length) {
              return false;
            } else {
              const authUser = users[0];
              //this._authUser$.next(authUser);
              //localStorage.setItem('token', authUser.token);
              this.handleAuthUser(authUser);
              return true;
            }
          })
        );
    }
  
    logout(): void {
      //this._authUser$.next(null);
      this.store.dispatch(AuthActions.resetState());
      localStorage.removeItem('token');

      this.router.navigate(['/auth/login']);
    }

  //-----
}