import { Injectable } from '@angular/core';
import { Observable, concatMap, of } from 'rxjs';
import { IStudent } from './models/students';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment.local';



@Injectable({ providedIn: 'root' })
export class StudentsService {
  students: IStudent[] = [
    {id: 1, nombre: 'Maria', apellido: 'Perez', email: 'correo@gmail.com', cursando: true },     
    {id: 2, nombre: 'Luis', apellido: 'Gómez', email: 'correo1@gmail.com', cursando: true},
    {id: 3, nombre: 'Laura', apellido: 'Pinho', email: 'correo2@gmail.com', cursando: false},
    {id: 4, nombre: 'Ricardo', apellido: 'Valenzuela', email: 'correo3@gmail.com', cursando: true},
  ];

  constructor(private httpClient: HttpClient) {}

  addStudent$(payload: IStudent): Observable<IStudent[]>{
    return this.httpClient
      .post<IStudent>(`${environment.baseUrl}/students`, payload)
      .pipe(concatMap(() => this.getStudents$()));

  }  

  getStudents$(): Observable<IStudent[]>
  {
    return this.httpClient.get<IStudent[]>(`${environment.baseUrl}/students`);
  }

  editStudent$(id: number, payload: IStudent): Observable<IStudent[]>{ 
    return this.httpClient
      .put<IStudent>(`${environment.baseUrl}/students/${id}`, payload)
      .pipe(concatMap(() => this.getStudents$()));
  }

  getStudentById$(studentId: number): Observable<IStudent | undefined>{ 
    return this.httpClient.get<IStudent>(`${environment.baseUrl}/students/${studentId}`);
  }

  deleteStudent$(id: number): Observable<IStudent[]>{ 
    return this.httpClient
      .delete<IStudent>(`${environment.baseUrl}/students/${id}`)
      .pipe(concatMap(() => this.getStudents$()));
  }

  //-----
}


