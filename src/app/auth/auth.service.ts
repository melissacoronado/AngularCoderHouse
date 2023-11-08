import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { IUser } from '../dashboard/pages/users/models/user';
import { Router } from '@angular/router';
import { IAuth } from './models/IAuth';
import { environment } from '../environment/environment.local';






@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private _authUser$ = new BehaviorSubject<IUser | null>(null);
  
    public authUser$ = this._authUser$.asObservable();
  
    constructor(private httpClient: HttpClient, private router: Router) {}
  
    login(payload: IAuth): void {

      this.httpClient
        .get<IUser[]>(
          `${environment.baseUrl}/users?email=${payload.email}&password=${payload.password}`
        )
        .subscribe({
          next: (response) => {
            if (!response.length) {
              alert('Usuario o contrasena invalidos');
            } else {
              const authUser = response[0];
              this._authUser$.next(authUser);
              localStorage.setItem('token', authUser.token);
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
              this._authUser$.next(authUser);
              localStorage.setItem('token', authUser.token);
              return true;
            }
          })
        );
    }
  
    logout(): void {
      this._authUser$.next(null);
      localStorage.removeItem('token');
      this.router.navigate(['/auth/login']);
    }

  //-----
}