import { Injectable } from '@angular/core';
import { Observable, concatMap, of } from 'rxjs';
import { IStudent } from './models/students';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment.local';



@Injectable({ providedIn: 'root' })
export class StudentsService {

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

  searchStudent(term: string): Observable<IStudent[]> {
    const url = `${environment.baseUrl}/students?q=${term}`;
    return this.httpClient.get<IStudent[]>(url);
  }

  //-----
}


