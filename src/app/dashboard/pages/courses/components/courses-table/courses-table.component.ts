import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourse } from '../../models/courses';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {
  displayedColumns: string[] = ['id', 'nombre', 'capacidad', 'activo', 'acciones'];

@Input()
dataSource : ICourse[] = [];

@Output()
deleteCourse = new EventEmitter();

@Output()
editCourse = new EventEmitter();

}
