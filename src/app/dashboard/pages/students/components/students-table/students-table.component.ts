import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStudent } from '../../models/students';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html'
})
export class StudentsTableComponent {
  displayedColumns: string[] = ['id', 'nombre', 'email', 'cursando', 'acciones'];

  userRole$: Observable<string | undefined>;

  constructor(private router: Router, private store: Store){
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map((u) => u?.role));
  }

  @Input()
  dataSource: IStudent[] = [];
  
  @Output()
  deleteStudent = new EventEmitter<number>();

  @Output()
  editStudent = new EventEmitter();

  

}
