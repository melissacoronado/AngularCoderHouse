import { Injectable } from "@angular/core";
import { Observable, concatMap, of } from "rxjs";
import { environment } from "src/app/environments/environment.local";
import { HttpClient } from "@angular/common/http";
import { IEnrollments } from "./models/IEnrollments";



@Injectable({
    providedIn: 'root'
})
export class enrollmentsService{
  constructor(private httpClient: HttpClient) {}


    getEnrollments$() : Observable<IEnrollments[]>{
        //return of(this.courses)
        return this.httpClient.get<IEnrollments[]>(`${environment.baseUrl}/enrollments`);
    }

    addtEnrollments$(payload: IEnrollments): Observable<IEnrollments[]>{
      return this.httpClient
      .post<IEnrollments>(`${environment.baseUrl}/enrollments`, payload)
      .pipe(concatMap(() => this.getEnrollments$()));
    }

    edittEnrollments$(id: number, payload: IEnrollments): Observable<IEnrollments[]>{ 
      return this.httpClient
      .put<IEnrollments>(`${environment.baseUrl}/enrollments/${id}`, payload)
      .pipe(concatMap(() => this.getEnrollments$()));
    }

    gettEnrollmentsById$(enrollmentId: number): Observable<IEnrollments | undefined>{ 
      return this.httpClient.get<IEnrollments>(`${environment.baseUrl}/enrollments/${enrollmentId}`);
    }

    gettEnrollmentsByComisionId$(comisionsId: number): Observable<IEnrollments[] | undefined>{ 
      return this.httpClient.get<IEnrollments[]>(`${environment.baseUrl}/enrollments?classId=${comisionsId}&_expand=course&_expand=class&_expand=student`);
    }

    deletetEnrollments$(id: number): Observable<IEnrollments[]>
    { 
      return this.httpClient
      .delete<IEnrollments>(`${environment.baseUrl}/enrollments/${id}`)
      .pipe(concatMap(() => this.getEnrollments$()));

      }


}