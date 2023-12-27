import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { HttpClient } from '@angular/common/http';
import { IEnrollments } from '../models/IEnrollments';
import { environment } from 'src/app/environments/environment.local';
import { ICourse } from '../../courses/models/courses';
import { IEnrollmentPayload } from '../models/IEnrollmentPayload';


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

  loadEnrollmentsDialogOptions$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollmentsDialogOptions), 
      concatMap(() => 
        this.getEnrollmentsDialogActions().pipe(
          map(data => 
              EnrollmentActions.loadEnrollmentsDialogOptionsSuccess({data})
          ),
          catchError((err) =>
            of(
              EnrollmentActions.loadEnrollmentsDialogOptionsFailure({
                error: err,
              })
            )
          )
   ))  
  ));


  createEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.createEnrollment),
      concatMap((action) => {
        return this.createEnrollment(action.payload).pipe(
          // Si sale bien
          map((data) => EnrollmentActions.loadEnrollments()),
          // Si hay error
          catchError((error) =>
            of(EnrollmentActions.createEnrollmentFailure({ error }))
          )
        );
      })
    )
  );


  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  getEnrollments(): Observable<IEnrollments[]> {
    return this.httpClient.get<IEnrollments[]>(
      `${environment.baseUrl}/enrollments?_expand=course&_expand=student&_expand=class`
    );
    //return this.httpClient.get<ICourse[]>(`${environment.baseUrl}/courses`);
  }

  getEnrollmentsDialogActions(): Observable<ICourse[]> {    
    return this.httpClient.get<ICourse[]>(`${environment.baseUrl}/courses`);
  }

  createEnrollment(payload: IEnrollmentPayload): Observable<IEnrollments> {
    return this.httpClient.post<IEnrollments>(`${environment.baseUrl}/enrollments`, payload);
    //.pipe(concatMap(() => this.getEnrollments$()));
  }

}
