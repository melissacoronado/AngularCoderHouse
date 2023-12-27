import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourse } from '../../models/courses';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {
  displayedColumns: string[] = ['id', 'nombre', 'capacidad', 'activo', 'acciones'];

  userRole$: Observable<string | undefined>;

  constructor(private router: Router, private store: Store){
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map((u) => u?.role));
  }

@Input()
dataSource : ICourse[] = [];

@Output()
deleteCourse = new EventEmitter();

@Output()
editCourse = new EventEmitter();

}
