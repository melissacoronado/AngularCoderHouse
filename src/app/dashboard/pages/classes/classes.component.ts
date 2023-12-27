import { Component } from '@angular/core';
import { IClasses } from './Models/classes';
import { Observable } from 'rxjs';
import { ClassesDialogComponent } from './components/classes-dialog/classes-dialog.component';
import { classesService } from './classes.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent {
  classes$: Observable<IClasses[]>;
  diasSemana = ['Lunes','Martes','Miércoles', 'Jueves', 'Viernes'];

  constructor(private clasesService: classesService, private matDialog: MatDialog){
    this.classes$ = this.clasesService.getClasses$();
  }

  getSelectedDays(result: any): string[] {
    let diasSelecc: string[] = [];

    for (const day in result) {
      if (result.hasOwnProperty(day) && result[day] === true) {
        diasSelecc.push(day);
      }
    }

    return diasSelecc;
  }
  

  onAddClass():void{
    this.matDialog.open(ClassesDialogComponent)
    .afterClosed()
    .subscribe({
      next: (result) => {
        if(result){
          this.classes$ = this.clasesService.addClass$({
            id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
            diasClases: this.getSelectedDays(result),
            fechaInicio: result.fechaInicio,
            fechaFin: result.fechaFin,
            courseId: result.courseId
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
            console.log(classId); 
            console.log(result);
            this.classes$ = this.clasesService.editClass$(classId, {
              id: result.id,
              diasClases: this.getSelectedDays(result),
              fechaInicio: result.fechaInicio,
              fechaFin: result.fechaFin,
              courseId: result.courseId
            });
          }
        },
      });
  }


  onDeleteClass(classId: number): void {  
    
    Swal.fire({
      title: `Confirma eliminar Clase Id ${classId}?`,
      text: '¡No podrás deshacer esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar el elemento
        this.classes$ = this.clasesService.deleteClass$(classId);
      }
    });

  }
}
