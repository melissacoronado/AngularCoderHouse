import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../models/user';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  displayedColumns: string[] = ['id', 'nombre', 'email', 'role', 'acciones'];

  constructor(private router: Router, private store: Store){}

  @Input()
  dataSource: IUser[] = [];
  
  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter();
}
