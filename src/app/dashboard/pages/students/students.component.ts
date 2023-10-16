import { Component } from '@angular/core';
import { IStudent } from './models/students';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';




const StudentsData: IStudent[] = [
  {id: 1, nombre: 'Maria', apellido: 'Perez', email: 'correo@gmail.com', cursando: true,
    cursos: [{id: 57890, nombre: 'Angular', activo: true}]},
  {id: 2, nombre: 'Luis', apellido: 'Gómez', email: 'correo1@gmail.com', cursando: true,
    cursos: [{id: 57890, nombre: 'Angular', activo: true}, {id: 47856, nombre: 'Backend', activo: false}]},
  {id: 3, nombre: 'Laura', apellido: 'Pinho', email: 'correo2@gmail.com', cursando: false,
    cursos: [{id: 77895, nombre: 'React', activo: true}]},
  {id: 4, nombre: 'Ricardo', apellido: 'Valenzuela', email: 'correo3@gmail.com', cursando: true,
  cursos: [{id: 57890, nombre: 'Angular', activo: true}, {id: 87856, nombre: 'Ingles IT', activo: true}]},
];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  
  students: IStudent[] = [];

 
  constructor(private matDialog: MatDialog){
    this.students = StudentsData;

  }

  openUsersDialog(): void{
    this.matDialog.open(StudentsDialogComponent)
        .afterClosed()
        .subscribe({
          next: (v) => {
            if (!!v) {
              console.log(v);
              this.students = [
                ...this.students,
                {
                  ...v,
                  id: this.students.length + 1
                }
              ]
            }
          }
        });
  }

  onDeleteStudent(studentId: number): void {
    if (confirm(`Confirma eliminar Alumno Id ${studentId}?`)) {
      this.students = this.students.filter((u) => u.id !== studentId);
    }
  }

  onEditStudent(student: IStudent): void {
    console.log(student);
    this.matDialog
      .open(StudentsDialogComponent, {
        data: student,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {            
            this.students = this.students.map((u) =>
              u.id === student.id ? { ...u, ...v } : u
            );
          }
        },
      });
  }

}
