import { Component } from '@angular/core';
import { IStudent } from './models/students';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { StudentsService } from './students.service';
import { Observable } from 'rxjs';






@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  
  students$: Observable<IStudent[]>;
 
  constructor(private matDialog: MatDialog, private studentService: StudentsService){
    this.students$ = studentService.getStudents$();

  }

  onAddStudent():void{
    this.matDialog.open(StudentsDialogComponent)
    .afterClosed()
    .subscribe({
      next: (result) => {
        if(result){
          this.students$ = this.studentService.addCourse$({
            id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
            nombre: result.nombre,
            apellido: result.apellido,
            email: result.email,
            cursando: result.cursando
          });
        }
      }
    })
  }
  
  onDeleteStudent(studentId: number): void {
    if (confirm(`Confirma eliminar Alumno Id ${studentId}?`)) {
      this.students$ = this.studentService.deleteStudent$(studentId);
    }
  }

  onEditStudent(studentId: number): void {
    this.matDialog
      .open(StudentsDialogComponent, {
        data: studentId,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {  
            this.students$ = this.studentService.editStudent$(studentId, v);          
          }
        },
      });
  }

  


}
