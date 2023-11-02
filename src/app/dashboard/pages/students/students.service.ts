import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IStudent } from './models/students';



@Injectable({ providedIn: 'root' })
export class StudentsService {
  students: IStudent[] = [
    {id: 1, nombre: 'Maria', apellido: 'Perez', email: 'correo@gmail.com', cursando: true },     
    {id: 2, nombre: 'Luis', apellido: 'Gómez', email: 'correo1@gmail.com', cursando: true},
    {id: 3, nombre: 'Laura', apellido: 'Pinho', email: 'correo2@gmail.com', cursando: false},
    {id: 4, nombre: 'Ricardo', apellido: 'Valenzuela', email: 'correo3@gmail.com', cursando: true},
  ];

  constructor() { }

  addCourse$(payload: IStudent): Observable<IStudent[]>{
    this.students.push(payload);
    return of([...this.students]);
  }  

  getStudents$(): Observable<IStudent[]>
  {
    return of(this.students);
  }

  editStudent$(id: number, payload: IStudent): Observable<IStudent[]>{ 
    return of(this.students.map((c) => (c.id === id ? { ...c, ...payload } : c)));
  }

  getStudentById$(studentId: number): Observable<IStudent | undefined>{ 
    return of(this.students.find((c) => c.id === studentId));
  }

  deleteStudent$(id: number): Observable<IStudent[]>{ 
    this.students = this.students.filter((c) => c.id !== id);
    return of(this.students);
  }

  //-----
}


