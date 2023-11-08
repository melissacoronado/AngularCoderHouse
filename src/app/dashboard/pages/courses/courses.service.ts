import { Injectable } from "@angular/core";
import { ICourse } from "./models/courses";
import { Observable, concatMap, of } from "rxjs";
import { environment } from "src/app/environments/environment.local";
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class courseService{

    constructor(private httpClient: HttpClient) {}

    
    getCourses$() : Observable<ICourse[]>{
        return this.httpClient.get<ICourse[]>(`${environment.baseUrl}/courses`);
    }

    addCourse$(payload: ICourse): Observable<ICourse[]>{
        return this.httpClient
      .post<ICourse>(`${environment.baseUrl}/courses`, payload)
      .pipe(concatMap(() => this.addCourse$(payload)));
    }

    editCourse$(id: number, payload: ICourse): Observable<ICourse[]>{ 
        return this.httpClient
      .put<ICourse>(`${environment.baseUrl}/courses/${id}`, payload)
      .pipe(concatMap(() => this.getCourses$()));
    }

    getCourseById$(courseId: number): Observable<ICourse | undefined>{ 
        return this.httpClient.get<ICourse>(`${environment.baseUrl}/courses/${courseId}`);
    }

    deleteCourse$(id: number): Observable<ICourse[]>{ 
        return this.httpClient
      .delete<ICourse>(`${environment.baseUrl}/courses/${id}`)
      .pipe(concatMap(() => this.getCourses$()));
      }

}