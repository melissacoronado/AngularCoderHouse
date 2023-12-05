import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { enrollmentsService } from '../../enrollments.service';
import { courseService } from '../../../courses/courses.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICourse } from '../../../courses/models/courses';
import { Observable, filter, mergeMap } from 'rxjs';
import { IClasses } from '../../../classes/Models/classes';
import { classesService } from '../../../classes/classes.service';

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styleUrls: ['./enrollment-dialog.component.scss']
})
export class EnrollmentDialogComponent {
  enrollmentsForm: FormGroup;
  cursosList$: Observable<ICourse[]>;
  classesList$: Observable<IClasses[]>;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<EnrollmentDialogComponent>,
    private enrollmentService: enrollmentsService,
    private coursesService: courseService,
    private classesService: classesService,

    // RECIBO LA DATA
    @Inject(MAT_DIALOG_DATA) public enrollmentId?: number
  )
  {
    this.enrollmentsForm = this.formBuilder.group(
      {
        cursoId: ['', Validators.required],
        classesId: ['', Validators.required],
        StudentId: ['', Validators.required],       
      }
    );
    
    this.cursosList$ = coursesService.getCourses$();
    //este deberia cargarse cuando seleccionen un curso
    this.classesList$ = classesService.getClassesByCursoId$(1);
    

    if (enrollmentId) {
      this.enrollmentService.gettEnrollmentsById$(enrollmentId).subscribe({
        next: (c) => {
          if (c) {
            //para cargar los datos en el dialog/modal
            this.enrollmentsForm.patchValue(c);
          }
        },
      });
    }
    
    
  }

 onSubmit(): void { 
  console.log(this.enrollmentsForm.invalid);
  console.log(this.enrollmentsForm);
    if (this.enrollmentsForm.invalid) {
      this.enrollmentsForm.markAllAsTouched();
    } else { 
      this.matDialogRef.close(this.enrollmentsForm.value);
    }
  }
}
