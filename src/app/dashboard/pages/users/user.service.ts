import { Injectable } from '@angular/core';
import { Observable, concatMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment.local';
import { IUser } from './models/user';



@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private httpClient: HttpClient) {}

  addUser$(payload: IUser): Observable<IUser[]>{
    return this.httpClient
      .post<IUser>(`${environment.baseUrl}/users`, payload)
      .pipe(concatMap(() => this.getUsers$()));
  }  

  getUsers$(): Observable<IUser[]>
  {
    
    return this.httpClient.get<IUser[]>(`${environment.baseUrl}/users`);
  }

  editUser$(id: number, payload: IUser): Observable<IUser[]>{ 
    return this.httpClient
      .put<IUser>(`${environment.baseUrl}/users/${id}`, payload)
      .pipe(concatMap(() => this.getUsers$()));
  }

  getUserById$(userId: number): Observable<IUser | undefined>{ 
    return this.httpClient.get<IUser>(`${environment.baseUrl}/users/${userId}`);
  }

  deleteUser$(id: number): Observable<IUser[]>{ 
    return this.httpClient
      .delete<IUser>(`${environment.baseUrl}/users/${id}`)
      .pipe(concatMap(() => this.getUsers$()));
  }

  //-----
}