import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStudent } from '../../models/students';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html'
})
export class StudentsTableComponent {
  displayedColumns: string[] = ['id', 'nombre', 'email', 'cursando', 'acciones'];

  @Input()
  dataSource: IStudent[] = [];
  
  @Output()
  deleteStudent = new EventEmitter<number>();

  @Output()
  editStudent = new EventEmitter<IStudent>();
}
