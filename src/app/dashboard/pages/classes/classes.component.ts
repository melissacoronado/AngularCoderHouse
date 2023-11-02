import { Component } from '@angular/core';
import { IClasses } from './Models/classes';
import { Observable } from 'rxjs';
import { ClassesDialogComponent } from './components/classes-dialog/classes-dialog.component';
import { classesService } from './classes.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent {
  classes$: Observable<IClasses[]>;

  constructor(private clasesService: classesService, private matDialog: MatDialog){
    this.classes$ = this.clasesService.getClasses$();
  }

  onAddClass():void{
    this.matDialog.open(ClassesDialogComponent)
    .afterClosed()
    .subscribe({
      next: (result) => {
        if(result){
          this.classes$ = this.clasesService.addClass$({
            comision: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
            diasClases: ['Miercoles', 'Jueves'],
            fechaInicio: '2024-05-01',
            fechaFin: '2024-07-31',
            courseId: 1
          });
        }
      }
    })
  }

  onEditClass(classId: number): void {
    this.matDialog
      .open(ClassesDialogComponent, {
        data: classId,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {  
            this.classes$ = this.clasesService.editClass$(classId, result);
          }
        },
      });
  }


  onDeleteClass(classId: number): void {
    if (confirm(`Confirma eliminar Curso Id ${classId}?`)) {
      this.classes$ = this.clasesService.deleteClass$(classId);
    }
  }
}
