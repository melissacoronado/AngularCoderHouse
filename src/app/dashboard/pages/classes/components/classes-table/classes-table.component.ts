import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IClasses } from '../../Models/classes';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss']
})
export class ClassesTableComponent {
  displayedColumns: string[] = ['id', 'diasClases', 'fechaInicio', 'fechaFin', 'courseId', 'acciones'];


@Input()
dataSource : IClasses[] = [];

@Output()
deleteClasses = new EventEmitter();

@Output()
editClasses = new EventEmitter();
}
