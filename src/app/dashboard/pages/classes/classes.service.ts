import { Injectable } from "@angular/core";
import { Observable, concatMap, of } from "rxjs";
import { IClasses } from "./Models/classes";
import { environment } from "src/app/environments/environment.local";
import { HttpClient } from "@angular/common/http";



@Injectable({
    providedIn: 'root'
})
export class classesService{
  constructor(private httpClient: HttpClient) {}


    getClasses$() : Observable<IClasses[]>{
        //return of(this.courses)
        return this.httpClient.get<IClasses[]>(`${environment.baseUrl}/classes`);
    }

    addClass$(payload: IClasses): Observable<IClasses[]>{
      return this.httpClient
      .post<IClasses>(`${environment.baseUrl}/classes`, payload)
      .pipe(concatMap(() => this.getClasses$()));
    }

    editClass$(id: number, payload: IClasses): Observable<IClasses[]>{ 
      return this.httpClient
      .put<IClasses>(`${environment.baseUrl}/classes/${id}`, payload)
      .pipe(concatMap(() => this.getClasses$()));
    }

    getClassById$(classId: number): Observable<IClasses | undefined>{ 
      return this.httpClient.get<IClasses>(`${environment.baseUrl}/classes/${classId}`);
    }

    getClassesByCursoId$(cursoId: number): Observable<IClasses[]>{ 
      return this.httpClient.get<IClasses[]>(`${environment.baseUrl}/classes?courseId=${cursoId}`);
    }

    deleteClass$(classId: number): Observable<IClasses[]>{ 
      return this.httpClient
      .delete<IClasses>(`${environment.baseUrl}/classes/${classId}`)
      .pipe(concatMap(() => this.getClasses$()));
      }
      

}