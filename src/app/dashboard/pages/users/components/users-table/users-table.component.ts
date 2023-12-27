import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../models/user';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  displayedColumns: string[] = ['id', 'nombre', 'email', 'role', 'acciones'];
  userRole$: Observable<string | undefined>;

  constructor(private router: Router, private store: Store){
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map((u) => u?.role));
  }

  @Input()
  dataSource: IUser[] = [];
  
  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter();
}
