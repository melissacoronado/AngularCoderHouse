import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnrollments, selectEnrollmentsIsLoading } from '../../store/enrollment.selectors';
import { Observable } from 'rxjs';
import { IEnrollments } from '../../models/IEnrollments';

@Component({
  selector: 'app-enrollments-table',
  templateUrl: './enrollments-table.component.html',
  styleUrls: ['./enrollments-table.component.scss']
})
export class EnrollmentsTableComponent {
  displayedColumns: string[] = ['id', 'alumno', 'curso', 'comision', 'dias', 'fechaInicio', 'fechaFin', 'acciones'];
  enrollments$: Observable<IEnrollments[]>
  isLoading$: Observable<boolean>;

  constructor(private store: Store){
    this. enrollments$ = this.store.select(selectEnrollments);
    this.isLoading$ = this.store.select(selectEnrollmentsIsLoading);
  }

  @Output()
  deleteEnrollment = new EventEmitter();  
}
