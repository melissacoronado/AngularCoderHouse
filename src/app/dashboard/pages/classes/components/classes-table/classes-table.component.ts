import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IClasses } from '../../Models/classes';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss']
})
export class ClassesTableComponent {
  displayedColumns: string[] = ['id', 'diasClases', 'fechaInicio', 'fechaFin', 'courseId', 'acciones'];

  userRole$: Observable<string | undefined>;

  constructor(private router: Router, private store: Store){
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map((u) => u?.role));
  }

@Input()
dataSource : IClasses[] = [];

@Output()
deleteClasses = new EventEmitter();

@Output()
editClasses = new EventEmitter();
}
