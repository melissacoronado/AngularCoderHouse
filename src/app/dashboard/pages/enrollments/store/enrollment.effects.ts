import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { HttpClient } from '@angular/common/http';
import { IEnrollments } from '../models/IEnrollments';
import { environment } from 'src/app/environments/environment.local';


@Injectable()
export class EnrollmentEffects {

  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(

      //filtras de todas las acciones solo quellas que sean de tipo EnrollmentActions.loadEnrollments
      ofType(EnrollmentActions.loadEnrollments),
      
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getEnrollments().pipe(
          // SI LA PETICION SALE BIEN, DISPARA LA ACCION EnrollmentActions.loadEnrollmentsSuccess
          map(data => EnrollmentActions.loadEnrollmentsSuccess({ data })),

          // SI LA PETICION SALE MAL DISPARA LA ACCION EnrollmentActions.loadEnrollmentsFailure
          catchError(error => of(EnrollmentActions.loadEnrollmentsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  getEnrollments(): Observable<IEnrollments[]> {
    return this.httpClient.get<IEnrollments[]>(
      `${environment.baseUrl}/enrollments?_expand=course&_expand=student&_expand=class`
    );
    //return this.httpClient.get<ICourse[]>(`${environment.baseUrl}/courses`);
  }
}
