import { Injectable } from "@angular/core";
import { ICourse } from "./models/courses";
import { Observable, of } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class courseService{
    courses: ICourse[] = 
    [{ id: 1, nombre: 'Angular', capacidad: 100, activo: true },
    { id: 2, nombre: 'React', capacidad: 100, activo: false },
    { id: 3, nombre: 'Backend', capacidad: 100, activo: true },
    { id: 4, nombre: 'Inglés para desarrolladores', capacidad: 30, activo: false },
    { id: 5, nombre: 'Seguridad informática', capacidad: 80, activo: true },
    { id: 6, nombre: 'Diseño UX', capacidad: 100, activo: true },
    ]

    getCourses$() : Observable<ICourse[]>{
        return of(this.courses)
    }

    addCourse$(payload: ICourse): Observable<ICourse[]>{
        this.courses.push(payload);
        return of([...this.courses]);
    }

    editCourse$(id: number, payload: ICourse): Observable<ICourse[]>{ 
        return of(this.courses.map((c) => (c.id === id ? { ...c, ...payload } : c)));
    }

    getCourseById$(courseId: number): Observable<ICourse | undefined>{ 
        return of(this.courses.find((c) => c.id === courseId));
    }

    deleteCourse$(id: number): Observable<ICourse[]>{ 
        this.courses = this.courses.filter((c) => c.id !== id);
        return of(this.courses);
      }

}