import { Component } from '@angular/core';
import { courseService } from './courses.service';
import { ICourse } from './models/courses';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
courses$: Observable<ICourse[]>;

  constructor(private coursesService: courseService, private matDialog: MatDialog){
    this.courses$ = this.coursesService.getCourses$();
   
  }

  onAddCourse():void{
    this.matDialog.open(CoursesDialogComponent)
    .afterClosed()
    .subscribe({
      next: (result) => {
        if(result){
          this.courses$ = this.coursesService.addCourse$({
            id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
            nombre: result.nombre,
            capacidad: result.capacidad,
            activo: result.activo
          });
        }
      }
    })
  }

  onEditCourse(courseId: number): void {
    this.matDialog
      .open(CoursesDialogComponent, {
        data: courseId,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {  
            this.courses$ = this.coursesService.editCourse$(courseId, result);
          }
        },
      });
  }


  onDeleteCourse(courseId: number): void {

    Swal.fire({
      title: `Confirma eliminar Curso Id ${courseId}?`,
      text: '¡No podrás deshacer esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar el elemento
        this.courses$ = this.coursesService.deleteCourse$(courseId);
      }
    });
  }

  

  //------
}
