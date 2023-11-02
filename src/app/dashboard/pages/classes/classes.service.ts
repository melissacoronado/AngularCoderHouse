import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IClasses } from "./Models/classes";



@Injectable({
    providedIn: 'root'
})
export class classesService{
    courses: IClasses[] = 
    [
        {
          comision: 1,
          diasClases: ['Lunes', 'Miércoles'],
          fechaInicio: '2023-01-01',
          fechaFin: '2023-06-30',
          courseId: 101
        },
        {
          comision: 2,
          diasClases: ['Martes', 'Jueves'],
          fechaInicio: '2023-02-01',
          fechaFin: '2023-07-31',
          courseId: 102
        },
        {
          comision: 3,
          diasClases: ['Lunes', 'Miércoles'],
          fechaInicio: '2023-03-01',
          fechaFin: '2023-08-31',
          courseId: 103
        },
        {
          comision: 4,
          diasClases: ['Viernes'],
          fechaInicio: '2023-04-01',
          fechaFin: '2023-09-30',
          courseId: 104
        },
        {
          comision: 5,
          diasClases: ['Martes', 'Jueves'],
          fechaInicio: '2023-05-01',
          fechaFin: '2023-10-31',
          courseId: 105
        }
      ];

    getClasses$() : Observable<IClasses[]>{
        return of(this.courses)
    }

    addClass$(payload: IClasses): Observable<IClasses[]>{
        this.courses.push(payload);
        return of([...this.courses]);
    }

    editClass$(id: number, payload: IClasses): Observable<IClasses[]>{ 
        return of(this.courses.map((c) => (c.comision === id ? { ...c, ...payload } : c)));
    }

    getClassById$(classId: number): Observable<IClasses | undefined>{ 
        return of(this.courses.find((c) => c.comision === classId));
    }

    deleteClass$(classId: number): Observable<IClasses[]>{ 
        this.courses = this.courses.filter((c) => c.comision !== classId);
        return of(this.courses);
      }

}